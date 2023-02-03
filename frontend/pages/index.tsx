import { FormEvent, useContext, useEffect } from 'react';
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
import PersistStoreContext from '@/stores/persistStore';
import GameStateStoreContext, {
  GameStateStoreStore,
} from '@/stores/gameStateStore';

export default observer(function Home() {
  const connectionStore = useContext(ConnectionStoreContext);
  const persistenceStore = useContext(PersistStoreContext);
  const router = useRouter();

  useEffect(() => {
    connectionStore.reset();
    GameStateStoreStore.reset();
    const interval = setInterval(() => {
      connectionStore.updateGameList();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (connectionStore.type === 'none') {
      return;
    }
    if (connectionStore.type === 'host') {
      router.push('/host');
    }
    if (connectionStore.type === 'client') {
      router.push('/join');
    }
  }, [connectionStore.type]);

  return (
    <>
      <Grid container justifyContent={'center'} gap={2} padding={2}>
        <Grid item flexGrow={0}>
          <Paper>
            <Box
              padding={3}
              display="flex"
              justifyContent={'center'}
              flexDirection="column"
              alignItems={'center'}
            >
              <h3>Player Name</h3>
              <TextField
                value={persistenceStore.name}
                onInput={(ev: FormEvent<HTMLInputElement>) => {
                  persistenceStore.set(
                    'name',
                    (ev.target as HTMLInputElement).value
                  );
                }}
                variant="standard"
                name="playerName"
                placeholder="Player Name"
                label="Player Name"
                sx={{ flexGrow: 1 }}
              ></TextField>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={'center'}
        gap={2}
        padding={2}
        alignItems="stretch"
      >
        <Grid
          item
          flexGrow={1}
          flexBasis="0"
          display={'flex'}
          flexDirection="column"
        >
          <Paper sx={{ flexGrow: 1 }}>
            <Box padding={3}>
              <h3>Join Game:</h3>
              <List>
                {connectionStore.openGames.map((game) => {
                  return (
                    <ListItem key={game} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          connectionStore.join(game);
                        }}
                      >
                        <ListItemText primary={game} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          flexGrow={1}
          flexBasis="0"
          display={'flex'}
          flexDirection="column"
        >
          <Paper sx={{ flexGrow: 1 }}>
            <Box padding={3}>
              <h3>Host Game</h3>
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  if (!ev.target['gameName'].value) {
                    ev.target['gameName'];
                    return;
                  }
                  connectionStore.host(ev.target['gameName'].value);
                }}
              >
                <Grid container>
                  <Grid item flexGrow={1} display="flex">
                    <TextField
                      variant="standard"
                      name="gameName"
                      placeholder="Game Name"
                      label="Game Name"
                      sx={{ flexGrow: 1 }}
                      required
                    ></TextField>
                  </Grid>
                  <Grid item alignItems="flex-end" display={'flex'}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ flexGrow: 0 }}
                    >
                      Host
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
});
