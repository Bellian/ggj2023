import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { useContext, useEffect } from 'react';
import Peer from 'peerjs';
import ConnectionStoreContext from '@/stores/connectionStore';
import SpriteSelector from '@/components/spriteSelector/spriteSelector';

const inter = Inter({ subsets: ['latin'] });

export default function Test() {
  return (
    <>
      <SpriteSelector
        name="factory"
        elementSize={{ width: 100, height: 100 }}
        spriteSize={{ width: 16, height: 16 }}
        position={11}
      />
      <h1>Master</h1>
    </>
  );
}
