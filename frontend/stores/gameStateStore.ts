import { isServer } from "@/helpers";
import { action, computed, makeObservable, observable } from "mobx";
import Peer, { DataConnection } from "peerjs";
import { createContext } from "react";
import { ConnectionStoreStore } from "./connectionStore";
import { PersistStoreStore } from "./persistStore";

export interface IGameState {
    state: 'prepare' | 'started' | 'ended';
    config: IConfig;
    world: any;
    players: IPlayer[];
    entities: any;
}
export interface IPlayer {
    id: string;
    name: string;
    skin: string;

}
export interface IConfig {
    maxPlayers: number;
}




export class GameStateStoreClass {
    state: Partial<IGameState> = null;
    messages: string[] = [];
    interval: any;

    constructor() {
        makeObservable(this, {
            state: observable,
            messages: observable,
            self: computed,
            init: action,
            playerJoin: action,
            setState: action,
            startGame: action,
            endGame: action,
            resetGame: action,
            addMessage: action,
        });
    }

    get self() {
        return this.state?.players?.find(player => player.id === ConnectionStoreStore.id);
    }

    reset() {
        this.state = null;
        if (this.interval) {
            clearInterval(this.interval);
        }
        ConnectionStoreStore.clients.forEach((connection) => {
            connection.close();
        });
        this.messages.length = 0;
    }

    init() {
        if (isServer()) {
            this.state = {
                state: "prepare",
                config: {
                    maxPlayers: 4
                },
                world: {},
                players: [
                    {
                        id: ConnectionStoreStore.id,
                        name: PersistStoreStore.name,
                        skin: ''
                    }
                ],
                entities: []
            }
        }
        this.interval = setInterval(() => {
            if (!this.state?.state) {
                return;
            }
            this.sync();
        }, 30);
    }

    // server
    playerJoin(player: IPlayer): boolean {
        if (this.state.players.length >= this.state.config.maxPlayers) {
            return false;
        }
        this.state.players.push(player);
        return true;
    }
    playerRemove(id: string) {
        const player = this.state.players.find(player => player.id === id);
        if (player) {
            this.state.players.splice(this.state.players.indexOf(player), 1);
        }
    }

    kickPlayer(id: string) {
        const connection = ConnectionStoreStore.clients.find((client) => {
            return client.peer === id;
        });
        connection?.close();
    }

    sync() {
        ConnectionStoreStore.clients.forEach((client) => {
            if (!client.open) {
                return;
            }
            ConnectionStoreStore.sendMessage(client, 'state', this.state);
        });
    }

    startGame() {
        this.state.state = 'started';
        ConnectionStoreStore.peer.disconnect();
    }

    endGame() {
        this.state.state = 'ended';
        ConnectionStoreStore.peer.disconnect();
    }

    resetGame() {
        this.state.state = 'prepare';
        ConnectionStoreStore.peer.reconnect();
    }

    brodcastMessage(data: string) {
        this.addMessage(data);
        ConnectionStoreStore.clients.forEach(c => ConnectionStoreStore.sendMessage(c, 'message', data));
    }

    // player
    getPlayer(name: string) {
        return this.state.players.find(p => p.name === name);
    }

    setState(data: any) {
        this.state = data;
    }

    sendMessage(message: string) {
        const data = `${this.self.name}: ${message}`
        if (isServer()) {
            this.brodcastMessage(data);
        } else {
            ConnectionStoreStore.sendMessage(ConnectionStoreStore.connection, 'message', data);
        }
    }

    addMessage(data: string) {
        this.messages.push(data);
    }



}

export const GameStateStoreStore = new GameStateStoreClass();
export const GameStateStoreContext = createContext(GameStateStoreStore);
export default GameStateStoreContext;
