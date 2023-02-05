import GameStateStoreContext from '@/stores/gameStateStore';
import WorldStoreContext from '@/stores/worldStore';
import { vec2 } from 'gl-matrix';
import { observer } from 'mobx-react';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';

interface CameraParams extends PropsWithChildren {}

function Camera({ children }: CameraParams) {
  const gameState = useContext(GameStateStoreContext);
  const world = useContext(WorldStoreContext);
  const [s, setS] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setS(s + 1);
    }, 1000 / 60);
  });

  const controller = gameState.getOwnPlayerController();
  if (!controller) {
    return <>{children}</>;
  }

  const width = world.worldInfo.width;
  const height = world.worldInfo.height;
  const offset = vec2.add(vec2.create(), controller.position, [
    -width / 2,
    -height / 2,
  ]);

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: `translateX(${(-offset[0] / width) * 100}%) translateY(${
          (-offset[1] / height) * 100
        }%)`,
        contain: 'strict',
        transition: '.3s',
      }}
    >
      {children}
    </div>
  );
}

export default observer(Camera);
