import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { selectCreateLoading } from '../artistsSlice.ts';
import { CircularProgress } from '@mui/material';
import ArtistForm from '../components/ArtistForm.tsx';
import { ArtistMutation } from '../../../types';
import { toast } from 'react-toastify';
import { createArtist } from '../artistsThunks.ts';
import { selectUser } from '../../../users/usersSlice.ts';

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCreateLoading = useAppSelector(selectCreateLoading);
  const user = useAppSelector(selectUser);

  const onSubmitForm = async (artist: ArtistMutation) => {
    try {
      if (user !== null) {
        await dispatch(createArtist({artist, token: user.token})).unwrap();
        toast.success('Artist was successfully created!');
        navigate('/');
      }
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