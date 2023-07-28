import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from '@mui/material';

import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { NetflixForm } from '../NetflixForm';
import { update } from 'firebase/database';
import { NetflixState } from '../../redux/slices/rootSlice';




const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90},
    {
        field: 'title',
        headerName: 'Title',
        width: 150,
        editable: true
    },
    {
        field: 'title_type',
        headerName: 'Title Type',
        width: 150
    },
    {
        field: 'synopsis',
        headerName: 'Synopsis',
        width: 110
    },
    {
        field: 'rating',
        headerName: 'Rating',
        width: 150,
        type: 'number'
    },
    {
        field: 'year',
        headerName: 'Year',
        width: 150
    },
    {
        field: 'runtime',
        headerName: 'Runtime',
        width: 150
    }
];

interface Movie {
    title: string;
    title_type: string;
    synopsis: string;
    rating: number;
    year: string;
    runtime: string;
    netflix_id: number;
    img: string;
}

interface NetflixFormProps {
    onSubmit: (newMovie: NetflixState) => Promise<void>;
    id?: string;
  }

  export const DataTable = () => {

    const { netflixData, getData } = useGetData()
    const [ open, setOpen ] = useState(false)
    const [ gridData, setData ] = useState<GridRowSelectionModel>([])
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }

    const handleCreateDialogOpen = () => {
        setCreateDialogOpen(true);
      }
    
      const handleCreateDialogClose = () => {
        setCreateDialogOpen(false);
      }


      

      const createData = async (newMovie: NetflixState) => {
        await serverCalls.create(newMovie);
        getData();
      }


    const updateData = async (updatedMovie: Movie) => {
        await serverCalls.update(gridData[0] as unknown as string, updatedMovie);
        getData();
    };

    const myAuth = localStorage.getItem('myAuth')

    if (myAuth === 'true'){

    return (
        <Box sx={{ height: 400, width: '100%'}}>
            <DataGrid
                rows = {netflixData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                onRowSelectionModelChange={(newSelectionModel) => setData(newSelectionModel)}
            />
            <Button onClick={() => {
                if (gridData.length > 0) {
                    const selectedMovie = netflixData.find(movie => movie.netflix_id === gridData[0]);
                if (selectedMovie) {
                    updateData(selectedMovie);
                 }
                 }
            }}>Update</Button>
            <Button variant='contained' color='warning' onClick={deleteData}>Delete</Button>
            
            <Button onClick={handleCreateDialogOpen}>Create</Button>

            <Dialog open={createDialogOpen} onClose={handleCreateDialogClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Create a New Netflix Show/Movie</DialogTitle>
                <DialogContent>

                <NetflixForm onSubmit={createData} />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCreateDialogClose} color='error'>Cancel</Button>
                </DialogActions>
            </Dialog>    


            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Update Netflix Show/Movie</DialogTitle>
                <DialogContent>
                    <DialogContentText>Netflix id: {gridData[0]}</DialogContentText>
                    <NetflixForm id={`${gridData[0]}`} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Cancel</Button>
                </DialogActions>
            </Dialog>

        </Box>
        )} else {
            return (
                <Box>
                    <Typography variant='h4'>Please Sign In To Get Started For Your Netflix Account!</Typography>
                </Box>
            )
        }
    
  }