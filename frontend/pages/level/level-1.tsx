import WorldStoreContext from '@/stores/worldStore';
import { observer } from 'mobx-react';
import { useContext, useEffect } from 'react';
import styles from './Level.module.scss';

import StaticTiles from '@/components/Game/StaticTiles';
import DynamicTiles from '@/components/Game/DynamicTiles';
import ConnectionStoreContext from '@/stores/connectionStore';
import GameStateStoreContext from '@/stores/gameStateStore';
import { useRouter } from 'next/router';

import Camera from '@/game/assets/camera';
import {
  initControlls,
  routeLevel,
  translateData,
} from '@/helpers/translateData';

import data from '../../services/levels/intro.data';
import Score from '@/game/assets/Score';

const TILE_SIZE = 80;

export default observer(function Level1() {
  const wolrd = useContext(WorldStoreContext);
  const connectionStore = useContext(ConnectionStoreContext);
  const gameStore = useContext(GameStateStoreContext);
  const router = useRouter();

  useEffect(initControlls);

  useEffect(routeLevel(connectionStore, router, gameStore), [
    connectionStore.type,
    gameStore.state?.state,
  ]);

  useEffect(() => {
    wolrd.createWorld(translateData(data));
  }, []);

  if (!wolrd.tiles) {
    return <>no tiles</>;
  }

  return (
    <>
      <Score></Score>
      <div className={styles.world}>
        <div
          className={styles.worldBase}
          style={{
            width: TILE_SIZE * wolrd.worldInfo.width,
            height: TILE_SIZE * wolrd.worldInfo.height,
          }}
        >
          <Camera>
            <StaticTiles tilesize={TILE_SIZE}></StaticTiles>
            <DynamicTiles tilesize={TILE_SIZE}></DynamicTiles>
          </Camera>
        </div>
      </div>
    </>
  );
});
