export interface Artist {
  _id: string
  name: string
  image: string | null
  description: string | null
}

export interface ArtistMutation {
  name: string;
  description: string;
  image: File | null;
  // isPublished: boolean;
}

export interface Album {
  _id: string;
  name: string;
  image: string | null;
  date: number;
  artist: Artist;
}

export interface AlbumMutation {
  name: string;
  date: number;
  artist: string;
  image: File | null;
}

export interface Track {
  _id: string;
  name: string;
  duration: string;
  track_number: number;
  album: Album;
}

export interface TrackMutation {
  name: string;
  duration: string;
  track_number: number;
  album: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}


export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}