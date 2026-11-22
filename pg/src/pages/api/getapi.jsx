import React, { useEffect, useState } from "react";


function Getapi(){


    const [products,getproducts]=useState([])

    async function Fetchproducts(){
        let apilink = await fetch("http://localhost:3000/products")
        let data=await apilink.json()
        getproducts(data)
    }

    useEffect(()=>{
      Fetchproducts()
    },[])

    return(






        
        <>
        {
            products.map((ele)=>{
                return(
                    <>
                    <div className="getapidiv" key={ele.id}>
                        <div className="getapiimg">
                            <img src={ele.image} alt={ele.name}/>
                        </div>
                        <h3 className="getapiname">{ele.name}</h3>
                        <h2 className="getapiprice">{ele.price}</h2>
                        <button className="getapibutton">View Details</button>
                    </div>
                    </>
                )
            })
        }
        


        
        </>
    )
}

export{Getapi}