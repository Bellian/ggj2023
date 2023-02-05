import { PackageCompressor } from '@/game/entities/PackageCompressor';
import { PackageEncryptor } from '@/game/entities/PackageEncryptor';
import { PackageReader } from '@/game/entities/PackageReader';
import { PackageSpawner } from '@/game/entities/PackageSpawner';
import { PackageVirusScanner } from '@/game/entities/PackageVirusScanner';
import { PlayerSpawn } from '@/game/entities/PlayerSpawn';
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
        case 'storage':
          e.class = PackageVirusScanner;
          console.log('found virus scanner (storage)');
          break;
        case 'power-controller':
          e.class = PackageEncryptor;
          console.log('found package encryptor');
          break;
      }
      return e;
    })
    .filter((e) => typeof e.class !== 'string');
  return data;
}
