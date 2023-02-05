import { isClient, isServer } from "@/helpers";
import { ConnectionStoreClass } from "@/stores/connectionStore";
import { GameStateStoreClass } from "@/stores/gameStateStore";
import { ISpriteInterface } from "@/stores/mapEditorStore";
import { ITile, WorldStoreClass, WorldStoreStore } from "@/stores/worldStore";
import { vec2 } from "gl-matrix";
import { PlayerController } from "./PlayerController";

let ENTITY_ID = 0;


export class Entity {
    static sprite: ISpriteInterface = {
        name: 'default',
        position: 0,
    };
    static className = 'Entity';
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
    public proximityText: string;
    public attachedTo = null;
    public name;
    public shouldDelete: boolean;
    public tile: ITile;
    public id: number;

    constructor(
        public position: vec2,
        public rotation: vec2,
        public world: WorldStoreClass,
        public gameState: GameStateStoreClass,
        public connection: ConnectionStoreClass,
    ) {
        this.desiredSprite = [this.getSprite()];
        this.sprite = [this.getSprite()];
        if (isServer()) {
            this.id = ENTITY_ID++;
        }
    }



    getSprite() {
        return (this.constructor as typeof Entity).sprite;
    }
    getScale() {
        return (this.constructor as typeof Entity).scale;
    }

    tick(delta: number) {
        const range = this.getEntitiesInRange<PlayerController>(undefined, PlayerController).filter(e => e === this.gameState.getOwnPlayerController());
        if (range.length !== 0) {
            this.tileMeta = {
                label: this.proximityText,
            }
        } else {
            this.tileMeta = {
                label: '',
            }
        }

        if (this.attachedTo) {
            const parent = this.getEntitiesbyId<Entity>(this.attachedTo);
            if (parent) {
                vec2.copy(this.position, parent.position);
            }
        }
        if (this.shouldDelete && isServer()) {
            console.log('deleting!!!!')
            this.world.deleteEntity(this);
        }

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
            shouldDelete: this.shouldDelete,
        }
    }

    getEntitiesInRange<Type extends Entity>(r = 1.5, restrictType: any = Entity): Type[] {
        return this.world.entities.filter(e => !e.shouldDelete)
            .filter(e => vec2.distance(this.position, e.position) < r && e !== this && (!restrictType || e instanceof restrictType)) as Type[];
    }
    getEntities<Type extends Entity>(restrictType: any = Entity): Type[] {
        return this.world.entities.filter(e => !e.shouldDelete).filter(e => e !== this && (!restrictType || e instanceof restrictType)) as Type[];
    }
    getEntitiesbyId<Type extends Entity>(id): Type {
        return this.world.entities.filter(e => !e.shouldDelete).find(e => e.id === id) as Type;
    }

    attach(parent: Entity) {
        if (this.authority && this.authority !== parent.authority) {
            throw new Error('To attach the object needs the same authority');
        }
        return this.attachedTo = parent.id;
    }
    detatch() {
        if (this.authority && this.authority !== this.gameState.getOwnPlayerController()?.authority) {
            throw new Error('Only the current authority can free the entity');
        }
        return this.attachedTo = null;
    }
    isOwned() {
        return this.authority === this.gameState.getOwnPlayerController()?.authority;
    }
    claim() {
        if (this.authority && this.authority !== this.gameState.getOwnPlayerController()?.authority) {
            throw new Error('This entity is already claimed');
        }
        this.authority = this.gameState.getOwnPlayerController()?.authority;
    }
    free() {
        if (this.authority && this.authority !== this.gameState.getOwnPlayerController()?.authority) {
            throw new Error('Only the current authority can free the entity');
        }
        this.authority = null;
        if (isClient()) {
            this.connection.sendMessage(this.connection.connection, 'entityUpdate', [
                this.toJSON()
            ]);
        }
    }

    destroy() {
        if (this.authority && this.authority !== this.gameState.getOwnPlayerController()?.authority) {
            throw new Error('Only the current authority can destroy the entity');
        }
        this.shouldDelete = true;
        this.authority = undefined;
        if (isClient()) {
            this.connection.sendMessage(this.connection.connection, 'entityUpdate', [
                this.toJSON()
            ]);
        }
    }
}