import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';

export interface ISpriteInterface {
  name: string;
  position: number;
}

export class MapEditorStoreClass {
  sprites: Array<ISpriteInterface> = [];

  constructor() {
    makeObservable(this, {
      sprites: observable,
      setSprite: action,
      generateSprites: action,
    });
  }

  setSprite(newSprite: ISpriteInterface, index: number) {
    this.sprites[index] = newSprite;
    this.sprites = this.sprites.slice();
  }

  generateSprites(amount: number) {
    this.sprites.push(
      ...Array(amount).fill({
        name: 'default',
        position: 0,
      })
    );
    this.sprites = this.sprites.slice();
  }
}

export const MapEditorStoreStore = new MapEditorStoreClass();
export const MapEditorStoreContext = createContext(MapEditorStoreStore);
export default MapEditorStoreContext;
