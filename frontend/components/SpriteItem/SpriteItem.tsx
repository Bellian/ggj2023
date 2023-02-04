import SpriteData from '@/services/spriteData';
import React, { FC } from 'react';
import styles from './SpriteItem.module.scss';

export interface SpriteItemProps {
  spriteData: SpriteData;
  elementSize: { width: number; height: number };
}

const SpriteItem: FC<SpriteItemProps> = ({ spriteData, elementSize }) => {
  console.log('render sprite item', spriteData.position);
  return (
    <div
      className={styles.SpriteItem}
      style={{
        backgroundImage: `url(/sprites/${spriteData.name}.png)`,
        width: `${elementSize.width}px`,
        height: `${elementSize.height}px`,
        imageRendering: 'pixelated',
        backgroundRepeat: 'no-repeat',
        backgroundSize: `calc(${spriteData.spriteAmount.width} * 100%) calc(${spriteData.spriteAmount.height} * 100%)`,
        backgroundPosition: `
      -${spriteData.column * elementSize.width}px
      -${spriteData.row * elementSize.height}px`,
      }}
    ></div>
  );
};

export default SpriteItem;
