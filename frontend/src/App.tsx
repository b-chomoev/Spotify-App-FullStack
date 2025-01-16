import { Container, CssBaseline } from "@mui/material";
import AppToolbar from './components/UI/AppToolBar/AppToolBar.tsx';
import { Route, Routes } from "react-router-dom";
import Artists from "./features/artists/containers/Artists.tsx";
import ArtistAlbum from "./features/albums/containers/ArtistAlbum.tsx";
import Tracks from './features/tracks/containers/Tracks.tsx';

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
            <Route path="/albums" element={<ArtistAlbum />}/>
            <Route path="/tracks" element={<Tracks />}/>
            <Route path="*" element={(<h1>Not found</h1>)}/>
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App
