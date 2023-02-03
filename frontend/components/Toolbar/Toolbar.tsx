import React, { FC, useEffect, useState } from 'react';
import Sprite from '../Sprite/Sprite';
import styles from './Toolbar.module.scss';
import { getSpriteConfig } from '@/services/spriteConfig.data';
import { getImageSize } from '@/services/utils';

interface ToolbarProps {
  onSelected: (spriteSheetName: string, spritePosition: number) => any;
}

const Toolbar: FC<ToolbarProps> = ({ onSelected }) => {
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
        (spriteConfig, spriteSheetIndex) =>
          spriteSheetSizes[spriteSheetIndex] &&
          Array.from(
            Array(
              (spriteSheetSizes[spriteSheetIndex].width /
                spriteConfig.size.width) *
                (spriteSheetSizes[spriteSheetIndex].height /
                  spriteConfig.size.height)
            )
          ).map((x, spriteIndex) => {
            return (
              <div onClick={() => onSelected(spriteConfig.name, spriteIndex)}>
                <Sprite
                  key={spriteSheetIndex + spriteIndex}
                  name={spriteConfig.name}
                  elementSize={{ width: 20, height: 20 }}
                  position={spriteIndex}
                />
              </div>
            );
          })
      )}
    </div>
  );
};

export default Toolbar;
