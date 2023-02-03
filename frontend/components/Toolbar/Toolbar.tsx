import React, { FC, useEffect, useState } from 'react';
import Sprite from '../Sprite/Sprite';
import styles from './Toolbar.module.scss';
import { getSpriteConfig } from '@/services/spriteConfig.data';
import { getImageSize } from '@/services/utils';

interface ToolbarProps {}

const Toolbar: FC<ToolbarProps> = () => {
  const [spriteSheetSizes, setSpriteSheetSizes] = useState(
    Array(getSpriteConfig.length).fill({ width: 0, height: 0 })
  );

  useEffect(() => {
    getSpriteConfig.forEach((spriteConfig, index) => {
      getImageSize(spriteConfig.name, (width, height) => {
        spriteSheetSizes[index] = { width, height };
        setSpriteSheetSizes(spriteSheetSizes.slice());
      });
    });
  }, []);

  return (
    <div className={styles.Toolbar}>
      {getSpriteConfig.map(
        (spriteConfig, index) =>
          spriteSheetSizes[index] &&
          Array.from(
            Array(
              (spriteSheetSizes[index].width / spriteConfig.size.width) *
                (spriteSheetSizes[index].height / spriteConfig.size.height)
            )
          ).map((x, index) => {
            return (
              <Sprite
                name={spriteConfig.name}
                elementSize={{ width: 20, height: 20 }}
                position={index}
              />
            );
          })
      )}
    </div>
  );
};

export default Toolbar;
