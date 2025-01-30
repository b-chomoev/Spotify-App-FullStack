import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Artist, ArtistMutation } from '../../types';

export const fetchArtists = createAsyncThunk<Artist[], void>(
  'artists/fetchArtists',
  async () => {
    const artistsResponse = await axiosApi<Artist[]>('/artists');
    return artistsResponse.data;
  }
);

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  'artists/createArtist',
  async (artistMutation) => {
    const formData = new FormData();

    const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];

    keys.forEach((key) => {
      let value = artistMutation[key];

      if (typeof value === 'boolean') {
        value = value.toString();
      }

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/artists', formData);
  }
);