import { ConnectionStoreStore } from "@/stores/connectionStore"

export function isServer() {
    return ConnectionStoreStore.type === "host";
}
export function isClient() {
    return ConnectionStoreStore.type === "client";
}