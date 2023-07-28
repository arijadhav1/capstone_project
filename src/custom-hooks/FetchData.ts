import React, {useState, useEffect} from "react";
import { serverCalls } from '../api';
import { NetflixState } from "../redux/slices/rootSlice";



export const useGetData = () => {
    const [netflixData, setData] = useState<NetflixState[]>([]); 

    async function handleDataFetch(){
        const result: NetflixState[] = await serverCalls.get();
        setData(result)
    }

    useEffect( () => {
        handleDataFetch()
    }, [])

    return {netflixData, getData: handleDataFetch}
}

export const darkMode = () => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
    if (theme === 'light') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
  };

}