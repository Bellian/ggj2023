import { randomElement } from "@/helpers";
import { ISpriteInterface } from "@/stores/mapEditorStore";
import { vec2, vec3 } from "gl-matrix";
import { Entity } from "./Entity";
import { Package } from "./Package";
import { PackageSpawner } from "./PackageSpawner";


interface ITask {
    target: number
}

export class PackageTarget extends Entity {
    static sprite = {
        name: 'default',
        position: 0,
    };
    static className = 'PackageTarget';
    static instance(world, gameState, connection, data) {
        const instance = new PackageTarget(
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

        this.proximityText = '';
    }

    interact(pack: Package) {
        console.log('INTERACTING');
        if (pack.actions.includes(this.id)) {
            return;
        }
        console.log('PERFORM');
        pack.actions.push(this.id);
    }

    toJSON() {
        return Object.assign(super.toJSON(), {});
    }
}