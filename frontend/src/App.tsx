import { Container, CssBaseline } from "@mui/material";
import AppToolbar from './components/UI/AppToolBar/AppToolBar.tsx';
import { Route, Routes } from "react-router-dom";
import Artists from "./features/artists/containers/Artists.tsx";
import Albums from "./features/albums/containers/Albums.tsx";
import Tracks from './features/tracks/containers/Tracks.tsx';
import RegisterPage from './users/RegisterPage.tsx';
import LoginPage from './users/LoginPage.tsx';
import NewArtist from './features/artists/containers/NewArtist.tsx';
import NewAlbum from './features/albums/containers/NewAlbum.tsx';
import NewTrack from './features/tracks/containers/NewTrack.tsx';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artists />}/>
            <Route path="/albums" element={<Albums />}/>
            <Route path="/tracks" element={<Tracks />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/artist/new" element={<NewArtist />}/>
            <Route path="/album/new" element={<NewAlbum />}/>
            <Route path="/track/new" element={<NewTrack />}/>
            <Route path="*" element={(<h1>Not found</h1>)}/>
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App
