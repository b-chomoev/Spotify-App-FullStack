import { createSlice } from '@reduxjs/toolkit';
import { Artist } from '../../types';
import { RootState } from '../../app/store.ts';
import { fetchArtists } from './artistsThunks.ts';

interface IArtistsState {
  artists: Artist[];
  fetchLoading: boolean;
}

const initialState: IArtistsState = {
  artists: [],
  fetchLoading: false,
};

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectFetchLoading = (state: RootState) => state.artists.fetchLoading;

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
  }
});

export const artistsReducer = artistsSlice.reducer;