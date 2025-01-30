import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi.ts';
import { Track } from '../../types';

export const fetchTracks = createAsyncThunk<Track[], string>(
  'tracks/fetchTracks',
  async (id) => {
    const response = await axiosApi.get<Track[]>(`/tracks?album=${id}`);
    return response.data;
  }
);

export const createTrackHistory = createAsyncThunk(

);