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

  const win = gameStore.state.config.goal <= gameStore.state.config.score;

  useEffect(() => {
    if (!gameStore.state?.state || connectionStore.type === 'none') {
      router.push('/');
    }
    if (gameStore.state?.state && gameStore.state.state === 'prepare') {
      router.push('/join');
    }
  }, [connectionStore.type, gameStore.state?.state]);

  return (
    <>
      <Paper
        sx={{ flexGrow: 1 }}
        style={{
          border: '6px solid #781d4f',
          borderRadius: '3px',
          background: '#ffecec',
        }}
      >
        <Box padding={3} maxWidth={600} width={'98vw'}>
          <h2>{win ? 'Success!' : 'Game Over!'}</h2>
          <p>
            Points: {gameStore.state.config.score} /{' '}
            {gameStore.state.config.goal}
          </p>
        </Box>
      </Paper>
    </>
  );
});
