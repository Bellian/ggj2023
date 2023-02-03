import MapEditorStoreContext from '@/stores/mapEditorStore';
import { Dialog } from '@mui/material';
import { observer } from 'mobx-react';
import React, { FC, useContext, useEffect, useState } from 'react';
import Sprite from '../Sprite/Sprite';
import Toolbar from '../Toolbar/Toolbar';
import styles from './BuildField.module.scss';

interface BuildFieldProps {
  playingFieldTotalAmountElements: number; // example 200
  playingFieldWidthAmountElements: number; // example 20 elements bevore break
}

const BuildField: FC<BuildFieldProps> = observer(
  ({ playingFieldTotalAmountElements, playingFieldWidthAmountElements }) => {
    const elementSize = { width: 20, height: 20 };

    const mapState = useContext(MapEditorStoreContext);
    const [toolbarOpen, setToolbarOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);

    useEffect(() => {
      mapState.generateSprites(playingFieldTotalAmountElements);
    }, []);

    return (
      <div className={styles.BuildField}>
        <Dialog open={toolbarOpen}>
          <Toolbar
            onSelected={(spriteSheetName, spritePosition) => {
              mapState.setSprite(
                {
                  name: spriteSheetName,
                  position: spritePosition,
                },
                activeIndex
              );
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
          {mapState.sprites.map((sprite, index) => (
            <div
              onClick={() => {
                setActiveIndex(index);
                setToolbarOpen(true);
              }}
              key={index}
            >
              <Sprite
                name={sprite.name}
                elementSize={elementSize}
                position={sprite.position}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default BuildField;
