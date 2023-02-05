import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  override,
} from 'mobx';
import { createContext } from 'react';
import { IWorldInfo } from './worldStore';

export interface ISpriteInterface {
  name: string;
  position: number;
}

export interface ISettableMapEditorElements {
  toolbarOpen: boolean;
  entityToolbarOpen: boolean;

  currentEditedSprite: number;
  activeLevel: number;
  activeRow: number;
  activeColumn: number;

  lastSprite: ISpriteInterface;
}

export class MapEditorStoreClass {
  world: IWorldInfo = { levels: [[]], width: 1, height: 1, entities: [] };

  toolbarOpen = false;
  entityToolbarOpen = false;
  currentEditedSprite = 0;
  activeLevel = 0;
  activeRow = 0;
  activeColumn = 0;

  lastSprite: ISpriteInterface = {
    name: 'default',
    position: 0,
  };

  constructor() {
    makeAutoObservable(this);
    this.generateSprites();
  }

  setSprite(level: number, newSprite: ISpriteInterface, index: number) {
    this.world.levels[level][index] = newSprite;
    this.world.levels = this.world.levels.slice();
  }

  generateSprites(newLevelLength?: number) {
    this.world.levels = new Array(
      newLevelLength ? newLevelLength : this.world.levels.length
    )
      .fill(0)
      .map(() => {
        return Array(this.world.width * this.world.height).fill({
          name: 'default',
          position: 0,
        });
      });
  }

  loadWorld(world: IWorldInfo) {
    this.world = world;
  }

  set<T extends keyof ISettableMapEditorElements>(
    key: T,
    value: ISettableMapEditorElements[T]
  ) {
    action(() => {
      (this as any)[key] = value;
    })();
  }

  setPlayingFieldLevels(length: number) {
    this.generateSprites(length);
  }
  setPlayingFieldHeight(height: number) {
    this.world.height = height;
    this.generateSprites();
  }
  setPlayingFieldWidth(width: number) {
    this.world.width = width;
    this.generateSprites();
  }
}

export const MapEditorStoreStore = new MapEditorStoreClass();
export const MapEditorStoreContext = createContext(MapEditorStoreStore);
export default MapEditorStoreContext;
