import { Entity } from '@/game/entities/Entity';
import {
  betterAddEventListener,
  downloadObjectAsJson,
  execFuncArray,
} from '@/services/utils';
import MapEditorStoreContext from '@/stores/mapEditorStore';
import { Button, Dialog, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import React, { FC, useContext, useEffect, useState } from 'react';
import EntityToolbar from '../EntityToolbar/EntityToolbar';
import Sprite from '../Sprite/Sprite';
import Toolbar from '../Toolbar/Toolbar';
import styles from './BuildField.module.scss';

interface BuildFieldProps {}

const BuildField: FC<BuildFieldProps> = ({}) => {
  return (
    <div className={styles.BuildField}>
      <Utils />

      <DialogToolbar />
      <DialogEntityToolbar />

      <RenderMap />
    </div>
  );
};

export default BuildField;

const LevelSelect = observer(
  ({
    activeLevel,
    onChange,
    playingFieldLevels,
  }: {
    activeLevel: number;
    onChange: any;
    playingFieldLevels: number;
  }) => {
    return (
      <TextField
        value={activeLevel}
        label="Select Level"
        variant="filled"
        onChange={onChange}
        className={styles.BuildFieldInput}
        type="number"
        inputProps={{ max: playingFieldLevels - 1, min: 0 }}
      ></TextField>
    );
  }
);

const Utils = observer(() => {
  const mapState = useContext(MapEditorStoreContext);
  return (
    <div className={styles.BuildFieldUtils}>
      <Button
        variant="contained"
        onClick={() => {
          downloadObjectAsJson(
            JSON.parse(
              JSON.stringify(mapState.world).replaceAll('default', 'empty')
            ),
            'buildFieldExport'
          );
        }}
        className={styles.BuildFieldDownload}
      >
        Download State
      </Button>
      <Button
        onClick={() => {}}
        className={styles.BuildFieldLoad}
        variant="contained"
        component="label"
      >
        Load State
        <input
          onChange={(event) => {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
              mapState.loadWorld(JSON.parse((event.target as any).result));
            };
            fileReader.readAsText(event.target.files[0]);
            //
          }}
          type="file"
          hidden
        />
      </Button>
      <LevelSelect
        activeLevel={mapState.activeLevel}
        onChange={(event) => {
          mapState.set('activeLevel', +event.target.value);
        }}
        playingFieldLevels={mapState.world.levels.length}
      />
      <TextField
        className={styles.BuildFieldInput}
        label="Columns"
        variant="filled"
        type="number"
        value={mapState.world.width}
        onChange={(event) => {
          mapState.setPlayingFieldWidth(+event.target.value);
        }}
      />
      <TextField
        className={styles.BuildFieldInput}
        label="Rows"
        variant="filled"
        type="number"
        value={mapState.world.height}
        onChange={(event) =>
          mapState.setPlayingFieldHeight(+event.target.value)
        }
      />
      <TextField
        className={styles.BuildFieldInput}
        label="Levels"
        variant="filled"
        type="number"
        value={mapState.world.levels.length}
        onChange={(event) =>
          mapState.setPlayingFieldLevels(+event.target.value)
        }
      />
      <TextField
        className={styles.BuildFieldInput}
        label="Difficulty"
        variant="filled"
        type="number"
        value={mapState.world.difficulty}
        onChange={(event) => {
          mapState.setDifficulty(+event.target.value);
        }}
      />
    </div>
  );
});

const DialogToolbar = observer(() => {
  const mapState = useContext(MapEditorStoreContext);
  return (
    <Dialog open={mapState.toolbarOpen}>
      <Toolbar></Toolbar>
    </Dialog>
  );
});

const DialogEntityToolbar = observer(() => {
  const mapState = useContext(MapEditorStoreContext);
  return (
    <Dialog open={mapState.entityToolbarOpen}>
      <EntityToolbar></EntityToolbar>
    </Dialog>
  );
});

const RenderMap = observer(() => {
  const mapState = useContext(MapEditorStoreContext);
  const elementSize = 20;
  const [rightMouseDown, setRightMouseDown] = React.useState(false); // check if right mouse down used for hold insert

  useEffect(() => {
    const mousedownEvent = betterAddEventListener('mousedown', (event) => {
      event.button === 2 && setRightMouseDown(true);
    });
    const mouseupEvent = betterAddEventListener('mouseup', (event) => {
      event.button === 2 && setRightMouseDown(false);
    });

    return () => execFuncArray([mousedownEvent, mouseupEvent]);
  }, []);

  const pxWidth = mapState.world.width * elementSize;
  const pxHeight = mapState.world.height * elementSize;

  return (
    <div
      className={styles.BuildFieldSelection}
      style={{
        width: pxWidth,
        height: pxHeight,
      }}
    >
      {mapState.world.levels.map((level, activeLevelIndex) => {
        return (
          <div
            className={styles.BuildFieldLevel}
            style={{
              pointerEvents:
                mapState.activeLevel === activeLevelIndex ? 'initial' : 'none',
              width: pxWidth,
              height: pxHeight,
            }}
            key={activeLevelIndex}
          >
            {level.map((sprite, spriteIndex) => {
              let x = spriteIndex % mapState.world.width;
              let y = (spriteIndex / mapState.world.width) | 0;
              return (
                <div
                  style={{
                    position: 'absolute',
                    top: y * elementSize,
                    left: x * elementSize,
                  }}
                  onClick={(event) => {
                    mapState.set('currentEditedSprite', spriteIndex);
                    mapState.set('toolbarOpen', true);
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    if (event.button !== 1) return;
                    mapState.set('entityToolbarOpen', true);
                  }}
                  onContextMenu={(ev) => {
                    ev.preventDefault();
                    mapState.setSprite(
                      mapState.activeLevel,
                      mapState.lastSprite,
                      spriteIndex
                    );
                  }}
                  onMouseOver={() => {
                    mapState.set('activeColumn', x);
                    mapState.set('activeRow', y);
                    rightMouseDown &&
                      mapState.setSprite(
                        mapState.activeLevel,
                        mapState.lastSprite,
                        spriteIndex
                      );
                  }}
                  key={`${activeLevelIndex}-${spriteIndex}-${sprite.name}-${sprite.position}`}
                >
                  <div
                    style={{
                      width: elementSize,
                      height: elementSize,
                    }}
                  >
                    <div className={styles.BuildFieldSelectionSpriteLabel}>
                      {/*JSON.stringify(mapState.world.entities)*/}
                      {mapState.world.entities
                        .filter(
                          (entity) =>
                            entity.position[0] === x && entity.position[1] === y
                        )
                        .map((entity) => (
                          <>
                            <div
                              className={
                                styles.BuildFieldSelectionSpriteLabelIndicator
                              }
                            ></div>
                            <Sprite
                              name={`animations/${entity.class}`}
                              elementSize={{
                                width: elementSize,
                                height: elementSize,
                              }}
                              position={0}
                              animation={300}
                            />
                            <div
                              style={{
                                display:
                                  mapState.activeColumn === x &&
                                  mapState.activeRow === y
                                    ? 'block'
                                    : 'none',
                              }}
                              className={
                                styles.BuildFieldSelectionSpriteLabelActive
                              }
                            >
                              <span>Class: {entity.class}</span>
                              <br />
                              <span>Args: {entity.args}</span>
                            </div>
                          </>
                        ))}
                    </div>
                    <Sprite
                      name={sprite.name}
                      elementSize={{ width: elementSize, height: elementSize }}
                      position={sprite.position}
                      animation={300}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
});
