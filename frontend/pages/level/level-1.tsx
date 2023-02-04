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

import data from './level-1.data';

const TILE_SIZE = 50;

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
    wolrd.createWorld(
      Object.assign(data, {
        entities: [
          {
            class: PlayerSpawn,
            position: vec2.fromValues(10, 3),
            rotation: vec2.create(),
            args: [],
          },
        ],
      })
    );
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
        <StaticTiles tilesize={TILE_SIZE}></StaticTiles>
        <DynamicTiles tilesize={TILE_SIZE}></DynamicTiles>
      </div>
    </div>
  );
});
