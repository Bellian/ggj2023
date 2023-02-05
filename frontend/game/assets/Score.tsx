import GameStateStoreContext from '@/stores/gameStateStore';
import WorldStoreContext from '@/stores/worldStore';
import { vec2 } from 'gl-matrix';
import { observer } from 'mobx-react';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';

function formatTime(number: number) {
  let duration = (number - Date.now()) / 1000;
  const min = (duration / 60) | 0;
  const sec = duration % 60;
  return min.toFixed(0) + ':' + sec.toFixed(0).padStart(2, '0');
}

function Score() {
  const store = useContext(GameStateStoreContext);
  const [s, setS] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setS(s + 1);
    }, 1000);
  });

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
      <h3>{formatTime(store.state?.config?.end)}</h3>
    </div>
  );
}

export default observer(Score);
