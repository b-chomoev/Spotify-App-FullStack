import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../users/usersSlice';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 1, backgroundColor: 'green', padding: '15px'}}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
          <Link to="/">Spotify</Link>
          <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Black.png" alt="Spotify Logo" width='30px' style={{marginLeft: '10px'}}/>
        </Typography>

        {user ?
          <>
            <UserMenu user={user}/>
          </>
          :
          <>
            <AnonymousMenu/>
          </>
        }
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;