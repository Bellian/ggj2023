import {
  betterAddEventListener,
  downloadObjectAsJson,
  execFuncArray,
} from '@/services/utils';
import MapEditorStoreContext from '@/stores/mapEditorStore';
import { Button, Dialog, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import React, { FC, useContext, useEffect, useState } from 'react';
import Sprite from '../Sprite/Sprite';
import Toolbar from '../Toolbar/Toolbar';
import styles from './BuildField.module.scss';

interface BuildFieldProps {}

const BuildField: FC<BuildFieldProps> = ({}) => {
  return (
    <div className={styles.BuildField}>
      <Utils />

      <DialogToolbar />

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
              JSON.stringify(mapState.levels).replaceAll('default', 'empty')
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
              mapState.loadLevels(JSON.parse((event.target as any).result));
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
        playingFieldLevels={mapState.playingFieldLevels}
      />
      <TextField
        className={styles.BuildFieldInput}
        label="Columns"
        variant="filled"
        type="number"
        value={mapState.playingFieldWidth}
        onChange={(event) => {
          mapState.set('playingFieldWidth', +event.target.value);
        }}
      />
      <TextField
        className={styles.BuildFieldInput}
        label="Rows"
        variant="filled"
        type="number"
        value={mapState.playingFieldHeight}
        onChange={(event) =>
          mapState.set('playingFieldHeight', +event.target.value)
        }
      />
      <TextField
        className={styles.BuildFieldInput}
        label="Levels"
        variant="filled"
        type="number"
        value={mapState.playingFieldLevels}
        onChange={(event) =>
          mapState.set('playingFieldLevels', +event.target.value)
        }
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

const RenderMap = observer(() => {
  const mapState = useContext(MapEditorStoreContext);
  const elementSize = { width: 20, height: 20 };
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

  return (
    <div
      className={styles.BuildFieldSelection}
      style={{
        width: mapState.playingFieldWidth * elementSize.width,
      }}
    >
      {mapState.levels.map((level, activeLevelIndex) => {
        return (
          <div
            className={styles.BuildFieldLevel}
            style={{
              pointerEvents:
                mapState.activeLevel === activeLevelIndex ? 'initial' : 'none',
            }}
            key={activeLevelIndex}
          >
            {level.map((sprite, spriteIndex) => (
              <div
                onClick={() => {
                  mapState.set('currentEditedSprite', spriteIndex);
                  mapState.set('toolbarOpen', true);
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
                  rightMouseDown &&
                    mapState.setSprite(
                      mapState.activeLevel,
                      mapState.lastSprite,
                      spriteIndex
                    );
                }}
                key={activeLevelIndex + spriteIndex}
              >
                <Sprite
                  name={sprite.name}
                  elementSize={elementSize}
                  position={sprite.position}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
});
