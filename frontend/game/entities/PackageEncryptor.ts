import { randomElement } from '@/helpers';
import { ISpriteInterface } from '@/stores/mapEditorStore';
import { vec2, vec3 } from 'gl-matrix';
import { Entity } from './Entity';
import { Package } from './Package';
import { PackageSpawner } from './PackageSpawner';
import { PackageTarget } from './PackageTarget';

const PACKAGE_TYPES = ['DES', 'AES', 'RSA'];
const packages = [];

interface ITask {
  target: number;
}

export class PackageEncryptor extends PackageTarget {
  static sprite = {
    name: 'animations/power-controller',
    position: 0,
  };
  static className = 'PackageEncryptor';
  static instance(world, gameState, connection, data) {
    const instance = new PackageEncryptor(
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

    let packageName = randomElement(PACKAGE_TYPES);
    while (packages.includes(packageName)) {
      packageName = randomElement(PACKAGE_TYPES);
    }
    packages.push(packageName);

    this.proximityText = 'PackageEncryptor ' + packageName;
  }
}
