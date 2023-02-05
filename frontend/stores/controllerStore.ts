import { vec2 } from 'gl-matrix';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

export interface IControllerStore {
  up: any;
  right: any;
  bottom: any;
  left: any;
}

export class ControllerStoreClass {
  leftStick: vec2 = [0, 0];
  rightStick: vec2 = [0, 0];
  xButton = false;

  input: Set<keyof IControllerStore>;

  constructor() {
    makeAutoObservable(this);
  }

  setInput(input: keyof IControllerStore) {
    this.input.add(input);
  }

  // 1.- = links + = rechts
  // 2. - = oben + = unten
  setLeftStick(input: vec2) {
    this.leftStick = input;
    0 > input[0] && this.setInput('left');
    0 < input[0] && this.setInput('right');

    0 > input[0] && this.setInput('up');
    0 > input[0] && this.setInput('bottom');
  }

  setRightStick(input: vec2) {
    this.rightStick = input;
    // ¯\_(ツ)_/¯
  }

  setXButton(input: boolean) {
    this.xButton = input;
  }
}

export const ControllerStore = new ControllerStoreClass();
export const ControllerStoreContext = createContext(ControllerStore);
export default ControllerStoreContext;
