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

export const createArtist = createAsyncThunk<void, {artist: ArtistMutation, token: string }>(
  'artists/createArtist',
  async ({artist, token}) => {
    const formData = new FormData();

    const keys = Object.keys(artist) as (keyof ArtistMutation)[];

    keys.forEach((key) => {
      let value = artist[key];

      if (value !== null) {
        if (typeof value === 'boolean') {
          value = value.toString();
        }
        formData.append(key, value);
      }
    });

    await axiosApi.post('/artists', formData, {headers: {'Authorization': token}});
  }
);