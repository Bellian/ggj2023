import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './spriteSelector.module.scss';
import { betterAddEventListener } from '../../services/utils';

interface SpriteSelectorProps {
  name: string;
  elementSize: { width: number; height: number };
  spriteSize: { width: number; height: number };
  position: number;
}

const SpriteSelector: FC<SpriteSelectorProps> = ({
  name,
  elementSize,
  spriteSize,
  position,
}) => {
  const spriteSelectorElement = useRef<any>();
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [trueSpriteSheetSize, setTrueSpriteSheetSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const spriteImage = new Image();
    spriteImage.src = `/sprites/${name}.png`;
    const loadSpriteImageEvent = betterAddEventListener(
      'load',
      (event) => {
        setNaturalSize({
          width: spriteImage.naturalWidth,
          height: spriteImage.naturalHeight,
        });
      },
      spriteImage
    );
    return () => {
      loadSpriteImageEvent();
    };
  }, []);

  useEffect(() => {
    setTrueSpriteSheetSize({
      width: (elementSize.width / spriteSize.width) * naturalSize.width,
      height: (elementSize.height / spriteSize.height) * naturalSize.height,
    });
  }, [elementSize, spriteSize, naturalSize]);

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

export default SpriteSelector;
