import { CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectAlbums, selectFetchLoading } from '../albumsSlice.ts';
import Grid from '@mui/material/Grid2';
import AlbumItem from '../components/AlbumItem.tsx';
import { fetchAlbums } from '../albumsThunks.ts';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ArtistAlbum = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const isFetchAlbumsLoading = useAppSelector(selectFetchLoading);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('artist');

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch, id]);

  return (
    <Grid container direction={'column'} spacing={2}>
      {albums.length > 0 && (
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography variant="h4">{albums[0].artist.name}</Typography>
          </Grid>
        </Grid>
      )}

      <Grid container direction="row" spacing={1}>
        {isFetchAlbumsLoading ? <CircularProgress /> :
          <>
            {albums.length === 0 && !isFetchAlbumsLoading ? <Typography variant="h6">No albums yet</Typography> :
              <>
                {albums.map(album => (
                  <AlbumItem
                    key={album._id}
                    id={album._id}
                    name={album.name}
                    image={album.image}
                    date={album.date}
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

export default ArtistAlbum;