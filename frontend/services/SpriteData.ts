import { getSpriteConfig } from './spriteConfig.data';

export default class SpriteData {
  name: string;
  // size of the loaded sprite sheet image
  imageSize = {
    width: 0,
    height: 0,
  };
  position: number;

  // px size of individual sprite
  spriteSize = {
    width: 0,
    height: 0,
  };

  // count of sprites per column/row
  spriteAmount = {
    width: 0,
    height: 0,
  };

  column = 0;
  row = 0;

  spriteConfig = {} as any; // TODO: wait for Jan's Interface

  constructor(
    name: string,
    imageSize: { width: number; height: number },
    position: number
  ) {
    this.name = name;
    this.imageSize = imageSize;
    this.position = position;

    this.compute();
  }

  compute() {
    this.spriteConfig = this.loadSpriteConfig();

    this.spriteSize.width = this.spriteConfig.size.width;
    this.spriteSize.height = this.spriteConfig.size.height;

    this.spriteAmount.width = this.imageSize.width / this.spriteSize.width;
    this.spriteAmount.height = this.imageSize.height / this.spriteSize.height;

    this.column = this.position % this.spriteAmount.width;
    this.row = (this.position / this.spriteAmount.width) | 0;
  }

  loadSpriteConfig() {
    const spriteConfig = getSpriteConfig.find((spriteConfigItem) => {
      return spriteConfigItem.name === this.name;
    }) as any;

    if (!spriteConfig) {
      throw 'define the config for this sprite you donkey!';
    }

    return spriteConfig;
  }
}
