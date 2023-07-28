import { createSlice } from '@reduxjs/toolkit'; 


export interface NetflixState {
    netflix_id: number;
    title: string;
    img: string;
    title_type: string;
    synopsis: string;
    rating: number;
    year: string;
    runtime: string;
}

const initialState: NetflixState = {
    netflix_id: 0,
    title: '',
    img: '',
    title_type: '',
    synopsis: '',
    rating: 0,
    year: '',
    runtime: ''
}

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        chooseNetflixId: (state, action) => { state.netflix_id = action.payload },
        chooseTitle: (state, action) => {state.title = action.payload},
        chooseTitleType: (state, action) => {state.title_type = action.payload},
        chooseSynopsis: (state, action) => {state.synopsis = action.payload},
        chooseRating: (state, action) => { state.rating = action.payload },
        chooseYear: (state, action) => { state.year = action.payload },
        chooseRuntime: (state, action) => { state.runtime = action.payload },        
    }
})


export const reducer = rootSlice.reducer
console.log(rootSlice)
export const {
    chooseNetflixId,
    chooseTitle,
    chooseTitleType,
    chooseSynopsis,
    chooseRating,
    chooseYear,
    chooseRuntime
} = rootSlice.actions