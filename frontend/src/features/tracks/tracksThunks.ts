import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi.ts';
import { Track, TrackMutation } from '../../types';

export const fetchTracks = createAsyncThunk<Track[], string>(
  'tracks/fetchTracks',
  async (id) => {
    const response = await axiosApi.get<Track[]>(`/tracks?album=${id}`);
    return response.data;
  }
);

export const createTrack = createAsyncThunk<void, {track: TrackMutation, token: string}>(
  'tracks/createTrack',
  async ({track, token}) => {
    const formData = new FormData();

    const keys = Object.keys(track) as (keyof TrackMutation)[];

    keys.forEach((key) => {
      let value = track[key];

      if (value !== null) {
        if (typeof value === 'number') {
          value = value.toString();
        }
        formData.append(key, value);
      }
    });

    await axiosApi.post('/tracks', formData, {headers: {'Authorization': token}});
  }
);