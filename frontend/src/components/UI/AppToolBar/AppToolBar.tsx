import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{mb: 1, backgroundColor: 'green', padding: '15px'}}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
          <Link to="/">Spotify</Link>
          <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Black.png" alt="Spotify Logo" width='30px' style={{marginLeft: '10px'}}/>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;