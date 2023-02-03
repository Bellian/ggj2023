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
    });
  }

  setSprite(newSprite: ISpriteInterface, index: number) {
    this.sprites[index] = newSprite;
    this.sprites = this.sprites.slice();
  }
}

export const MapEditorStoreStore = new MapEditorStoreClass();
export const MapEditorStoreContext = createContext(MapEditorStoreStore);
export default MapEditorStoreContext;
