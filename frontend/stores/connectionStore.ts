import { action, computed, makeObservable, observable } from "mobx";
import Peer, { DataConnection } from "peerjs";
import { createContext } from "react";
import { GameStateStoreClass, GameStateStoreStore } from "./gameStateStore";
import { PersistStoreStore } from "./persistStore";


type MessageType = 'message' | 'state' | 'entityUpdate';

const peers: Peer[] = [];

export class ConnectionStoreClass {
    peer: Peer = null;
    id: string = null;
    type: 'none' | 'host' | 'client' = 'none';
    openGames: string[] = [];
    // clients
    connection: DataConnection = null;
    // hosts
    clients: DataConnection[] = [];


    constructor() {
        makeObservable(this, {
            connection: observable,
            id: observable,
            type: observable,
            clients: observable,
            openGames: observable,
            peer: observable,
            openPeer: action,
            reset: action,
        });
        if (peers.length > 0) {
            peers.forEach(peer => {
                peer.destroy();
            });
            peers.length = 0;

        }
    }

    openPeer(id = 'default-' + Date.now() + (Math.random() * 1000000).toFixed(0)) {
        if (this.peer) {
            this.peer.destroy();
        }
        return new Promise<Peer>((resolve, reject) => {
            const { Peer } = require("peerjs");

            this.peer = new (Peer as typeof Peer)(id, {
                host: "ggj2023.idhren.com",
                port: 443,
                path: "/",
                secure: true,

            }) as Peer;
            peers.push(this.peer);

            this.peer.on('open', (id) => {
                (action('setId', () => {
                    this.id = id;
                    resolve(this.peer);
                }))();
                this.updateGameList();
            });

            this.peer.on('error', (error) => {
                reject(error)
            });
        })

    }

    updateGameList() {
        this.peer.listAllPeers((peers) => {
            (action('setGameList', () => {
                this.openGames.length = 0;
                this.openGames.push(...peers.filter(e => !e.includes('default-')));
                this.openGames = this.openGames.slice();
            }))();
        })
    }

    reset() {
        this.type = "none";
        this.connection?.close();
        this.openPeer();
    };

    async host(name: string) {

        this.openPeer(name);
        (action('setGameList', () => {
            this.type = 'host';
        }))();
        this.peer.on('open', () => {
            GameStateStoreStore.init();
        })

        this.peer.on('connection', connection => {
            if (GameStateStoreStore.state.state !== 'prepare') {
                // game has started!
                connection.close();
                return;
            }

            connection.on('open', () => {
                // this.sendMessage(connection, 'state', GameStateStoreStore.state);
                GameStateStoreStore.brodcastMessage(`Player ${connection.metadata.name} joined!`);
            })
            connection.on('data', (data: { type: MessageType, data: any }) => {
                switch (data.type) {
                    case 'message':
                        GameStateStoreStore.brodcastMessage(data.data);
                        break;
                    case 'entityUpdate':
                        GameStateStoreStore.updateEntities(data.data, false);
                        break;
                    case 'state':
                        console.log('state update from client');
                        break;
                    // GameStateStoreStore.setState(data.data);
                }
            })
            connection.on('close', () => {
                this.clients.splice(this.clients.indexOf(connection), 1);
                GameStateStoreStore.playerRemove(connection.peer);
            })
            connection.on('error', (err) => {
                console.log('Client error');
                console.error(err);
            })


            this.clients.push(connection);
            const joined = GameStateStoreStore.playerJoin({
                id: connection.peer,
                name: connection.metadata.name,
                skin: '',
            });


            if (!joined) {
                connection.close();
            }
        })
    }

    sendMessage(connection: DataConnection, type: MessageType, data: any) {
        connection.send({
            type,
            data,
        }, false)
    }

    async join(id: string) {
        if (!this.peer) {
            throw new Error('no peer!');
        }
        if (this.connection) {
            this.connection.close();
        }

        (action('setGameList', () => {
            this.connection = this.peer.connect(id, {
                metadata: {
                    name: PersistStoreStore.name,
                },
            });
        }))();

        this.connection.on("open", (...args) => {
            (action('setGameList', () => {
                this.type = 'client';
            }))();
            GameStateStoreStore.init();
        });
        this.connection.on("close", (...args) => {
            (action('setGameList', () => {
                this.type = 'none';
            }))();
        });
        this.connection.on("data", (data: { type: MessageType, data: any }) => {
            // put data in game state
            switch (data.type) {
                case 'message':
                    GameStateStoreStore.addMessage(data.data);
                    break;
                case 'state':
                    GameStateStoreStore.setState(data.data);
                    break;
            }
        });
        this.connection.on("error", (...args) => {
            console.log('connection error', ...args);
        });
        this.connection.on("iceStateChanged", (...args) => {
            console.log('connection iceStateChanged', ...args);
        });
    }

}

export const ConnectionStoreStore = new ConnectionStoreClass();
export const ConnectionStoreContext = createContext(ConnectionStoreStore);
export default ConnectionStoreContext;
