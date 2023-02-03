import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';

export interface ISpriteInterface {
  name: string;
  position: number;
}

export class MapEditorStoreClass {
  levels: Array<Array<ISpriteInterface>> = [];

  constructor() {
    makeObservable(this, {
      levels: observable,
      setSprite: action,
      generateSprites: action,
    });
  }

  setSprite(level: number, newSprite: ISpriteInterface, index: number) {
    this.levels[level][index] = newSprite;
    this.levels = this.levels.slice();
  }

  generateSprites(levelsAmount: number, spritesAmount: number) {
    this.levels = Array(levelsAmount)
      .fill(0)
      .map(() => {
        return Array(spritesAmount).fill({
          name: 'default',
          position: 0,
        });
      });
  }
}

export const MapEditorStoreStore = new MapEditorStoreClass();
export const MapEditorStoreContext = createContext(MapEditorStoreStore);
export default MapEditorStoreContext;
