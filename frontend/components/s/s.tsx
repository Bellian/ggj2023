import React, { FC } from 'react';
import styles from './s.module.scss';

interface SProps {}

const S: FC<SProps> = () => (
  <div className={styles.S}>
    S Component
  </div>
);

export default S;
