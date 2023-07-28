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
          {netflixData.map((movie: NetflixState) => (
            <div key={movie.netflix_id}>
              <h2>{movie.title}</h2>
              <img src={movie.img} alt={movie.title} />
            </div>
          ))}
        </MainText>

        
        {/**  This section below is how the movie.map was supposed to run, showing the pictures of the movie poster
         * and allowing the user to see what movies are there. Since my api calls were not working properly, I included
         * what it would have looked like.
        */}

        <section style={{ 
        backgroundImage: `url("https://movies.universalpictures.com/media/opr-tsr1sheet3-look2-rgb-3-1-1-64545c0d15f1e-1.jpg")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        position: 'relative',
        top: '96px',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '2rem',
        width: '50%',
        height: '100%'
}}>
</section>
<section style={{ 
        backgroundImage: `url("https://movies.universalpictures.com/media/opr-tsr1sheet3-look2-rgb-3-1-1-64545c0d15f1e-1.jpg")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        bottom: '850px',
        left: '952px',
        alignItems: 'center',
        color: '#fff',
        fontSize: '2rem',
        width: '50%',
        height: '100%'
}}>
</section>

        {/* <img src='https://movies.universalpictures.com/media/opr-tsr1sheet3-look2-rgb-3-1-1-64545c0d15f1e-1.jpg' alt="Home" />
        <img src='https://deadline.com/wp-content/uploads/2023/04/barbie-BARBIE_VERT_TSR_W_TALENT_2764x4096_DOM_rgb.jpg?w=800' alt="Home" />
        <img src='https://movies.universalpictures.com/media/opr-tsr1sheet3-look2-rgb-3-1-1-64545c0d15f1e-1.jpg' alt="Home" /> */}
      </Main>
      
      </Root>
    </ThemeProvider>
  );
};

export default Home;