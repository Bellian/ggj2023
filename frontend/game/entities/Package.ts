import { isClient, isServer, randomElement } from "@/helpers";
import { ISpriteInterface } from "@/stores/mapEditorStore";
import { vec2, vec3 } from "gl-matrix";
import { Entity } from "./Entity";
import { PackageSpawner } from "./PackageSpawner";
import { PackageTarget } from "./PackageTarget";


interface ITask {
    target: number
}

export class Package extends Entity {
    static sprite = {
        name: 'animations/box',
        position: 0,
    };
    static className = 'Package';
    static instance(world, gameState, connection, data) {
        const instance = new Package(
            vec2.clone(new Float32Array(data.position)),
            vec2.clone(new Float32Array(data.rotation)),
            world,
            gameState,
            connection
        );
        instance.id = data.id;
        instance.tasks = data.tasks;
        instance.actions = data.actions;

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

        this.initTasks();
    }

    eval() {
        for (let task in this.tasks) {
            if (!this.actions[task] || this.actions[task] !== this.tasks[task]) {
                return false;
            }
        }
        return true;
    }

    initTasks() {
        this.tasks = [];
        this.actions = [];
        if (isClient()) {
            return;
        }
        const destination = randomElement(this.getEntities(PackageSpawner).filter(e => vec2.dist(e.position, this.position) > 0.5));
        if (!destination) {
            throw new Error('no Destination')
        }

        const targets = this.getEntities(PackageTarget);
        while (targets.length && this.tasks.length < this.world.worldInfo.difficulty) {
            const target = randomElement(targets);
            this.tasks.push(target.id);
            targets.splice(targets.indexOf(target), 1);
        }

        this.tasks.push(destination.id);
    }

    tick(delta: number): void {
        super.tick(delta);

        if (isServer() && this.eval()) {
            this.gameState.state.config.score++;

            if (this.gameState.state.config.score >= this.gameState.state.config.goal) {
                this.gameState.endGame();
            }
        }
    }

    toJSON() {
        return Object.assign(super.toJSON(), {
            tasks: this.tasks,
            actions: this.actions,
        });
    }
}