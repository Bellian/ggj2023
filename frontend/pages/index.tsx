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
    store.init('master');
/*
    peer.on('open', (...args) => {
      console.log('open', ...args)
    })
    peer.on('close', (...args) => {
      console.log('close', ...args)
    })

    peer.on("connection", (conn) => {
      console.log('conn');
      console.log(conn);

      conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
    });

    return () => {
      peer.disconnect();
      peer.destroy();
    }
    */
    
  }, []);

  return (
    <>
      <h1>Master</h1>
    </>
  );
}
