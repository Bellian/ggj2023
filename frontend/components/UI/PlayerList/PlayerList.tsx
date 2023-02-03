import React, { FC, useContext } from 'react';
import styles from './PlayerList.module.scss';

import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import GameStateStoreContext from '@/stores/gameStateStore';
import { observer } from 'mobx-react';
import ClearIcon from '@mui/icons-material/Clear';
import { isServer } from '@/helpers';
import ConnectionStoreContext from '@/stores/connectionStore';

interface UiPlayerListProps {}

const UiPlayerList: FC<UiPlayerListProps> = observer(() => {
  const gameStateStore = useContext(GameStateStoreContext);
  const connectionStore = useContext(ConnectionStoreContext);

  return (
    <div className={styles.UiPlayerList}>
      <h3>Players:</h3>
      <List>
        {gameStateStore.state?.players &&
          gameStateStore.state.players.map((player) => {
            return (
              <ListItem disablePadding key={player.id}>
                <ListItemText
                  primary={player.name}
                  secondary={player.id}
                ></ListItemText>
                {isServer() && player.id !== connectionStore.id && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      gameStateStore.kickPlayer(player.id);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </ListItem>
            );
          })}
      </List>
    </div>
  );
});

export default UiPlayerList;
