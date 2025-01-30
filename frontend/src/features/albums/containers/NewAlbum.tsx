import AlbumForm from '../components/AlbumForm.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectCreateLoading } from '../albumsSlice.ts';
import { useNavigate } from 'react-router-dom';
import { AlbumMutation } from '../../../types';
import { createAlbum } from '../albumsThunks.ts';
import { toast } from 'react-toastify';
import { selectUser } from '../../../users/usersSlice.ts';
import { CircularProgress } from '@mui/material';

const NewAlbum = () => {
  const isCreateLoading = useAppSelector(selectCreateLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onSubmitForm = async (album: AlbumMutation) => {
    try {
      if (user !== null) {
        await dispatch(createAlbum({album, token: user.token})).unwrap();
        toast.success('Album was successfully created!');
        navigate('/albums');
      }
    } catch (e) {
      toast.error('Error creating album')
    }
  };

  return (
    <>
      {isCreateLoading ? <CircularProgress/> :
        <AlbumForm onSubmit={onSubmitForm}/>
      }
    </>
  );
};

export default NewAlbum;