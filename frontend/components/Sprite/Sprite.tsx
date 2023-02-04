import React, { FC, useEffect, useState } from 'react';
import styles from './Sprite.module.scss';
import SpriteItem, { SpriteItemProps } from '../SpriteItem/SpriteItem';
import { getImageSize } from '@/services/utils';
import SpriteData from '@/services/spriteData';

interface SpriteProps {
  name: string;
  elementSize: { width: number; height: number };
  position: number;
  animation?: number; // animation delay
}

const Sprite: FC<SpriteProps> = ({
  name,
  elementSize,
  position,
  animation = 200,
}) => {
  const [spriteData, setSpriteData] = useState(null as SpriteData);

  useEffect(() => {
    getImageSize(name, (width: number, height: number) => {
      setSpriteData(new SpriteData(name, { width, height }, position));
    });
  }, [name]);

  useEffect(() => {
    if (!spriteData?.spriteConfig?.animated || !spriteData) return;

    const animationInterval = setAnimationInterval(
      animation,
      setSpriteData,
      spriteData
    );

    return () => clearInterval(animationInterval);
  }, [spriteData]);

  return (
    <div className={styles.Sprite}>
      {spriteData && (
        <SpriteItem spriteData={spriteData} elementSize={elementSize} />
      )}
    </div>
  );
};

export default Sprite;

function setAnimationInterval(
  animation: number,
  setSpriteData: Function,
  spriteData: SpriteData
) {
  return setInterval(() => {
    spriteData.position =
      (spriteData.position + 1) % spriteData.spriteAmount.width | 0;
    setSpriteData(
      new SpriteData(spriteData.name, spriteData.imageSize, spriteData.position)
    );
  }, animation);
}
