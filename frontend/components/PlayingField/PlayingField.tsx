import React, { FC } from 'react';
import Sprite from '../Sprite/Sprite';
import styles from './PlayingField.module.scss';

interface PlayingFieldProps {
  spriteData: Array<any>;
  elementSize: { width: number; height: number };
  playingFieldWidthAmountElements: number; // example 20 elements bevore break
}

const PlayingField: FC<PlayingFieldProps> = ({
  spriteData,
  elementSize,
  playingFieldWidthAmountElements,
}) => (
  <div
    className={styles.PlayingField}
    style={{
      width: playingFieldWidthAmountElements * elementSize.width,
    }}
  >
    {spriteData.map((sprite) => (
      <Sprite
        name={sprite.name}
        elementSize={elementSize}
        position={sprite.position}
      />
    ))}
  </div>
);

export default PlayingField;
