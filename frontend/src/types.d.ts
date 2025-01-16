export interface Artist {
  _id: string
  name: string
  image: string | null
  description: string | null
}

export interface Album {
  _id: string;
  name: string;
  image: string | null;
  date: number;
}