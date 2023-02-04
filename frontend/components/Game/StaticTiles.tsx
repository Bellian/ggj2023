import WorldStoreContext from '@/stores/worldStore';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import TileRenderer from './TileRenderer';

interface FieldParams {
  tilesize: number;
}

export const StaticTiles = observer(({ tilesize }: FieldParams) => {
  const wolrd = useContext(WorldStoreContext);

  return (
    <>
      {wolrd.tiles.map((tile, index) => {
        return (
          <TileRenderer
            key={index}
            tile={tile}
            tilesize={tilesize}
          ></TileRenderer>
        );
      })}
    </>
  );
});

export default StaticTiles;
