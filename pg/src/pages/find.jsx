import React from "react";
import { Header } from "../header";
import { Footer } from "../footet";
import { Featurearray } from "../featureproductsarray/featureproducts";
import { Toaster } from "react-hot-toast";


function Find(){
    return(
        <>
        <Toaster  containerStyle={{ zIndex: 20000 }}/>
        <Header/>
        <Featurearray/>
        <Footer/>
        
        </>
    )
}

export{Find}