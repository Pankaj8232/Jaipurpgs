import React,{useState} from "react";
import { Products } from "../products";
import toast from "react-hot-toast";



function Book({productname}){

    function Bookpg(){
        toast.success(`${productname} is Booked`)
    }
    return(
        <>
        <button onClick={Bookpg} className="Book">Book PG</button>
        
        </>
    )
}

export{Book}