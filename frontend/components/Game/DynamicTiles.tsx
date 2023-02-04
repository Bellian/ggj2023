import WorldStoreContext from '@/stores/worldStore';
import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';

import TileRenderer from './TileRenderer';

interface FieldParams {
  tilesize: number;
}

export const DynamicTiles = observer(({ tilesize }: FieldParams) => {
  const wolrd = useContext(WorldStoreContext);
  const [s, setS] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setS(s + 1);
    }, 1000 / 60);
  });

  return (
    <>
      {wolrd.dynamicTiles.map((tile, index) => {
        return (
          <TileRenderer
            key={index}
            tile={tile}
            tilesize={tilesize}
            dynamic
          ></TileRenderer>
        );
      })}
    </>
  );
});

export default DynamicTiles;
