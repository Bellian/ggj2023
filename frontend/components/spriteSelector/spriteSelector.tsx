import React, { FC } from 'react';
import styles from './spriteSelector.module.scss';

interface SpriteSelectorProps {}

const SpriteSelector: FC<SpriteSelectorProps> = () => (
  <div className={styles.SpriteSelector}>
    SpriteSelector Component
  </div>
);

export default SpriteSelector;
