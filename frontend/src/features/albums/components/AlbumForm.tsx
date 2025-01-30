import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectArtists } from '../../artists/artistsSlice.ts';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { AlbumMutation } from '../../../types';
import { fetchArtists } from '../../artists/artistsThunks.ts';

interface Props {
  onSubmit: (album: AlbumMutation) => void;
}

const initialState = {
  name: '',
  artist: '',
  date: 0,
  image: null,
};

const AlbumForm: React.FC<Props> = ({onSubmit}) => {
  const [album, setAlbum] = useState<AlbumMutation>(initialState);
  const artists = useAppSelector(selectArtists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArtists());
  }, []);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({...album});
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAlbum(prevState => ({ ...prevState, [name]: value }));
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    const {name, value} = e.target;
    setAlbum(prevState => ({ ...prevState, [name]: value}));
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setAlbum(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }))
    }
  }

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction={'column'} spacing={2}>
        {artists.length === 0 ? 'null' :
          <Grid>
            <FormControl fullWidth>
              <InputLabel id="artist">Artist</InputLabel>
              <Select
                id="artist"
                labelId='artist'
                name="artist"
                required
                label="Artist"
                value={album?.artist}
                onChange={selectChangeHandler}
              >
                <MenuItem value='' disabled>Select category</MenuItem>
                {artists.map(artist => (
                  <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        }

        <Grid>
          <TextField name='name' value={album.name} onChange={inputChangeHandler} placeholder='Album name'/>
        </Grid>
        <Grid>
          <TextField name='date' value={album.date} onChange={inputChangeHandler} placeholder='Release date'/>
        </Grid>
        <Grid>
          <FileInput name='image' label='Image' onGetFile={fileEventChangeHandler}/>
        </Grid>
        <Grid>
          <Button type='submit' color='primary'>Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlbumForm;