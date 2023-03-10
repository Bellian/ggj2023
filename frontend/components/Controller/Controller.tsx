import { betterAddEventListener, execFuncArray } from '@/services/utils';
import { ControllerStore } from '@/stores/controllerStore';
import React, { FC, useEffect } from 'react';
import styles from './Controller.module.scss';

interface ControllerProps {}

const Controller: FC<ControllerProps> = () => {
  useEffect(() => {
    doKeyboardStuff();

    const gamepadconnectedEvent = betterAddEventListener(
      'gamepadconnected',
      (e) => {
        console.log('gamepad connected');
        doControllerStuff();
      }
    );
    const gamepaddisconnectedEvent = betterAddEventListener(
      'gamepaddisconnected',
      (e) => console.log('gamepad disconnected')
    );

    return () =>
      execFuncArray([gamepadconnectedEvent, gamepaddisconnectedEvent]);
  }, []);
  return (
    <div className={styles.Controller}>
      Press a key on your Gamepad to connect 🎮
    </div>
  );
};

export default Controller;

function doControllerStuff() {
  return setInterval(() => {
    const controllerState = [...navigator.getGamepads()]
      .filter((p) => p)
      .map((pad) => ({
        index: pad.index,
        id: pad.id,
        mapping: pad.mapping,
        axes: pad.axes,
        buttons: [...pad.buttons].map((b) => ({
          pressed: b.pressed,
          touched: b.touched,
          value: b.value,
        })),
      }))[0];
    controllerState.axes &&
      ControllerStore.setLeftStick([
        controllerState.axes[0],
        controllerState.axes[1],
      ]);
    controllerState.axes &&
      ControllerStore.setRightStick([
        controllerState.axes[2],
        controllerState.axes[3],
      ]);
    controllerState.buttons && controllerState.buttons[0].pressed
      ? ControllerStore.setInput('x')
      : ControllerStore.removeInput('x');
  }, 2000) as any;
}

function doKeyboardStuff() {
  betterAddEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyW':
        ControllerStore.setInput('up');
        break;
      case 'KeyD':
        ControllerStore.setInput('right');
        break;
      case 'KeyS':
        ControllerStore.setInput('down');
        break;
      case 'KeyA':
        ControllerStore.setInput('left');
        break;
      case 'Space':
        ControllerStore.setInput('x');
        break;
    }
  });
  betterAddEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyW':
        ControllerStore.removeInput('up');
        break;
      case 'KeyD':
        ControllerStore.removeInput('right');
        break;
      case 'KeyS':
        ControllerStore.removeInput('down');
        break;
      case 'KeyA':
        ControllerStore.removeInput('left');
        break;
      case 'Space':
        ControllerStore.removeInput('x');
        break;
    }
  });
}
