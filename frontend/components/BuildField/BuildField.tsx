import MapEditorStoreContext from '@/stores/mapEditorStore';
import { observer } from 'mobx-react';
import React, { FC, useContext, useState } from 'react';
import Sprite from '../Sprite/Sprite';
import styles from './BuildField.module.scss';

interface BuildFieldProps {
  spriteData: Array<any>;
  elementSize: { width: number; height: number };
  playingFieldWidthAmountElements: number; // example 20 elements bevore break
}

const BuildField: FC<BuildFieldProps> = observer(
  ({ spriteData, elementSize, playingFieldWidthAmountElements }) => {
    const mapState = useContext(MapEditorStoreContext);

    return (
      <div
        className={styles.BuildField}
        style={{
          width: playingFieldWidthAmountElements * elementSize.width,
        }}
      >
        {spriteData.map((sprite, index) => (
          <div
            onClick={() =>
              console.log('TODO: Open Toolbar and wait for tile selection')
            }
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
  }
);

export default BuildField;
