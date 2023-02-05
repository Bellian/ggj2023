import { ConnectionStoreClass } from "@/stores/connectionStore";
import { GameStateStoreClass } from "@/stores/gameStateStore";
import { ISpriteInterface } from "@/stores/mapEditorStore";
import { ITile, WorldStoreClass, WorldStoreStore } from "@/stores/worldStore";
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
            vec2.clone(new Float32Array(data.position)),
            vec2.clone(new Float32Array(data.rotation)),
            world,
            gameState,
            connection
        );
        instance.id = data.id;
        instance.desiredSprite = data.desiredSprite;
        return instance;
    }

    public authority;
    public desiredSprite;
    public sprite;
    public tileMeta;
    tile: ITile;

    constructor(
        public position: vec2,
        public rotation: vec2,
        public world: WorldStoreClass,
        public gameState: GameStateStoreClass,
        public connection: ConnectionStoreClass,
    ) {
        this.desiredSprite = [this.getSprite()];
        this.sprite = [this.getSprite()];
    }

    getSprite() {
        return (this.constructor as typeof Entity).sprite;
    }
    getScale() {
        return (this.constructor as typeof Entity).scale;
    }

    tick(delta: number) { }

    interact() {

    }

    updateSprite() {
        if (!this.tile) {
            this.tile = this.world.dynamicTiles.find(tile => tile.entityID === this.id);
        }
        if (this.tile) {
            this.tile.displayMeta = this.tileMeta;
        }
        if (this.tile && (this.sprite[0].name !== this.desiredSprite[0].name || this.sprite[0].position !== this.desiredSprite[0].position)) {
            this.tile.sprite = this.desiredSprite[0];
            this.sprite[0] = this.desiredSprite[0];
        }
    }

    toJSON() {
        return {
            id: this.id,
            class: this.constructor.name,
            authority: this.authority,
            position: this.position,
            rotation: this.rotation,
            desiredSprite: this.desiredSprite,
        }
    }
}