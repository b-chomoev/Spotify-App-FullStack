import Grid from '@mui/material/Grid2';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectAlbums } from '../../albums/albumsSlice.ts';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TrackMutation } from '../../../types';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface Props {
  onSubmit: (track: TrackMutation) => void;
}

const initialState = {
  name: '',
  album: '',
  duration: '',
  track_number: 0,
}

const TrackForm: React.FC<Props> = ({onSubmit}) => {
  const [track, setTrack] = useState<TrackMutation>(initialState);
  const album = useAppSelector(selectAlbums);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({...track});
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setTrack(prevState => ({ ...prevState, [name]: value }));
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    const {name, value} = e.target;
    setTrack(prevState => ({ ...prevState, [name]: value}));
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction={'column'} spacing={2}>
          {album.length === 0 ? 'null' :
            <Grid size={{xs: 12}}>
              <FormControl fullWidth>
                <InputLabel id="album">Album</InputLabel>
                <Select
                  id="album"
                  labelId='album'
                  name="album"
                  required
                  label="Album"
                  value={track?.album}
                  onChange={selectChangeHandler}
                >
                  <MenuItem value='' disabled>Select category</MenuItem>
                  {album.map(album => (
                    <MenuItem key={album._id} value={album._id}>{album.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          }

        <Grid size={{xs: 12}}>
          <TextField
            id="name"
            name="name"
            label="Name"
            required
            value={track.name}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid size={{xs: 12}}>
          <TextField
            id="duration"
            name="duration"
            label="Duration"
            required
            value={track.duration}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid size={{xs: 12}}>
          <TextField
            id="track_number"
            name="track_number"
            label="Track_number"
            required
            value={track.track_number}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid>
          <Button type="submit" color="primary">Create</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;