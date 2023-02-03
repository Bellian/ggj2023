import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import ConnectionStoreContext from "@/stores/connectionStore";
import { Grid, Paper, Box, List, ListItem, ListItemButton, ListItemText, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";

export default observer(function Home() {
  const store = useContext(ConnectionStoreContext);
  const router = useRouter();

  useEffect(() => {
    store.reset();
  }, []);

  useEffect(() => {
    if (store.type === 'none') {
      return;
    }
    if (store.type === 'host') {
      router.push('/host');
    }
    if (store.type === 'client') {
      router.push('/join');
    }
  }, [store.type]);

  return (
    <>
      <Grid container justifyContent={"center"} gap={2} padding={2}>
        <Grid item flexGrow={1}>
          <Paper>
            <Box padding={3}>
              <h3>Join Game:</h3>
              <List>
                {
                  store.openGames.map((game) => {
                    return <ListItem key={game} disablePadding>
                      <ListItemButton>
                        <ListItemText primary={game} />
                      </ListItemButton>
                    </ListItem>
                  })
                }
              </List>
            </Box>
          </Paper>
        </Grid>
        <Grid item flexGrow={1}>
          <Paper>
            <Box padding={3}>
              <h3>Host Game</h3>
              <form onSubmit={(ev) => {
                ev.preventDefault();
                store.host(ev.target['gameName'].value);
              }}>
                <Grid container>
                  <Grid item flexGrow={1} display="flex">
                    <TextField variant="standard" name="gameName" placeholder="Game Name" label="Game Name" sx={{ flexGrow: 1 }}></TextField>
                  </Grid>
                  <Grid item alignItems="flex-end" display={'flex'}>
                    <Button type="submit" sx={{ flexGrow: 0 }}>Host</Button>
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
