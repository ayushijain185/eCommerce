import { useState,useContext, createContext, useEffect } from "react";
import axios from 'axios';
const CartContext = createContext();

const CartProvider=({children})=>{
    const [cart , setCart]=useState([]);
    useEffect(()=>{
        let existCartItem = localStorage.getItem('cart')
        if(existCartItem)setCart(JSON.parse(existCartItem))
    },[])
  
    return (
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    )
}
const useCart=()=>{
    return useContext(CartContext)
}

export {useCart , CartProvider}

