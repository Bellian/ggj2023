import { ConnectionStoreClass } from "@/stores/connectionStore";
import { GameStateStoreClass } from "@/stores/gameStateStore";
import { ISpriteInterface } from "@/stores/mapEditorStore";
import { WorldStoreClass, WorldStoreStore } from "@/stores/worldStore";
import { vec2 } from "gl-matrix";

let ENTITY_ID = 0;


export class Entity {
    id = ENTITY_ID++;
    static sprite: ISpriteInterface = {
        name: 'default',
        position: 0,
    };
    static scale: number = 1;

    static instance(world, gameState, connection, data): any {
        const instance = new Entity(
            vec2.clone(data.position),
            vec2.clone(data.rotation),
            world,
            gameState,
            connection
        );
        instance.id = data.id;
        return instance;
    }

    constructor(
        public position: vec2,
        public rotation: vec2,
        public world: WorldStoreClass,
        public gameState: GameStateStoreClass,
        public connection: ConnectionStoreClass,
    ) {
    }

    getSprite() {
        return (this.constructor as typeof Entity).sprite;
    }
    getScale() {
        return (this.constructor as typeof Entity).scale;
    }

    tick(delta: number) { }

    toJSON() {
        return {
            id: this.id,
            class: this.constructor.name,
            position: [...this.position],
            rotation: [...this.rotation],
        }
    }
}