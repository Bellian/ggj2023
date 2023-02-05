import { ISpriteInterface } from "@/stores/mapEditorStore";
import { vec2 } from "gl-matrix";
import { Entity } from "./Entity";


export class Package extends Entity {
    static sprite = {
        name: 'animations/box',
        position: 0,
    };
    static instance(world, gameState, connection, data) {
        const instance = new Package(
            vec2.clone(new Float32Array(data.position)),
            vec2.clone(new Float32Array(data.rotation)),
            world,
            gameState,
            connection
        );
        instance.id = data.id;
        return instance;
    }

    constructor(
        position,
        rotation,
        world,
        gameState,
        connection
    ) {
        super(position, rotation, world, gameState, connection);

        this.tileMeta = {
            label: 'Package',
        }
    }

    tick(delta: number): void {

    }

    toJSON() {
        return Object.assign(super.toJSON(), {

        });
    }
}