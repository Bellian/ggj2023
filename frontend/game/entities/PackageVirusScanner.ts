import { randomElement } from '@/helpers';
import { ISpriteInterface } from '@/stores/mapEditorStore';
import { vec2, vec3 } from 'gl-matrix';
import { Entity } from './Entity';
import { Package } from './Package';
import { PackageSpawner } from './PackageSpawner';
import { PackageTarget } from './PackageTarget';

const VIRUS_TYPES = ['worms', 'trojans', 'ransomware', 'spyware'];
const viruses = [];

interface ITask {
  target: number;
}

export class PackageVirusScanner extends PackageTarget {
  static sprite = {
    name: 'animations/storage',
    position: 0,
  };
  static className = 'PackageVirusScanner';
  static instance(world, gameState, connection, data) {
    const instance = new PackageVirusScanner(
      vec2.clone(new Float32Array(data.position)),
      vec2.clone(new Float32Array(data.rotation)),
      world,
      gameState,
      connection
    );
    instance.id = data.id;
    return instance;
  }

  constructor(position, rotation, world, gameState, connection) {
    super(position, rotation, world, gameState, connection);

    let virus = randomElement(VIRUS_TYPES);
    while (viruses.includes(virus)) {
      virus = randomElement(VIRUS_TYPES);
    }
    viruses.push(virus);

    this.proximityText = 'VirusScanner ' + virus;
  }
}
