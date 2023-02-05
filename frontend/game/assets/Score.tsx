import GameStateStoreContext from '@/stores/gameStateStore';
import WorldStoreContext from '@/stores/worldStore';
import { vec2 } from 'gl-matrix';
import { observer } from 'mobx-react';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';

function Score() {
  const store = useContext(GameStateStoreContext);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <h3>
        {store.state.config.score} / {store.state.config.goal}
      </h3>
    </div>
  );
}

export default observer(Score);
