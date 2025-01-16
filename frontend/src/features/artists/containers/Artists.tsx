import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectArtists, selectFetchLoading } from '../artistsSlice.ts';
import Grid from '@mui/material/Grid2';
import { CircularProgress, Typography } from '@mui/material';
import ArtistItem from '../components/ArtistItem.tsx';
import { useEffect } from 'react';
import { fetchArtists } from '../artistsThunks.ts';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isFetchArtistsLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography variant="h4">Artists</Typography>
        </Grid>
      </Grid>

      <Grid container direction="row" spacing={1}>

        {isFetchArtistsLoading ? <CircularProgress /> :
          <>
            {artists.length === 0 && !isFetchArtistsLoading ? <Typography variant="h6">No artists yet</Typography> :
              <>
                {artists.map(artist => (
                  <ArtistItem
                    key={artist._id}
                    id={artist._id}
                    name={artist.name}
                    image={artist.image}
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

export default Artists;