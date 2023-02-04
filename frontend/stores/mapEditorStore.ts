import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { createContext } from 'react';

export interface ISpriteInterface {
  name: string;
  position: number;
}

export interface ISettableMapEditorElements {
  toolbarOpen: boolean;
  currentEditedSprite: number;
  activeLevel: number;

  playingFieldLevels: number;
  playingFieldHeight: number;
  playingFieldWidth: number;

  lastSprite: ISpriteInterface;
}

export class MapEditorStoreClass {
  levels: Array<Array<ISpriteInterface>> = [];

  toolbarOpen = false;
  currentEditedSprite = 0;
  activeLevel = 0;

  playingFieldLevels = 1;
  playingFieldHeight = 1;
  playingFieldWidth = 1;

  lastSprite: ISpriteInterface = {
    name: 'default',
    position: 0,
  };

  constructor() {
    makeAutoObservable(this);
    this.generateSprites();
  }

  setSprite(level: number, newSprite: ISpriteInterface, index: number) {
    this.levels[level][index] = newSprite;
    this.levels = this.levels.slice();
  }

  generateSprites() {
    this.levels = Array(this.playingFieldLevels)
      .fill(0)
      .map(() => {
        return Array(this.playingFieldWidth * this.playingFieldHeight).fill({
          name: 'default',
          position: 0,
        });
      });
  }

  loadLevels(levels: Array<any>) {
    this.levels = levels;
  }

  set<T extends keyof ISettableMapEditorElements>(
    key: T,
    value: ISettableMapEditorElements[T]
  ) {
    action(() => {
      (this as any)[key] = value;

      if (
        [
          'playingFieldLevels',
          'playingFieldHeight',
          'playingFieldWidth',
        ].includes(key)
      ) {
        this.generateSprites();
      }
    })();
  }
}

export const MapEditorStoreStore = new MapEditorStoreClass();
export const MapEditorStoreContext = createContext(MapEditorStoreStore);
export default MapEditorStoreContext;
