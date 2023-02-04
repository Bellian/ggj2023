import Sprite from '@/components/Sprite/Sprite';
import { ITile } from '@/stores/worldStore';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import styles from './Tile.module.scss';

interface TileRendererParams {
  tilesize: number;
  tile: ITile;
  dynamic?: boolean;
}

export const TileRenderer = observer(
  ({ tile, tilesize, dynamic }: TileRendererParams) => {
    const [s, setS] = useState(0);

    useEffect(() => {
      setTimeout(() => {
        dynamic && setS(s + 1);
      }, 1000 / 60);
    });
    return (
      <div
        id={`tile-${tile.sprite.name}-${tile.sprite.position}-${tile.level}`}
        className={`${styles.tile} ${
          tile.meta?.walkable ? styles.walkable : styles.blocked
        }`}
        style={{
          left: tile.position[0] * tilesize,
          top: tile.position[1] * tilesize,
          zIndex: tile.level,
        }}
      >
        <Sprite
          {...tile.sprite}
          elementSize={{
            height: tile.scale ? tilesize * tile.scale : tilesize,
            width: tile.scale ? tilesize * tile.scale : tilesize,
          }}
        />
      </div>
    );
  }
);

export default TileRenderer;
