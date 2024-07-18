import { useState,useContext, createContext, useEffect } from "react";
import axios from 'axios';
const SearchContext = createContext();

const SearchProvider=({children})=>{
    const [search , setSearch]=useState({ keyword:"" , result:[], });
  
    return (
        <SearchContext.Provider value={[search,setSearch]}>
            {children}
        </SearchContext.Provider>
    )
}
const useSearch=()=>{
    return useContext(SearchContext)
}

export {useSearch , SearchProvider}

