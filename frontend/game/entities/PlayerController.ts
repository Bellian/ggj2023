

import { isServer } from "@/helpers";
import { ConnectionStoreClass } from "@/stores/connectionStore";
import { GameStateStoreClass, IPlayer } from "@/stores/gameStateStore";
import { ISpriteInterface } from "@/stores/mapEditorStore";
import { ITile, WorldStoreClass } from "@/stores/worldStore";
import { vec2 } from "gl-matrix";
import { Entity } from "./Entity";
import { Package } from "./Package";
import { PackageSpawner } from "./PackageSpawner";
import { PackageTarget } from "./PackageTarget";

const PLAYER_SPEED = 4;

const SPRITES = {
    default: {
        up: {
            name: 'character/person/up',
            position: 0,
        },
        down: {
            name: 'character/person/down',
            position: 0,
        },
        left: {
            name: 'character/person/left',
            position: 0,
        },
        right: {
            name: 'character/person/right',
            position: 0,
        },
    },
    pig: {
        up: {
            name: 'character/pig/up',
            position: 0,
        },
        down: {
            name: 'character/pig/down',
            position: 0,
        },
        left: {
            name: 'character/pig/left',
            position: 0,
        },
        right: {
            name: 'character/pig/right',
            position: 0,
        },
    }
}


export class PlayerController extends Entity {

    static scale: number = 0.7;
    static className = 'PlayerController';

    static instance(world, gameState, connection, data) {
        const instance = new PlayerController(
            vec2.clone(new Float32Array(data.position)),
            vec2.clone(new Float32Array(data.rotation)),
            world,
            gameState,
            connection,
            data.player
        );
        instance.id = data.id;
        return instance
    }

    inputs: Set<string> = new Set();
    tile: ITile;

    constructor(
        position,
        rotation,
        world,
        gameState,
        connection,
        public player: IPlayer,
    ) {
        super(position, rotation, world, gameState, connection);
        this.authority = player.id;

        const skin = SPRITES[player?.skin] || SPRITES.default;
        this.desiredSprite = [skin.down];
        this.sprite = [skin.down];
    }

    getSprite() {
        const skin = SPRITES[this.player?.skin] || SPRITES.default;
        return skin.down;
    }

    addInput(s: string) {

        if (s === ' ') {
            this.interact();
        }

        this.inputs.add(s);
    }

    interact(): void {
        const targets = this.getEntitiesInRange(0.5);
        const current = targets.find(e => e instanceof Package && e.attachedTo === this.id) as Package;
        const pack = targets.find(e => e instanceof Package && !e.attachedTo) as Package;

        if (!current && pack) {
            // attach to package
            pack.claim();
            pack.attach(this);
            return;
        }

        if (current) {
            for (const inteactable of targets) {
                if (inteactable instanceof PackageSpawner) {
                    current.actions.push(inteactable.id);

                    const success = current.eval();
                    if (success) {
                        current.destroy();
                        current.detatch();
                    } else {
                        current.actions.length = 0;
                    }
                    return;
                }
                if (inteactable instanceof PackageTarget) {
                    inteactable.interact(current);
                    return;
                }

            }

            // attach to package
            current.detatch();
            current.free();
            return;
        }
        return;
    }

    removeInput(s: string) {
        this.inputs.delete(s);
    }

    tick(delta: number) {
        super.tick(delta);
        if (this.gameState.getOwnPlayerController() !== this) {
            return;
        }
        const speed = PLAYER_SPEED * delta;
        vec2.set(this.rotation, 0, 0);

        this.inputs.forEach(i => {
            switch (i) {
                case 'w':
                    this.setSprite('up');
                    //vec2.add(this.rotation, this.rotation, [0, 1]);
                    return this.world.isWalkable(this.position[0], this.position[1] - speed, this.getScale()) &&
                        vec2.add(this.position, this.position, vec2.fromValues(0, -speed));
                case 's':
                    this.setSprite('down');
                    //vec2.add(this.rotation, this.rotation, [0, -1]);
                    return this.world.isWalkable(this.position[0], this.position[1] + speed, this.getScale()) &&
                        vec2.add(this.position, this.position, vec2.fromValues(0, speed));
                case 'a':
                    this.setSprite('left');
                    //vec2.add(this.rotation, this.rotation, [-1, 0]);
                    return this.world.isWalkable(this.position[0] - speed, this.position[1], this.getScale()) &&
                        vec2.add(this.position, this.position, vec2.fromValues(-speed, 0));
                case 'd':
                    this.setSprite('right');
                    //vec2.add(this.rotation, this.rotation, [1, 0]);
                    return this.world.isWalkable(this.position[0] + speed, this.position[1], this.getScale()) &&
                        vec2.add(this.position, this.position, vec2.fromValues(speed, 0));
            }
        });

        const tiles = this.world.getUniqueTiles(this.position[0] + this.getScale() / 2, this.position[1] + this.getScale() / 2, 0);
        tiles.forEach((tile) => {
            if (tile.meta?.appliedForce) {
                let force = vec2.clone(tile.meta?.appliedForce);
                vec2.scale(force, force, delta);
                this.world.isWalkable(this.position[0] + force[0], this.position[1] + force[1], this.getScale()) && vec2.add(this.position, this.position, force);
            }
        });
    }

    setSprite(sprite: string) {
        const skin = SPRITES[this.player.skin] || SPRITES.default;
        this.desiredSprite[0] = skin[sprite];
    }

    toJSON() {
        return Object.assign(super.toJSON(), {
            player: this.player
        });
    }
}