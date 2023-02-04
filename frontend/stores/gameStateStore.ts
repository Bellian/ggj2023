import { PlayerController } from "@/game/entities/PlayerController";
import { isServer } from "@/helpers";
import { glMatrix } from "gl-matrix";
import { action, computed, makeObservable, observable } from "mobx";
import { objectPrototype } from "mobx/dist/internal";
import Peer, { DataConnection } from "peerjs";
import { createContext } from "react";
import { isFloat32Array, isFloat64Array } from "util/types";
import { ConnectionStoreStore } from "./connectionStore";
import { PersistStoreStore } from "./persistStore";
import { WorldStoreStore } from "./worldStore";

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
    level: number;
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
                    maxPlayers: 4,
                    level: 1,
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
            this.interval = setInterval(() => {
                if (!this.state?.state) {
                    return;
                }
                if (this.state.state === 'started') {
                    WorldStoreStore.update();
                }
                this.sync();
            }, 30);
        }
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
    getPlayer(id: string) {
        return this.state.players.find(p => p.id === id);
    }
    getOwnPlayer() {
        return this.getPlayer(ConnectionStoreStore.id);
    }
    getPlayerController(player: IPlayer) {
        return WorldStoreStore.entities.find(e => e instanceof PlayerController && e.player.id === player.id) as PlayerController;
    }
    getOwnPlayerController() {
        return this.getPlayerController(this.getOwnPlayer());
    }

    setConfig<T extends keyof IConfig>(key: T, value: IConfig[T]) {
        this.state.config[key] = value;
    }

    setState(data: IGameState) {
        if (!this.state) {
            this.state = data;
            return;
        }
        debugger;
        const { config, entities, players, state, world } = data;
        Object.assign(this.state.config, config);
        Object.assign(this.state.players, players);
        this.state.state = state;
        this.state.world ? Object.assign(this.state.world, world) : this.state.world = world;

        const left = new Set(WorldStoreStore.entities || []);
        entities?.forEach(entity => {
            // check if entity exists
            const foundEntity = WorldStoreStore.entities?.find(e => e.id === entity.id);
            if (foundEntity) {
                left.delete(foundEntity);
                Object.keys(entity).forEach(key => {
                    if (!foundEntity[key]) {
                        foundEntity[key] = entity[key];
                    } else if (foundEntity[key] instanceof glMatrix.ARRAY_TYPE || Array.isArray(foundEntity[key])) {
                        // copy values
                        if ((foundEntity[key] as any[]).length === entity[key].length) {
                            for (let i = 0; i < (foundEntity[key] as any[]).length; i++) {
                                (foundEntity[key] as any[])[i] = entity[key][i];
                            }
                        } else {
                            foundEntity[key] = entity[key];
                        }
                    } else if (typeof entity[key] === 'object' && typeof foundEntity[key] === 'object') {
                        // assign
                        Object.assign(foundEntity[key], entity[key]);
                    } else {
                        // ovverride
                        foundEntity[key] = entity[key];
                    }
                })
            } else {
                // create new entity
                WorldStoreStore.createEntity(entity);
            }
        })
        left.forEach(entity => {
            WorldStoreStore.deleteEntity(entity);
        });

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
