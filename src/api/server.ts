


import { NetflixState } from '../redux/slices/rootSlice';



import axios from 'axios';

const baseURL = 'https://unogs-unogs-v1.p.rapidapi.com';
const API_KEY = '483a400675msh63614f03f742ba7p196143jsne38443d33a97'; 

const headers = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
};

export const serverCalls = {
  get: async () => {
    try {
      const response = await axios.get(`${baseURL}/search/titles`, {
        params: {
          order_by: 'date',
          type: 'movie'
        },
        headers
      });

      const movies = response.data?.ITEMS || [];

   
      const transformedMovies = movies.map((movie: any) => {
        return {
          title: movie.title,       
          img: movie.image,         
          netflix_id: movie.nfid    
        };
      });

      return transformedMovies;
    } catch (error) {
    
      console.error('Error fetching data from the server:', error);

  
      return [];
    }
  },
  create: async (data: NetflixState) => {
    try {
      const response = await axios.post(`${baseURL}/search/titles`, data, { headers });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create data on server: ');
    }
  },
  update: async (id: string, data: NetflixState) => {
    try {
      const response = await axios.put(`${baseURL}/search/titles/${id}`, data, { headers });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update data on server: ');
    }
  },
  delete: async (id: string) => {
    try {
      await axios.delete(`${baseURL}/search/titles/${id}`, { headers });
    } catch (error) {
      throw new Error('Failed to delete data: ');
    }
  }
};
