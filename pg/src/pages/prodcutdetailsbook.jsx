import React,{useState} from "react";
import { Products } from "../products";
import toast from "react-hot-toast";



function Bookaboutproducts({productname}){

    function Bookpg(){
        toast.success(`${productname} is Booked`)
    }
    return(
        <>
        <button onClick={Bookpg} className="Bookaboutproducts">Book PG</button>
        
        </>
    )
}

export{Bookaboutproducts}