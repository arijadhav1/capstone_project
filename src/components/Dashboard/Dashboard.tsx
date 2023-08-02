import React, { useEffect, useState } from 'react';
import { Drawer as MUIDrawer,
    ListItemButton,
    List,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button,
    CssBaseline,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    createTheme,
    ThemeProvider
    } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight, ChevronLeft} from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom'; 
import { theme } from '../../Theme/themes'; 
import { DataTable } from '../DataTable/DataTable';
import { NetflixForm } from '../NetflixForm';

import { serverCalls } from '../../api/server'

const customTheme = createTheme({
    palette: {
      primary: {
        main: '#FF0000', 
      },
      background: {
        default: '#808080', 
      },
    },
  });

const drawerWidth = 240; 

const myStyles = {
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }) 
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth, 
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth, 
    },
    drawerHeader: {
        display: 'flex',
        width: drawerWidth,
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar, 
        justifyContent: 'flex-end'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: 0
    },
    contentShift: {
        transitions: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut, 
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    },
    toolbar: {
        display: 'flex'
    }, 
    toolbarButton: {
        marginLeft: 'auto',
        backgroundColor: theme.palette.primary.contrastText
    }
}




export const Dashboard = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [movies, setMovies] = useState([]);
    const [selectedId, setSelectedId] = useState<string | number | null>(null); // State variable for selected ID
  
    const handleDrawerOpen = () => {
      setOpen(true);
    }
  
    const handleDrawerClose = () => {
      setOpen(false);
    }
  
    const handleDialogOpen = (id: number | string) => { // Updated to accept an ID
      setSelectedId(id); // Set the selected ID
      setDialogOpen(true);
    }
  
    const handleDialogClose = () => {
      setDialogOpen(false);
    }

    const handleGetMovies = async () => {
        try {
          const data = await serverCalls.get();
          setMovies(data);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };


      
      useEffect(() => {
        handleGetMovies();
      }, []);


    const itemsList = [
        {
            text: 'Home',
            onClick: () => navigate('/')
        },
        {
            text: 'Sign In',
            onClick: () => navigate('/signin')
        }
    ]



    return (
        <ThemeProvider theme={customTheme}>
        <Box sx={{ display: 'flex', bgcolor: 'background.default' }}>
          <CssBaseline /> 
          <AppBar
              color='primary' 
              sx={ open ? myStyles.appBarShift : myStyles.appBar }
              position='fixed'
          >
            
            <Toolbar sx={ myStyles.toolbar }>
                <IconButton
                    color='inherit'
                    aria-label='open drawer'
                    onClick={ handleDrawerOpen }
                    edge='start'
                    sx = { open ? myStyles.hide : myStyles.menuButton }
                >
                    <MenuIcon /> 
                </IconButton>
                <Typography variant='h6' noWrap> Dashboard</Typography>
        <Button onClick={() => handleDialogOpen(1)} sx={myStyles.toolbarButton}> Edit A Netflix Show/Movie </Button> {/* Updated button */}
                <Button onClick={handleGetMovies} sx={myStyles.toolbarButton}>Get Movies</Button>
                
                <Dialog open={ dialogOpen } onClose={ handleDialogClose } aria-aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>Netflix Movie/Title:</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Enter Info Here: </DialogContentText>
                        <NetflixForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color='warning'>Cancel</Button>
                    </DialogActions>
                    
                </Dialog>
            </Toolbar>
        </AppBar>
        <MUIDrawer
            sx={ open ? myStyles.drawer : myStyles.hide }
            variant='persistent'
            anchor='left'
            open={open}
            style={{ width: drawerWidth }}
        >
            <Box sx={myStyles.drawerHeader} >
                <IconButton onClick={handleDrawerClose}>
                    { theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight /> }
                </IconButton>
            </Box>
            <Divider /> 
            <List>
                { itemsList.map((item) => {
                    const { text, onClick } = item;
                    return (
                    <ListItemButton key={text} onClick={onClick}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    )
                })}
            </List>
        </MUIDrawer>
        <Box sx={ myStyles.content } >
            <Box sx={ myStyles.drawerHeader} />
            <Typography variant='h6'>Your Favorite Shows/Movies Here!</Typography>
            <DataTable />
        </Box>
       </Box>
    </ThemeProvider>
    )
}