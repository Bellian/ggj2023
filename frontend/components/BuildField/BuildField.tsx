import MapEditorStoreContext from '@/stores/mapEditorStore';
import { Button, Dialog, MenuItem, Select } from '@mui/material';
import { observer } from 'mobx-react';
import React, { FC, useContext, useEffect, useState } from 'react';
import Sprite from '../Sprite/Sprite';
import Toolbar from '../Toolbar/Toolbar';
import styles from './BuildField.module.scss';

interface BuildFieldProps {
  playingFieldTotalAmountLevels: number; //example 3
  playingFieldTotalAmountElements: number; // example 200
  playingFieldWidthAmountElements: number; // example 20 elements bevore break
}

const BuildField: FC<BuildFieldProps> = observer(
  ({
    playingFieldTotalAmountLevels,
    playingFieldTotalAmountElements,
    playingFieldWidthAmountElements,
  }) => {
    const elementSize = { width: 20, height: 20 };

    const mapState = useContext(MapEditorStoreContext);
    const [toolbarOpen, setToolbarOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [activeLevel, setActiveLevel] = React.useState(0);

    const [lastSprite, setLastSprite] = React.useState({
      name: 'default',
      position: 0,
    });

    useEffect(() => {
      mapState.generateSprites(
        playingFieldTotalAmountLevels,
        playingFieldTotalAmountElements
      );
    }, []);

    return (
      <div className={styles.BuildField}>
        <Select
          value={activeLevel}
          label="Select Level"
          onChange={(event) => {
            setActiveLevel(event.target.value as number);
          }}
          className={styles.BuildFieldSelect}
        >
          {Array(playingFieldTotalAmountLevels)
            .fill(0)
            .map((x, index) => (
              <MenuItem value={index} key={index}>
                {index}
              </MenuItem>
            ))}
        </Select>
        <Dialog open={toolbarOpen}>
          <Toolbar
            onSelected={(spriteSheetName, spritePosition) => {
              const newSprite = {
                name: spriteSheetName,
                position: spritePosition,
              };
              setLastSprite(newSprite);
              mapState.setSprite(activeLevel, newSprite, activeIndex);
              setToolbarOpen(false);
            }}
          ></Toolbar>
        </Dialog>
        <div
          className={styles.BuildFieldSelection}
          style={{
            width: playingFieldWidthAmountElements * elementSize.width,
          }}
        >
          {mapState.levels.map((level, index) => {
            return (
              <div
                className={styles.BuildFieldLevel}
                style={{
                  pointerEvents: activeLevel === index ? 'initial' : 'none',
                }}
                key={index}
              >
                {level.map((sprite, index) => (
                  <div
                    onClick={() => {
                      setActiveIndex(index);
                      setToolbarOpen(true);
                    }}
                    onContextMenu={(ev) => {
                      ev.preventDefault();
                      mapState.setSprite(activeLevel, lastSprite as any, index);
                    }}
                    key={index}
                  >
                    <Sprite
                      name={sprite.name}
                      elementSize={elementSize}
                      position={sprite.position}
                      key={index}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default BuildField;
