import { createSlice } from '@reduxjs/toolkit';
import { Track } from '../../types';
import { RootState } from '../../app/store.ts';
import { createTrack, fetchTracks } from './tracksThunks.ts';

interface ITrackState {
  tracks: Track[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: ITrackState = {
  tracks: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectFetchLoading = (state: RootState) => state.tracks.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.tracks.createLoading;

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
        state.fetchLoading = false;
        state.tracks = tracks;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createTrack.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createTrack.rejected, (state) => {
        state.createLoading = false;
      })
  }
});

export const tracksReducer = tracksSlice.reducer;