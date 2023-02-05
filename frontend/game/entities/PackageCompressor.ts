import { randomElement } from "@/helpers";
import { ISpriteInterface } from "@/stores/mapEditorStore";
import { vec2, vec3 } from "gl-matrix";
import { Entity } from "./Entity";
import { Package } from "./Package";
import { PackageSpawner } from "./PackageSpawner";
import { PackageTarget } from "./PackageTarget";

const COMPRESS_TYPES = ['bzip2', 'gzip', 'br', 'compress', 'gzip', 'exi', 'lzma'];
const compressions = [];

interface ITask {
    target: number
}

export class PackageCompressor extends PackageTarget {
    static sprite = {
        name: 'animations/compactor',
        position: 0,
    };
    static className = 'PackageCompressor';
    static instance(world, gameState, connection, data) {
        const instance = new PackageCompressor(
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

        let compression = randomElement(COMPRESS_TYPES);
        while (compressions.includes(compression)) {
            compression = randomElement(COMPRESS_TYPES);
        }
        compressions.push(compression);

        this.proximityText = 'Compressor ' + compression;
    }
}