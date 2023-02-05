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
import UiGameConfig from '@/components/UI/GameConfig/GameConfig';
import { isServer } from '@/helpers';

export default observer(function Host() {
  const connectionStore = useContext(ConnectionStoreContext);
  const gameStore = useContext(GameStateStoreContext);
  const router = useRouter();

  useEffect(() => {
    if (connectionStore.type === 'none') {
      router.push('/');
    }
    if (gameStore.state?.state && gameStore.state.state !== 'prepare') {
      router.push('/level/level-' + gameStore.state.config.level);
    }
  }, [connectionStore.type, gameStore.state?.state]);

  return (
    <>
      <Paper
        sx={{ flexGrow: 1 }}
        style={{
          border: '6px solid #781d4f',
          borderRadius: '3px',
          background: '#ffffff',
        }}
      >
        <Box padding={3} maxWidth={600} width={'98vw'}>
          <h3>{isServer() ? 'Host Game:' : 'Join Game:'}</h3>

          <UiGameConfig></UiGameConfig>
          <UiChat></UiChat>
          <UiPlayerList></UiPlayerList>
        </Box>
      </Paper>
    </>
  );
});
