import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import ConnectionStoreContext from "@/stores/connectionStore";
import { Grid, Paper, Box, List, ListItem, ListItemButton, ListItemText, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import GameStateStoreContext from "@/stores/gameState";

export default observer(function Host() {
    const connectionStore = useContext(ConnectionStoreContext);
    const gameStateStore = useContext(GameStateStoreContext);
    const router = useRouter();

    return (
        <>
            <Paper>
                <Box padding={3}>
                    <h3>Create Game:</h3>
                </Box>
            </Paper>
        </>
    );
});
