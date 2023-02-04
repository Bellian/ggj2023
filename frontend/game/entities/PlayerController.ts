

import { isServer } from "@/helpers";
import { ConnectionStoreClass } from "@/stores/connectionStore";
import { GameStateStoreClass, IPlayer } from "@/stores/gameStateStore";
import { WorldStoreClass } from "@/stores/worldStore";
import { vec2 } from "gl-matrix";
import { Entity } from "./Entity";

const PLAYER_SPEED = 2;

export class PlayerController extends Entity {


    static sprite = {
        name: 'character/1/walk-down',
        position: 0,
    };

    static instance(world, gameState, connection, data) {
        const instance = new PlayerController(
            vec2.clone(data.position),
            vec2.clone(data.rotation),
            world,
            gameState,
            connection,
            data.player
        );
        instance.id = data.id;
        return instance
    }

    inputs: Set<string> = new Set();
    static scale: number = 0.5;

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

        this.inputs.forEach(i => {
            switch (i) {
                case 'w':
                    return this.world.isWalkable(this.position[0], this.position[1] - speed, this.getScale()) &&
                        vec2.add(this.position, this.position, vec2.fromValues(0, -speed));
                case 's':
                    return this.world.isWalkable(this.position[0], this.position[1] + speed, this.getScale()) &&
                        vec2.add(this.position, this.position, vec2.fromValues(0, speed));
                case 'a':
                    return this.world.isWalkable(this.position[0] - speed, this.position[1], this.getScale()) &&
                        vec2.add(this.position, this.position, vec2.fromValues(-speed, 0));
                case 'd':
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

    toJSON() {
        return Object.assign(super.toJSON(), {
            player: this.player,
        });
    }
}