import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectCreateLoading } from '../tracksSlice.ts';
import { CircularProgress } from '@mui/material';
import TrackForm from '../components/TrackForm.tsx';
import { TrackMutation } from '../../../types';
import { toast } from 'react-toastify';
import { selectUser } from '../../../users/usersSlice.ts';
import { createTrack } from '../tracksThunks.ts';
import { useNavigate } from 'react-router-dom';

const NewTrack = () => {
  const dispatch = useAppDispatch();
  const isCreateLoading = useAppSelector(selectCreateLoading);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const onSubmitForm = async (track: TrackMutation) => {
    try {
      if (user !== null) {
        await dispatch(createTrack({ track, token: user.token })).unwrap();
        toast.success('Track was successfully created!');
        navigate('/tracks');
      }
    } catch (e) {
      toast.error('Error creating product');    }
  };

  return (
    <div>
      {isCreateLoading ? <CircularProgress /> : <TrackForm onSubmit={onSubmitForm} />}
    </div>
  );
};

export default NewTrack;