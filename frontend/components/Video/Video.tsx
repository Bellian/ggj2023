import React, { FC } from 'react';
import styles from './Video.module.scss';

interface VideoProps {}

const Video: FC<VideoProps> = () => (
  <video autoPlay={true} muted={true} className={styles.Video} loop={true}>
    <source src="videos/background.mp4" type="video/mp4" />
  </video>
);

export default Video;
