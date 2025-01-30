import { createSlice } from '@reduxjs/toolkit';
import { Artist } from '../../types';
import { RootState } from '../../app/store.ts';
import { createArtist, fetchArtists } from './artistsThunks.ts';

interface IArtistsState {
  artists: Artist[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: IArtistsState = {
  artists: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectFetchLoading = (state: RootState) => state.artists.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.artists.createLoading;

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
        state.fetchLoading = false;
        state.artists = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createArtist.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createArtist.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createArtist.rejected, (state) => {
        state.createLoading = false;
      })
  }
});

export const artistsReducer = artistsSlice.reducer;