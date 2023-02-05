import { vec2 } from 'gl-matrix';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

export interface IControllerStore {
  up: any;
  right: any;
  down: any;
  left: any;
  x: any;
}

export class ControllerStoreClass {
  leftStick: vec2 = [0, 0];
  rightStick: vec2 = [0, 0];

  input = new Set<keyof IControllerStore>();

  constructor() {
    makeAutoObservable(this);
  }

  setInput(input: keyof IControllerStore) {
    this.input.add(input);
  }

  removeInput(input: keyof IControllerStore) {
    this.input.delete(input);
  }

  // 1.- = links + = rechts
  // 2. - = oben + = unten
  setLeftStick(input: vec2) {
    this.leftStick = input;
    0 > input[0] && (this.setInput('left'), this.removeInput('right'));
    0 < input[0] && (this.setInput('right'), this.removeInput('left'));
    0 === input[0] && (this.removeInput('left'), this.removeInput('right'));

    0 > input[1] && (this.setInput('up'), this.removeInput('down'));
    0 > input[1] && (this.setInput('down'), this.removeInput('up'));
    0 === input[1] && (this.removeInput('up'), this.removeInput('down'));
  }

  setRightStick(input: vec2) {
    this.rightStick = input;
    // ¯\_(ツ)_/¯
  }
}

export const ControllerStore = new ControllerStoreClass();
export const ControllerStoreContext = createContext(ControllerStore);
export default ControllerStoreContext;
