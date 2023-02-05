import { PackageCompressor } from '@/game/entities/PackageCompressor';
import { PackageEncryptor } from '@/game/entities/PackageEncryptor';
import { PackageReader } from '@/game/entities/PackageReader';
import { PackageSlapPig } from '@/game/entities/PackageSlapPig';
import { PackageSpawner } from '@/game/entities/PackageSpawner';
import { PackageVirusScanner } from '@/game/entities/PackageVirusScanner';
import { PlayerSpawn } from '@/game/entities/PlayerSpawn';
import { GameStateStoreStore } from '@/stores/gameStateStore';
import { vec2 } from 'gl-matrix';

export function translateData(data: any) {
  data.entities = data.entities
    .map((e: any) => {
      e.position = vec2.clone(e.position as any) as any;
      e.rotation = vec2.create() as any;
      switch (e.class) {
        case 'player-spawner':
          e.class = PlayerSpawn;
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
        case 'storage':
          e.class = PackageVirusScanner;
          break;
        case 'power-controller':
          e.class = PackageEncryptor;
          break;
        case 'compactor':
          e.class = PackageCompressor;
          break;
        case 'slap-pig':
          e.class = PackageSlapPig;
          break;
      }
      return e;
    })
    .filter((e) => typeof e.class !== 'string');
  return data;
}


export function initControlls() {
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

export function routeLevel(connectionStore, router, gameStore) {
  return function () {
    if (connectionStore.type === 'none') {
      router.push('/');
    }
    if (!gameStore.state?.state) {
      router.push('/');
    }
    if (gameStore.state?.state === 'ended') {
      router.push('/end');
    }
  }
}