import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectFetchLoading, selectTracks } from '../tracksSlice.ts';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchTracks } from '../tracksThunks.ts';
import { CircularProgress, Typography } from '@mui/material';
import TrackItem from "../components/TrackItem.tsx";
import Grid from '@mui/material/Grid2';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const isFetchTracksLoading = useAppSelector(selectFetchLoading);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('album');

  useEffect(() => {
    if (id) {
      dispatch(fetchTracks(id));
    }
  }, [dispatch, id]);

  return (
    <Grid container direction="column" spacing={1}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography variant="h4">{tracks[0].album.name}</Typography>
        </Grid>
      </Grid>

      <Grid container direction="row" spacing={1}>
        {isFetchTracksLoading ? <CircularProgress /> :
          <>
            {tracks.length === 0 && !isFetchTracksLoading ? <Typography variant="h6">No tracks yet</Typography> :
              <>
                {tracks.map(track => (
                  <TrackItem
                    key={track._id}
                    name={track.name}
                    duration={track.duration}
                  />
                ))}
              </>
            }
          </>
        }
      </Grid>
    </Grid>
  );
};

export default Tracks;