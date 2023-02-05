import { isServer } from "@/helpers";
import { action, computed, makeObservable, observable } from "mobx";
import Peer, { DataConnection } from "peerjs";
import { createContext } from "react";
import { ConnectionStoreStore } from "./connectionStore";



export class PersistStoreClass {
    name: string = '';
    skin: string = '';

    constructor() {
        makeObservable(this, {
            name: observable,
            init: action,
            set: action,
        });
    }

    init() {
        this.name = localStorage.getItem('name') || 'New Player';
        this.skin = localStorage.getItem('skin') || 'default';
    }

    set<T extends PersistStoreClass>(key: keyof T, name: string) {
        (this as any)[key] = name;
        localStorage.setItem(key as any, name);
    }

}

export const PersistStoreStore = new PersistStoreClass();
export const PersistStoreContext = createContext(PersistStoreStore);
export default PersistStoreContext;
