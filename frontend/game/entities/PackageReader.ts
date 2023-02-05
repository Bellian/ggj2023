import { randomElement } from "@/helpers";
import { ISpriteInterface } from "@/stores/mapEditorStore";
import { vec2, vec3 } from "gl-matrix";
import { Entity } from "./Entity";
import { Package } from "./Package";
import { PackageSpawner } from "./PackageSpawner";


interface ITask {
    target: number
}

export class PackageReader extends Entity {
    static sprite = {
        name: 'animations/energy-controller',
        position: 0,
    };
    static className = 'PackageReader';
    static instance(world, gameState, connection, data) {
        const instance = new PackageReader(
            vec2.clone(new Float32Array(data.position)),
            vec2.clone(new Float32Array(data.rotation)),
            world,
            gameState,
            connection
        );
        instance.id = data.id;
        return instance;
    }

    tasks: number[];
    actions: number[];

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

    tick(delta: number): void {
        super.tick(delta);
        const packages = this.getEntitiesInRange<Package>(1, Package);

        for (const pk of packages) {
            if (pk.isOwned()) {
                this.proximityText = pk.tasks.map((task, i) => {
                    const action = pk.actions?.[i];
                    const add = !action ? '-' : action === task ? '✅' : '❌'
                    const entity = this.getEntitiesbyId(task);
                    if (entity) {
                        return `${entity.proximityText} ${add}`;
                    }
                    return 'unknown';
                }).join("\n")// + JSON.stringify(pk.tasks) + JSON.stringify(pk.actions);
                return;
            }
        }
        this.proximityText = '';
    }

    toJSON() {
        return Object.assign(super.toJSON(), {
            tasks: this.tasks,
            actions: this.actions,
        });
    }
}