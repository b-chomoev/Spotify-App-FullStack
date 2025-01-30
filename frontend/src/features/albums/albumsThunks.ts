import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Album, AlbumMutation } from '../../types';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchAlbums',
  async (artistId) => {
    const response = await axiosApi.get<Album[]>(`/albums?artist=${artistId}`);
    return response.data;
  }
);

export const createAlbum = createAsyncThunk<void, { album: AlbumMutation, token: string }>(
  'albums/createAlbum',
  async ({album, token}) => {
    const formData = new FormData();

    const keys = Object.keys(album) as (keyof AlbumMutation)[];

    keys.forEach((key) => {
      let value = album[key];

      if (value !== null) {
        if (typeof value === 'number') {
          value = value.toString();
        }
        formData.append(key, value);
      }
    });
    await axiosApi.post('/albums', formData, {headers: {'Authorization': token}});
  }
);