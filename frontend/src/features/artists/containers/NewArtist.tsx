import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { selectCreateLoading } from '../artistsSlice.ts';
import { CircularProgress } from '@mui/material';
import ArtistForm from '../components/ArtistForm.tsx';
import { ArtistMutation } from '../../../types';
import { toast } from 'react-toastify';
import { createArtist } from '../artistsThunks.ts';

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCreateLoading = useAppSelector(selectCreateLoading);

  const onSubmitForm = async (artist: ArtistMutation) => {
    try {
      await dispatch(createArtist(artist)).unwrap();
      toast.success('Artist was successfully created!');
      navigate('/artists');
    } catch (e) {
      toast.error('Error creating artist');
    }
  };

  return (
    <>
      {isCreateLoading ? <CircularProgress /> :
        <ArtistForm onSubmit={onSubmitForm}/>
      }
    </>
  );
};

export default NewArtist;