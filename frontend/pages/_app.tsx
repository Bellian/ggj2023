import { ConnectionStoreStore } from '@/stores/connectionStore';
import { PersistStoreStore } from '@/stores/persistStore';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ConnectionStoreStore.openPeer();
    PersistStoreStore.init();
  }, []);
  return <Component {...pageProps} />
}
