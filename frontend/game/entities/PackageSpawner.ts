import { isServer } from "@/helpers";
import { ISpriteInterface } from "@/stores/mapEditorStore";
import { vec2 } from "gl-matrix";
import { Entity } from "./Entity";
import { Package } from "./Package";


const PACKAGE_SPAWN_RATE = 0.2;
let PORT_ID = 0;

export class PackageSpawner extends Entity {
    static sprite = {
        name: 'animations/fastlane',
        position: 0,
    };
    static className = 'PackageSpawner';
    static instance(world, gameState, connection, data) {
        const instance = new PackageSpawner(
            vec2.clone(new Float32Array(data.position)),
            vec2.clone(new Float32Array(data.rotation)),
            world,
            gameState,
            connection
        );
        instance.id = data.id;
        return instance;
    }

    portId = PORT_ID++;

    constructor(
        position,
        rotation,
        world,
        gameState,
        connection
    ) {
        super(position, rotation, world, gameState, connection);

        this.proximityText = 'Port ' + this.portId;
    }

    tick(delta: number): void {
        super.tick(delta);
        if (isServer()) {

            if (Math.random() / delta < PACKAGE_SPAWN_RATE) {
                const packages = this.getEntitiesInRange(0.5, Package);
                if (packages.length === 0) {
                    console.log('spawn package');

                    this.world.instanceEntity(
                        new Package(vec2.clone(this.position), vec2.create(), this.world, this.gameState, this.connection)
                    );
                }
            }
        }
    }

    toJSON() {
        return Object.assign(super.toJSON(), {

        });
    }
}