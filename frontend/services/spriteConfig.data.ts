import { vec2 } from 'gl-matrix';

export function getMetadataFoSprite(name: string, position: number) {
  return getSpriteConfig.find((e) => e.name === name)?.sprites[position];
}

export interface IMetaData {
  walkable?: boolean;
  appliedForce?: vec2;
}

export interface ISpriteSheetConfig {
  name: string;
  size: { width: number; height: number };
  sprites: IMetaData[];
  animated?: boolean;
  direction?: vec2;
}

export const getSpriteConfig: ISpriteSheetConfig[] = [
  {
    name: 'factory',
    size: { width: 16, height: 16 },
    sprites: [
      // New Line 1
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      // New Line 2
      {
        walkable: true,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: false,
      },
      {
        walkable: true,
      },
      // New Line 3
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      // New Line 4
      {
        walkable: true,
        appliedForce: [-1, 0],
      },
      {
        walkable: true,
        appliedForce: [0, 1],
      },
      {
        walkable: true,
        appliedForce: [0, -1],
      },
      {
        walkable: true,
        appliedForce: [1, 0],
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      // New Line 5
      {
        walkable: true,
        appliedForce: [-1, 0],
      },
      {
        walkable: true,
        appliedForce: [0, 1],
      },
      {
        walkable: true,
        appliedForce: [0, -1],
      },
      {
        walkable: true,
        appliedForce: [1, 0],
      },
      {
        walkable: true,
        appliedForce: [0, -1],
      },
      {
        walkable: true,
        appliedForce: [1, 0],
      },
      {
        walkable: true,
        appliedForce: [1, 0],
      },
      {
        walkable: true,
        appliedForce: [0, 1],
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      // New Line 6
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
        appliedForce: [0, -1],
      },
      {
        walkable: false,
      },
      {
        walkable: true,
        appliedForce: [0, 1],
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      // New Line 7
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
        appliedForce: [0, -1],
      },
      {
        walkable: true,
        appliedForce: [-1, 0],
      },
      {
        walkable: true,
        appliedForce: [-1, 0],
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      // New Line 8
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      // New Line 9
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      // New Line 10
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      // New Line 11
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
      {
        walkable: false,
      },
      {
        walkable: false,
      },
      {
        walkable: true,
      },
      {
        walkable: true,
      },
    ],
  },
  {
    name: 'default',
    size: { width: 100, height: 100 },
    sprites: [
      {
        walkable: true,
      },
    ],
  },
  {
    name: 'empty',
    size: { width: 100, height: 100 },
    sprites: [
      {
        walkable: true,
      },
      {
        walkable: false,
      },
    ],
  },
  {
    name: 'character/person/up',
    size: { width: 16, height: 16 },
    direction: [0, 1],
    animated: true,
    sprites: [{}, {}, {}, {}],
  },
  {
    name: 'character/person/right',
    size: { width: 16, height: 16 },
    direction: [1, 0],
    animated: true,
    sprites: [{}, {}, {}, {}],
  },
  {
    name: 'character/person/down',
    size: { width: 16, height: 16 },
    direction: [0, -1],
    animated: true,
    sprites: [{}, {}, {}, {}],
  },
  {
    name: 'character/person/left',
    size: { width: 16, height: 16 },
    direction: [-1, 0],
    animated: true,
    sprites: [{}, {}, {}, {}],
  },
  {
    name: 'animations/compactor',
    size: { width: 16, height: 16 },
    animated: true,

    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/conveyor',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
    ],
  },
  {
    name: 'animations/conveyor-corner',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: true, appliedForce: [0, -1] },
      { walkable: true, appliedForce: [0, -1] },
      { walkable: true, appliedForce: [0, -1] },
      { walkable: true, appliedForce: [0, -1] },
    ],
  },
  {
    name: 'animations/conveyor-green',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
    ],
  },
  {
    name: 'animations/conveyor-no-arrow',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
    ],
  },
  {
    name: 'animations/conveyor-red',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
      { walkable: true, appliedForce: [-1, 0] },
    ],
  },
  {
    name: 'animations/crusher',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [{ walkable: false }, { walkable: false }, { walkable: false }],
  },
  {
    name: 'animations/cutter',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [{ walkable: false }, { walkable: false }, { walkable: false }],
  },
  {
    name: 'animations/drill',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/energy-controller',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/fastlane',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: true, appliedForce: [0, -1] },
      { walkable: true, appliedForce: [0, -1] },
      { walkable: true, appliedForce: [0, -1] },
    ],
  },
  {
    name: 'animations/box',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: true },
      { walkable: true },
      { walkable: true },
      { walkable: true },
    ],
  },
  {
    name: 'animations/furnace',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/garage',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/green-factory',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/helipad',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/idicator',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [{ walkable: true }, { walkable: true }],
  },
  {
    name: 'animations/manufactoring-controller',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/observation-tower',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/pcbchip',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/power-controller',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/powerplant-small',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/powerplant-tall',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/power-pole',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [{ walkable: false }, { walkable: false }, { walkable: false }],
  },
  {
    name: 'animations/pump',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/saw-horizontal',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [{ walkable: false }, { walkable: false }],
  },
  {
    name: 'animations/saw-vertical',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [{ walkable: false }, { walkable: false }],
  },
  {
    name: 'animations/solar-pannel',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/storage',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/storage-tile',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
      { walkable: false },
    ],
  },
  {
    name: 'animations/tunnel-in',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [{ walkable: false }, { walkable: false }, { walkable: false }],
  },
  {
    name: 'animations/tunnel-out',
    size: { width: 16, height: 16 },
    animated: true,
    sprites: [{ walkable: false }, { walkable: false }, { walkable: false }],
  },
  // character person
  {
    name: 'character/person/up',
    size: { width: 16, height: 16 },
    direction: [0, 1],
    animated: true,
    sprites: [{}, {}, {}, {}],
  },
  {
    name: 'character/person/right',
    size: { width: 16, height: 16 },
    direction: [1, 0],
    animated: true,
    sprites: [{}, {}, {}, {}],
  },
  {
    name: 'character/person/down',
    size: { width: 16, height: 16 },
    direction: [0, -1],
    animated: true,
    sprites: [{}, {}, {}, {}],
  },
  {
    name: 'character/person/left',
    size: { width: 16, height: 16 },
    direction: [-1, 0],
    animated: true,
    sprites: [{}, {}, {}, {}],
  },
  // character pig
  {
    name: 'character/pig/up',
    size: { width: 16, height: 16 },
    direction: [0, 1],
    animated: true,
    sprites: [{}, {}, {}, {}],
  },
  {
    name: 'character/pig/right',
    size: { width: 16, height: 16 },
    direction: [1, 0],
    animated: true,
    sprites: [{}, {}, {}, {}],
  },
  {
    name: 'character/pig/down',
    size: { width: 16, height: 16 },
    direction: [0, -1],
    animated: true,
    sprites: [{}, {}, {}, {}],
  },
  {
    name: 'character/pig/left',
    size: { width: 16, height: 16 },
    direction: [-1, 0],
    animated: true,
    sprites: [{}, {}, {}, {}],
  },
];
