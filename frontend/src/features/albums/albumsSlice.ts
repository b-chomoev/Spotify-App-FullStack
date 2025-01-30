import { createSlice } from '@reduxjs/toolkit';
import { Album } from '../../types';
import { RootState } from '../../app/store';
import { createAlbum, fetchAlbums } from './albumsThunks.ts';

interface IAlbumsState {
  albums: Album[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: IAlbumsState = {
  albums: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectFetchLoading = (state: RootState) => state.albums.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.albums.createLoading;

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
        state.fetchLoading = false;
        state.albums = albums;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createAlbum.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.fetchLoading = false;
      })
      .addCase(createAlbum.rejected, (state) => {
        state.fetchLoading = false;
      })
  }
});

export const albumsReducer = albumsSlice.reducer;