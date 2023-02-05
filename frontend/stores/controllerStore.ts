import { vec2 } from 'gl-matrix';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

export class ControllerStoreClass {
  leftStick: vec2 = [0, 0];
  rightStick: vec2 = [0, 0];
  xButton = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLeftStick(input: vec2) {
    this.leftStick = input;
  }

  setRightStick(input: vec2) {
    this.rightStick = input;
  }

  setXButton(input: boolean) {
    this.xButton = input;
  }
}

export const ControllerStore = new ControllerStoreClass();
export const ControllerStoreContext = createContext(ControllerStore);
export default ControllerStoreContext;
