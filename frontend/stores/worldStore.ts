import { Entity } from '@/game/entities/Entity';
import { Package } from '@/game/entities/Package';
import { PackageCompressor } from '@/game/entities/PackageCompressor';
import { PackageEncryptor } from '@/game/entities/PackageEncryptor';
import { PackageReader } from '@/game/entities/PackageReader';
import { PackageSpawner } from '@/game/entities/PackageSpawner';
import { PackageTarget } from '@/game/entities/PackageTarget';
import { PackageVirusScanner } from '@/game/entities/PackageVirusScanner';
import { PlayerController } from '@/game/entities/PlayerController';
import { PlayerSpawn } from '@/game/entities/PlayerSpawn';
import { isServer } from '@/helpers';
import { getMetadataFoSprite, IMetaData } from '@/services/spriteConfig.data';
import { vec2 } from 'gl-matrix';
import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from 'mobx';
import Peer, { DataConnection } from 'peerjs';
import { createContext } from 'react';
import { ConnectionStoreStore } from './connectionStore';
import { GameStateStoreStore } from './gameStateStore';
import { ISpriteInterface } from './mapEditorStore';

export interface IWorldInfo {
  levels: ISpriteInterface[][];
  width: number;
  height: number;
  entities: {
    class: any;
    args: any[];
    position: vec2;
    rotation?: vec2;
  }[];
  difficulty: number; // 1-3
}

export interface ITile {
  sprite: ISpriteInterface;
  position: vec2;
  scale?: number;
  level: number;
  direction: vec2;
  meta: IMetaData;
  displayMeta?: any;
  entityID?: number;
}

export class WorldStoreClass {
  tilesByPosition: ITile[][][] = null;
  tiles: ITile[] = null;
  dynamicTiles: ITile[] = null;
  entities: Entity[] = null;
  worldInfo: IWorldInfo = null;

  last: number;

  constructor() {
    makeAutoObservable(this);
  }

  reset() {
    this.tiles = null;
    this.dynamicTiles = null;
    this.tilesByPosition = null;
    this.entities = null;
    this.worldInfo = null;
  }

  createWorld(info: IWorldInfo) {
    if (!GameStateStoreStore.state) {
      return;
    }
    if (this.tiles) {
      return;
    }
    this.last = performance.now();
    this.reset();
    this.worldInfo = info;
    this.createTiles(info.levels, info.width, info.height);
    this.dynamicTiles = this.dynamicTiles || [];
    this.entities = this.entities || [];
    // create entities:
    if (isServer()) {
      info.entities.forEach((entity) => {
        this.instanceEntity(
          new entity.class(
            entity.position,
            entity.rotation,
            this,
            GameStateStoreStore,
            ConnectionStoreStore
          )
        );
      });
      GameStateStoreStore.state?.players?.forEach((player) => {
        const spawn = this.entities.find((e) => e instanceof PlayerSpawn);
        if (!spawn) {
          throw Error('No player spawn!');
        }
        this.instanceEntity(
          new PlayerController(
            vec2.clone(spawn.position),
            vec2.clone(spawn.rotation),
            this,
            GameStateStoreStore,
            ConnectionStoreStore,
            player
          )
        );
      });
    }
  }

  instanceEntity(instance: Entity) {
    this.entities = this.entities || [];
    this.dynamicTiles = this.dynamicTiles || [];
    this.dynamicTiles.push({
      sprite: instance.getSprite(),
      direction: instance.rotation,
      scale: instance.getScale(),
      position: instance.position,
      level: 100,
      meta: {},
      entityID: instance.id,
    });

    this.entities.push(instance);
    if (isServer()) {
      GameStateStoreStore.state?.entities?.push(instance.toJSON());
    }
  }

  createEntity(entity: any) {
    // create entity
    let constructor: any = Entity;
    switch (entity.class) {
      case PlayerSpawn.name:
        constructor = PlayerSpawn;
        break;
      case PlayerController.name:
        constructor = PlayerController;
        break;
      case PackageSpawner.name:
        constructor = PackageSpawner;
        break;
      case Package.name:
        constructor = Package;
        break;
      case PackageCompressor.name:
        constructor = PackageCompressor;
        break;
      case PackageReader.name:
        constructor = PackageReader;
        break;
      case PackageTarget.name:
        constructor = PackageTarget;
        break;
      case PackageVirusScanner.name:
        constructor = PackageVirusScanner;
        break;
      case PackageEncryptor.name:
        constructor = PackageEncryptor;
        break;
      default:
        throw new Error('Unknown entity type' + entity.class);
    }
    const instance = (constructor as typeof Entity).instance(
      this,
      GameStateStoreStore,
      ConnectionStoreStore,
      entity
    );
    this.instanceEntity(instance);
  }

  deleteEntity(entity: Entity) {
    this.dynamicTiles = this.dynamicTiles.filter((tile) => {
      return tile.entityID !== entity.id;
    });

    this.entities = this.entities.filter((instance) => instance !== entity);
    if (isServer()) {
      GameStateStoreStore.state?.entities
        ? (GameStateStoreStore.state.entities =
            GameStateStoreStore.state?.entities?.filter(
              (e) => e.id !== entity.id
            ))
        : null;
    }
  }

  update() {
    if (!this.worldInfo) {
      return;
    }
    const now = performance.now();
    const delta = (now - this.last) / 1000;
    this.entities.forEach((e) => e.tick(delta));
    this.entities.forEach((e) => e.updateSprite());
    this.last = now;
  }

  createTiles(levels: ISpriteInterface[][], width: number, height: number) {
    this.tiles = [];
    this.tilesByPosition = Array(height)
      .fill(0)
      .map(() => []);
    this.tilesByPosition.forEach((row) => {
      row.push(
        ...Array(width)
          .fill(0)
          .map(() => [])
      );
    });
    // itterate over level
    for (let level = 0; level < levels.length; level++) {
      // itterate over sprites
      for (let sprite = 0; sprite < levels[level].length; sprite++) {
        if (levels[level][sprite].name === 'empty') {
          continue;
        }
        const x = sprite % width;
        const y = (sprite / width) | 0;
        const tile = {
          sprite: levels[level][sprite],
          direction: vec2.create(),
          position: vec2.fromValues(x, y),
          level: level,
          meta: getMetadataFoSprite(
            levels[level][sprite].name,
            levels[level][sprite].position
          ),
        } as ITile;
        this.tilesByPosition[y][x].push(tile);
        this.tiles.push(tile);
      }
    }
  }

  getTiles(x: number, y: number, r = 1) {
    const tiles: ITile[] = [];
    return tiles.concat(
      this.tilesByPosition[y | 0][x | 0],
      this.tilesByPosition[(y + r) | 0][x | 0],
      this.tilesByPosition[y | 0][(x + r) | 0],
      this.tilesByPosition[(y + r) | 0][(x + r) | 0]
    );
  }
  getUniqueTiles(x: number, y: number, r = 1) {
    const set = new Set<ITile>();
    this.getTiles(x, y, r).forEach((e) => set.add(e));
    return [...set];
  }
  isWalkable(x: number, y: number, r = 1) {
    return this.getTiles(x, y, r).reduce(
      (walkable, tile) => walkable && tile.meta.walkable,
      true
    );
  }

  tick() {}
}

export const WorldStoreStore = new WorldStoreClass();
export const WorldStoreContext = createContext(WorldStoreStore);
export default WorldStoreContext;
