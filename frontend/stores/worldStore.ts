import { Entity } from "@/game/entities/Entity";
import { isServer } from "@/helpers";
import { vec2 } from "gl-matrix";
import { action, computed, makeObservable, observable } from "mobx";
import Peer, { DataConnection } from "peerjs";
import { createContext } from "react";
import { ConnectionStoreStore } from "./connectionStore";
import { ISpriteInterface } from "./mapEditorStore";

export interface IWorldInfo {
    levels: ISpriteInterface[][];
    width: number;
    height: number;
    entities: {
        class: typeof Entity;
        position: vec2;
        rotation: vec2;
    }[];
}

export interface ITile {
    sprite: ISpriteInterface;
    position: vec2;
    direction: vec2;
}

export class PersistStoreClass {
    tiles: ITile[][] = null;
    entities: Entity[] = null;

    constructor() {
        makeObservable(this, {
            tiles: observable,
            entities: observable,
        });
    }

    reset() {
        this.
    }

    createWorld() { }

}

export const PersistStoreStore = new PersistStoreClass();
export const PersistStoreContext = createContext(PersistStoreStore);
export default PersistStoreContext;
