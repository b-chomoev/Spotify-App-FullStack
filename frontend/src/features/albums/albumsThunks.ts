import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Album } from '../../types';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchAlbums',
  async (artistId) => {
    const response = await axiosApi.get<Album[]>(`/albums?artist=${artistId}`);
    return response.data;
  }
);