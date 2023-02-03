import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import ConnectionStoreContext from '@/stores/connectionStore';
import {
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import GameStateStoreContext from '@/stores/gameStateStore';
import UiPlayerList from '@/components/UI/PlayerList/PlayerList';
import UiChat from '@/components/UI/Chat/Chat';

export default observer(function Host() {
  const connectionStore = useContext(ConnectionStoreContext);
  const router = useRouter();

  useEffect(() => {
    if (connectionStore.type === 'client') {
      return;
    }
    if (connectionStore.type === 'none') {
      router.push('/');
    }
    if (connectionStore.type === 'host') {
      router.push('/host');
    }
  }, [connectionStore.type]);

  return (
    <>
      <Paper>
        <Box padding={3} maxWidth={600} width={'98vw'}>
          <h3>Join Game:</h3>

          <UiPlayerList></UiPlayerList>
          <UiChat></UiChat>
        </Box>
      </Paper>
    </>
  );
});
