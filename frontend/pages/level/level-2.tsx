import BuildField from '@/components/BuildField/BuildField';
import PlayingField from '@/components/PlayingField/PlayingField';
import Sprite from '@/components/Sprite/Sprite';
import WorldStoreContext from '@/stores/worldStore';
import { observer } from 'mobx-react';
import { useContext, useEffect } from 'react';
import styles from './Level.module.scss';

import spritedata from '@/stores/playingFieldExample.data';
import { PlayerSpawn } from '@/game/entities/PlayerSpawn';
import { vec2 } from 'gl-matrix';
import StaticTiles from '@/components/Game/StaticTiles';
import DynamicTiles from '@/components/Game/DynamicTiles';
import ConnectionStoreContext from '@/stores/connectionStore';
import GameStateStoreContext, {
  GameStateStoreStore,
} from '@/stores/gameStateStore';
import { useRouter } from 'next/router';

import data from '../../services/level-2.data';
import { PackageSpawner } from '@/game/entities/PackageSpawner';
import Camera from '@/game/assets/camera';
import { PackageCompressor } from '@/game/entities/PackageCompressor';
import { PackageReader } from '@/game/entities/PackageReader';

const TILE_SIZE = 80;

function initControlls() {
  function handleDown(ev: KeyboardEvent) {
    ev.preventDefault();
    const player = GameStateStoreStore.getOwnPlayerController();
    player.addInput(ev.key);
  }
  function handleUp(ev: KeyboardEvent) {
    const player = GameStateStoreStore.getOwnPlayerController();
    player.removeInput(ev.key);
  }

  window.addEventListener('keydown', handleDown);
  window.addEventListener('keyup', handleUp);

  return () => {
    window.removeEventListener('keydown', handleDown);
    window.removeEventListener('keyup', handleUp);
  };
}

export default observer(function Level1() {
  const wolrd = useContext(WorldStoreContext);
  const connectionStore = useContext(ConnectionStoreContext);
  const gameStore = useContext(GameStateStoreContext);
  const router = useRouter();

  useEffect(initControlls);

  useEffect(() => {
    if (connectionStore.type === 'none') {
      router.push('/');
    }
    if (!gameStore.state?.state) {
      router.push('/');
    }
  }, [connectionStore.type, gameStore.state?.state]);

  useEffect(() => {
    data.entities = data.entities
      .map((e: any) => {
        e.position = vec2.clone(e.position as any) as any;
        e.rotation = vec2.create() as any;
        switch (e.class) {
          case 'player-spawner':
            e.class = PlayerSpawn;
            break;
          case 'compactor':
            e.class = PackageCompressor;
            break;
          case 'energy-controller':
            e.class = PackageReader;
            break;
          case 'tunnel-in':
            e.class = PackageSpawner;
            break;
          case 'tunnel-out':
            e.class = PackageSpawner;
            break;
        }
        return e;
      })
      .filter((e) => typeof e.class !== 'string');

    wolrd.createWorld(data as any);
  }, []);

  if (!wolrd.tiles) {
    return <>no tiles</>;
  }

  return (
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
  );
});
