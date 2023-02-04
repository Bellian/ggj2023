

import { isServer } from "@/helpers";
import { ConnectionStoreClass } from "@/stores/connectionStore";
import { GameStateStoreClass, IPlayer } from "@/stores/gameStateStore";
import { ISpriteInterface } from "@/stores/mapEditorStore";
import { ITile, WorldStoreClass } from "@/stores/worldStore";
import { vec2 } from "gl-matrix";
import { Entity } from "./Entity";

const PLAYER_SPEED = 3;

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
    static sprite = {
        name: 'character/person/down',
        position: 0,
    };
    static scale: number = 0.7;

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
        console.log('playercontroller', JSON.stringify(player));
        this.authority = player.id;
    }

    addInput(s: string) {
        this.inputs.add(s);
    }

    removeInput(s: string) {
        this.inputs.delete(s);
    }

    tick(delta: number) {
        if (this.gameState.getOwnPlayerController() !== this) {
            return;
        }
        super.tick(delta);
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