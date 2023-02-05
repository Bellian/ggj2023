import { Button } from '@mui/material';
import React, { FC, useEffect } from 'react';
import styles from './Music.module.scss';

interface MusicProps {}

const Music: FC<MusicProps> = () => {
  const playMusic = () => {
    const audio = new Audio(
      '/music/Slower-Tempo-2020-04-24_-_Arcade_Kid_-_FesliyanStudios.com_-_David_Renda.mp3'
    );
    audio.loop = true;
    audio.play();
  };
  return (
    <div className={styles.Music}>
      <Button variant="contained" onClick={playMusic}>
        Play music 🎶
      </Button>
    </div>
  );
};
export default Music;
