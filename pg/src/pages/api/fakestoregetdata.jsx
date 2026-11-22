import React, { useEffect, useState } from "react";


function Fakestoreapi(){


    const [products,getproducts]=useState([])

    async function Productapi(){
        const apilink=await fetch("https://fakestoreapi.com/products")
        const data=await apilink.json()
        getproducts(data)        
    }

    useEffect(()=>{
        Productapi()
    },[])

    return(
        <>
        {
            products.map((ele,index)=>{
                return(
                    <>
                    
                   <div key={index}>
                    <h1>{ele.title}</h1>
                    <h2>{ele.price}</h2>


                   </div>
                    </>
                )
            })
        }
        </>
    )
}

export{Fakestoreapi}