import { action, computed, makeObservable, observable } from "mobx";
import Peer, { DataConnection } from "peerjs";
import { createContext } from "react";


export class ConnectionStoreClass {
    connection: DataConnection | null = null;
    peer: Peer | null = null;

    constructor() {
        makeObservable(this, {
            connection: observable,
            peer: observable,
            init: action,
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

}

export const ConnectionStoreStore = new ConnectionStoreClass();
export const ConnectionStoreContext = createContext(ConnectionStoreStore);
export default ConnectionStoreContext;
