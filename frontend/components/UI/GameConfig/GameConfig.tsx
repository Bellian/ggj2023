import { isServer, isClient } from '@/helpers';
import GameStateStoreContext, {
  GameStateStoreStore,
} from '@/stores/gameStateStore';
import {
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Button,
} from '@mui/material';
import { observer } from 'mobx-react';
import React, { FC, useContext, useState } from 'react';
import styles from './GameConfig.module.scss';

interface UiGameConfigProps {}

const UiGameConfig: FC<UiGameConfigProps> = observer(() => {
  const gameStore = useContext(GameStateStoreContext);
  return (
    <div className={styles.UiGameConfig}>
      <List>
        <ListItem disablePadding>
          <ListItemText primary="Level"></ListItemText>
          {isServer() && (
            <Select
              onChange={(ev) => {
                gameStore.setConfig('level', parseInt(ev.target.value as any));
              }}
              defaultValue={gameStore.state?.config?.level || 1}
              SelectDisplayProps={{
                style: { paddingTop: 8, paddingBottom: 8 },
              }}
            >
              <MenuItem value={1}>Layer 1</MenuItem>
            </Select>
          )}
          {isClient() && `Layer ${gameStore.state?.config?.level || 1}`}
        </ListItem>
        {isServer() && (
          <ListItem>
            <ListItemText></ListItemText>
            <Button
              onClick={() => {
                gameStore.startGame();
              }}
              variant="contained"
            >
              Start!
            </Button>
          </ListItem>
        )}
      </List>
    </div>
  );
});

export default UiGameConfig;
