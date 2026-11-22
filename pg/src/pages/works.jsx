import React from "react";
import { Header } from "../header";
import { Footer } from "../footet";
import { Howworks } from "./howworks";
import { Toaster } from "react-hot-toast";



function Work(){
    return(
        <>
        <Toaster  containerStyle={{ zIndex: 20000 }}/>
        <Header/>
        <Howworks/>
        <Footer/>
        </>
    )
}

export{Work}