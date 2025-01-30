import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ArtistMutation } from '../../../types';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import { Button } from '@mui/material';

interface Props {
  onSubmit: (artist: ArtistMutation) => void;
}

const initialState = {
  name: '',
  image: null,
  description: '',
  isPublished: false,
};

const ArtistForm: React.FC<Props> = ({onSubmit}) => {
 const [artistForm, setArtistForm] = useState<ArtistMutation>(initialState);

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setArtistForm(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }))
    }
  };

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();

    console.log(artistForm);

    onSubmit({...artistForm});
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setArtistForm(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction={'column'} spacing={2}>
        <Grid>
          <TextField
            label="Name"
            name="name"
            value={artistForm.name}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid>
          <TextField
            label="Description"
            name="description"
            value={artistForm.description}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid>
          <FileInput label="Image" name="image" onGetFile={fileEventChangeHandler}/>
        </Grid>
        <Grid>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArtistForm;