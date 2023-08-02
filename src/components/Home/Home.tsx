import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme, ThemeProvider, createTheme } from '@mui/material'; 
import { serverCalls } from '../../api/server';
import { useGetData } from '../../custom-hooks/FetchData';


import netflix_image from '../../assets/images/netflix-queried-people-in-a-survey-about-a-wide-range-of-features-and-content-including-podcasts-user-generated-playlists-how.webp';
import { NetflixState } from '../../redux/slices/rootSlice';
import { Height } from '@mui/icons-material';

interface Props {
  title: string;
}

const Root = styled('div')({
  padding: 0,
  margin: 0
});

const NavBarContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const Logo = styled('h1')({
  margin: '0 0 0 0.45em',
});

const LogoA = styled(Link)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  listStyle: 'none',
  textTransform: 'uppercase',
  textDecoration: 'none',
}));


const LogoNavigation = styled('ul')({
  listStyle: 'none',
  textTransform: 'uppercase',
  textDecoration: 'none',
  display: 'flex',
});

const NavA = styled(Link)(({ theme }) => ({
  display: 'block',
  padding: '1em',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const Main = styled('main')(({ theme }) => ({
 
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  position: 'absolute',
  backgroundColor: theme.palette.background.default,
  color: 'red',
  
}));

const MainText = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -30%)',
  fontFamily: 'times new roman',
  fontSize: '250%',
  backgroundColor: 'red', 
  padding: '1em',
  borderRadius: '10px',
  color: theme.palette.text.primary 
}));

interface Movie {
  title: string;
  img: string;
  netflix_id: number;
}

const Home = (props: Props) => {
  const [darkMode, setDarkMode] = useState(false); 
  const theme = useTheme();
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [expiringMovies, setExpiringMovies] = useState<Movie[]>([]);
  const { netflixData, getData } = useGetData();


  useEffect(() => {
    getData();
  }, [getData]);

  console.log(netflixData);

  const appTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light', 
    },
  });
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode); 
  };
  return (
    <ThemeProvider theme={appTheme}>
      <Root>
        
        <NavBarContainer>
          <Logo>
          
          </Logo>
          <LogoNavigation>
            <li>
              <NavA to='/'>Home</NavA>
            </li>
            <li>
              <NavA to='/dashboard'>Dashboard</NavA>
            </li>
            <li>
              <NavA to='/signin'>Sign In</NavA>
            </li>
            <li>
              <NavA to='/signup'>Sign Up</NavA>
            </li>
            <li>
            
            <Button 
                style={{backgroundColor: 'white', color: 'black', borderRadius: '20px', top: '6px'}}
                onClick={toggleTheme}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
            
            </li>
          </LogoNavigation>
        </NavBarContainer>

        <Main>
        <MainText>
          <h1>{props.title}</h1>
          <p>The number 1 streaming service.</p>
          <h1>New Releases</h1>
          {netflixData.slice(0, 2).map((movie: NetflixState) => (
            <div key={movie.netflix_id}>
              <h3>{movie.title}</h3>
              <img src={movie.img} alt={movie.title} />
            </div>
          ))}
        </MainText>
      </Main>
      
      </Root>
    </ThemeProvider>
  );
};

export default Home;