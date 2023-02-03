import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Sprite.module.scss';
import { betterAddEventListener, getImageSize } from '../../services/utils';
import { getSpriteConfig } from '../../services/spriteConfig.data';

interface SpriteProps {
  name: string;
  elementSize: { width: number; height: number };
  position: number;
}

const Sprite: FC<SpriteProps> = ({ name, elementSize, position }) => {
  const spriteSelectorElement = useRef<any>();
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [trueSpriteSheetSize, setTrueSpriteSheetSize] = useState({
    width: 0,
    height: 0,
  });

  const spriteConfig = getSpriteConfig.find((spriteConfigItem) => {
    return spriteConfigItem.name === name;
  }) as any;

  if (!spriteConfig) {
    throw 'define the config for this sprite you donkey!';
  }

  const spriteSize = {
    width: spriteConfig.size.width,
    height: spriteConfig.size.height,
  };

  useEffect(() => {
    getImageSize(name, (width, height) => {
      setNaturalSize({
        width,
        height,
      });
      console.log();
      setTrueSpriteSheetSize({
        width: (elementSize.width / spriteSize.width) * width,
        height: (elementSize.height / spriteSize.height) * height,
      });
    });
  }, [position, name]);
  return (
    <div
      ref={spriteSelectorElement}
      className={styles.SpriteSelector}
      style={{
        backgroundImage: `url(/sprites/${name}.png)`,
        backgroundPosition: `
          -${(position * elementSize.width) % trueSpriteSheetSize.width}px
          -${
            ((position / (trueSpriteSheetSize.width / elementSize.width)) | 0) *
            elementSize.height
          }px`,
        backgroundSize: `
          ${trueSpriteSheetSize.width}px
          ${trueSpriteSheetSize.height}px`,
        width: `${elementSize.width}px`,
        height: `${elementSize.height}px`,
        imageRendering: 'pixelated',
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
  );
};

export default Sprite;
