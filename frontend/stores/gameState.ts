import { action, computed, makeObservable, observable } from "mobx";
import Peer, { DataConnection } from "peerjs";
import { createContext } from "react";

export interface IGameState {
    state: 'prepare' | 'started' | 'ended';
    world: any;
    player: any;
    entities: any;
}

export class GameStateStoreClass {
    state: Partial<IGameState> = {};

    constructor() {
        makeObservable(this, {
            state: observable,
        });
    }



}

export const GameStateStoreStore = new GameStateStoreClass();
export const GameStateStoreContext = createContext(GameStateStoreStore);
export default GameStateStoreContext;
