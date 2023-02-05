import { MapEditorStoreStore } from '@/stores/mapEditorStore';
import { Button, Input, MenuItem, Select, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import styles from './EntityToolbar.module.scss';

interface EntityToolbarProps {}

const EntityToolbar: FC<EntityToolbarProps> = () => {
  const [textData, setTextData] = useState('');
  const [typeData, setTypeData] = useState('text-spawner');

  const save = () => {
    MapEditorStoreStore.world.entities.push({
      class: typeData,
      position: [
        MapEditorStoreStore.activeColumn,
        MapEditorStoreStore.activeRow,
      ],
      args: textData ? [textData] : [],
    });
    MapEditorStoreStore.set('entityToolbarOpen', false);
  };

  const removeAll = () => {
    MapEditorStoreStore.world.entities =
      MapEditorStoreStore.world.entities.filter((entity) => {
        if (
          (entity.position[0] === MapEditorStoreStore.activeColumn,
          entity.position[1] === MapEditorStoreStore.activeRow)
        )
          return false;
        return true;
      });
    MapEditorStoreStore.set('entityToolbarOpen', false);
  };

  return (
    <div className={styles.EntityToolbar}>
      <Select
        value={typeData}
        onChange={(event) => {
          setTypeData(event.target.value);
        }}
        label="Select Type"
        className={styles.EntityToolbarSelect}
      >
        <MenuItem value="player-spawner">PlayerSpawner</MenuItem>
        <MenuItem value="compactor">Compressor (Compactor)</MenuItem>
        <MenuItem value="storage">Virus Scanner (Storage)</MenuItem>
        <MenuItem value="tunnel-in">PackageSpawner (TunnelIn)</MenuItem>
        <MenuItem value="tunnel-out">PackageSpawner (TunnelOut)</MenuItem>
        <MenuItem value="slap-pig">Piggie (pig)</MenuItem>
        <MenuItem value="energy-controller">Reader (EnergyController)</MenuItem>
        <MenuItem value="power-controller">
          Encrypter (PowerController)
        </MenuItem>
        <MenuItem value="text-spawner">TextSpawner</MenuItem>
        <MenuItem value="box">Box</MenuItem>
        <MenuItem value="crusher">Crusher</MenuItem>
        <MenuItem value="cutter">Cutter</MenuItem>
        <MenuItem value="drill">Drill</MenuItem>
        <MenuItem value="furnace">Furnace</MenuItem>
        <MenuItem value="garage">Garage</MenuItem>
        <MenuItem value="green-cactory">GreenFactory</MenuItem>
        <MenuItem value="helipad">Helipad</MenuItem>
        <MenuItem value="idicator">Idicator</MenuItem>
        <MenuItem value="manufactoring-controller">
          ManufactoringController
        </MenuItem>
        <MenuItem value="observation-tower">ObservationTower</MenuItem>
        <MenuItem value="pcbchip">Pcbchip</MenuItem>
        <MenuItem value="powerplant-small">PowerplantSmall</MenuItem>
        <MenuItem value="powerplant-tall">PowerplantTall</MenuItem>
        <MenuItem value="power-pole">PowerPole</MenuItem>
        <MenuItem value="pump">Pump</MenuItem>
        <MenuItem value="saw-horizontal">SawHorizontal</MenuItem>
        <MenuItem value="saw-vertical">SawVertical</MenuItem>
        <MenuItem value="solar-pannel">SolarPannel</MenuItem>
        <MenuItem value="storage-tile">StorageTile</MenuItem>
      </Select>
      <TextField
        value={textData}
        onChange={(event) => setTextData(event.target.value)}
        variant="filled"
        className={styles.EntityToolbarTextField}
        label="Write Message"
      />
      <Button variant="contained" onClick={save}>
        Save
      </Button>
      <Button variant="contained" onClick={removeAll}>
        Remove all at this position
      </Button>
    </div>
  );
};

export default EntityToolbar;
