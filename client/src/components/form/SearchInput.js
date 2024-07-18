import React, { useState } from 'react'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SearchInput = () => {
    const [values , setValues]=useSearch();
    const navigate = useNavigate();
    const handleSubmit=async(e)=>{
        try{
            e.preventDefault();
            const {data}= await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({...values , result:data})
            navigate('/search')

        }catch(err){
            console.log(err)
        }

    }
  return (
    <div>
        <form className="d-flex justify-content-around" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e)=>setValues({...values,keyword:e.target.value})}/>
        <button className="btn btn-outline-dark" type="submit">Search</button>
        </form>

    </div>
  )
}

export default SearchInput
