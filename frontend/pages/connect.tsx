import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useContext, useEffect } from "react";
import Peer from 'peerjs';
import ConnectionStoreContext from "@/stores/connectionStore";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const store = useContext(ConnectionStoreContext);
  

  useEffect(() => {
    console.log('boot');
    store.init();
    setTimeout(() => {
      store.connect('master');
    }, 3000)
  }, []);


  return (
    <>
      <h1>Slave</h1>
    </>
  );
}
