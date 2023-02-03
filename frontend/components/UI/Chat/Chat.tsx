import React, { FC, useContext, useEffect, useRef } from 'react';
import styles from './Chat.module.scss';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
} from '@mui/material';
import GameStateStoreContext from '@/stores/gameStateStore';
import { observer } from 'mobx-react';
import ClearIcon from '@mui/icons-material/Clear';
import { isServer } from '@/helpers';
import ConnectionStoreContext from '@/stores/connectionStore';

interface UiChatProps {}

const UiChat: FC<UiChatProps> = observer(() => {
  const gameStateStore = useContext(GameStateStoreContext);
  const ref = useRef<HTMLUListElement>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.scrollTo(0, ref.current.scrollHeight);
  });

  return (
    <div className={styles.UiPlayerList}>
      <h3>Chat:</h3>
      <List
        ref={ref}
        sx={{
          background: '#eeeeee',
          padding: '0.5rem',
          height: '200px',
          overflowY: 'auto',
        }}
      >
        {gameStateStore.messages &&
          gameStateStore.messages.map((message, index) => {
            return (
              <ListItem disablePadding key={index}>
                <ListItemText primary={message}></ListItemText>
              </ListItem>
            );
          })}
      </List>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          gameStateStore.sendMessage(ev.target['message'].value);
          (ev.target as any).reset();
        }}
      >
        <TextField
          name="message"
          fullWidth
          variant="outlined"
          placeholder="Message"
        />
      </form>
    </div>
  );
});

export default UiChat;
