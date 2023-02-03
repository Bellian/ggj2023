import { action, computed, makeObservable, observable } from "mobx";
import Peer, { DataConnection } from "peerjs";
import { createContext } from "react";
import { GameStateStoreStore } from "./gameState";


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
        });
    }

    init(id: string | undefined = undefined) {
        if (this.peer) {
            return;
        }
        console.log('init');

        const { Peer } = require("peerjs");

        this.peer = new (Peer as typeof Peer)(id, {
            host: "176.9.184.83",
            port: 9000,
            path: "/myapp",
        }) as Peer;

        this.peer.on('open', (...args) => {
            console.log('peer open', ...args);
        })
        this.peer.on('close', (...args) => {
            console.log('peer close', ...args);
        })
        this.peer.on('call', (...args) => {
            console.log('peer call', ...args);
        })
        this.peer.on('connection', (...args) => {
            console.log('peer connection', ...args);
        })
        this.peer.on('disconnected', (...args) => {
            console.log('peer disconnected', ...args);
        })
        this.peer.on('error', (...args) => {
            console.log('peer error', ...args);
        })
    }

    connect(id: string) {
        if (!this.peer) {
            throw new Error('no peer!');
        }
        if (this.connection) {
            return;
        }
        console.log('connect');
        this.connection = this.peer.connect(id, {
            metadata: {
                name: "Bellian",
            },
        });

        this.connection.on("open", (...args) => {
            console.log('connection open', ...args);
            this.connection!.send("hi!");
        });
        this.connection.on("close", (...args) => {
            console.log('connection close', ...args);
        });
        this.connection.on("data", (...args) => {
            console.log('connection data', ...args);
        });
        this.connection.on("error", (...args) => {
            console.log('connection error', ...args);
        });
        this.connection.on("iceStateChanged", (...args) => {
            console.log('connection iceStateChanged', ...args);
        });
    }

    openPeer(id = 'default-' + Date.now() + (Math.random() * 1000000).toFixed(0)) {
        if (this.peer) {
            this.peer.destroy();
        }
        return new Promise<Peer>((resolve, reject) => {
            const { Peer } = require("peerjs");

            this.peer = new (Peer as typeof Peer)(id, {
                host: "176.9.184.83",
                port: 9000,
                path: "/",
            }) as Peer;

            this.peer.on('open', (id) => {
                (action('setId', () => {
                    this.id = id;
                    resolve(this.peer);
                }))();
                this.peer.listAllPeers((peers) => {
                    (action('setGameList', () => {
                        this.openGames.length = 0;
                        this.openGames.push(...peers.filter(e => !e.includes('default-')));
                        this.openGames = this.openGames.slice();
                    }))();


                })
            });

            this.peer.on('error', (error) => {
                reject(error)
            });
        })

    }

    reset() {
        this.type = "none";
        this.openPeer();
    };

    async host(name: string) {
        console.log('host game');

        this.openPeer(name);
        this.type = 'host';

        this.peer.on('connection', connection => {
            if (GameStateStoreStore.state.state !== 'prepare') {
                // game has started!
                connection.close();
                return;
            }
            this.clients.push(connection);

            connection.on('close', () => {
                this.clients.splice(this.clients.indexOf(connection), 1);
            })
            connection.on('error', (err) => {
                console.log('Client error');
                console.error(err);
            })
        })
    }

}

export const ConnectionStoreStore = new ConnectionStoreClass();
export const ConnectionStoreContext = createContext(ConnectionStoreStore);
export default ConnectionStoreContext;
