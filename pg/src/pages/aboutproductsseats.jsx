import React ,{useState} from "react";
import toast from "react-hot-toast";





function Aboutbookseats({available}){

    const[seats,seatschange]=useState(1)

    function Add(){
        if(seats>=available){
            toast.error(`only ${available} seats are available`)
        }else{
            seatschange(seats+1)
        }
    }

    function Minus(){
        if(seats<=1){
            toast.error("Minimum one seat is mandatory for booking")
        }else{
            seatschange(seats-1)
        }
    }
  

    return(
        <>
       <div className="aboutseatcounter">
        <h4 className="aboutheadingseats">No. of seats booking</h4>
         <button onClick={Minus} className="aboutminusseats">-</button>
        <span className="aboutnoofseats">{seats}</span>
        <button onClick={Add} className="aboutaddseats">+</button>
       </div>
        </>
    )
}

export{Aboutbookseats}