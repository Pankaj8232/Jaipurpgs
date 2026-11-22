import React, {use, useState } from "react";


function Days() {
    const [days, changedays] = useState(0)
    const [location,setlocation]=useState("")
    function Add(){
        changedays(days + 1)
    }

    function Subtract(){
        if (days <= 1) {
            alert("For book minimum one day is important")
        } else {
            changedays(days - 1)
        }
    }

    function Setlocation(e){
     const  handlelocation=e.target.value
     setlocation(handlelocation)
       alert(`${handlelocation} is set for your PG favourties`)
    }

    return (
        <>
            <div className="days">
                <div className="daysbox">

                    <h3 className="daysheading">
                        For how many days seeing PG, one day price is 500₹
                    </h3>

                    <button className="add" onClick={Add}>+1</button>

                    <h1 className="dayscount">{days}</h1>
                    <button className="subtract" onClick={Subtract}>-1</button>

                    <h3 className="daystotal">
                        Your total price of booking is = ₹{days * 500}
                    </h3>
                </div>
            </div>
            

            <div className="location">
                <h3 className="preference">Select Your Preference</h3>
                <select name="" id="setlocation" onChange={Setlocation}>
                    <option value="" select disabled></option>
                    <option value="Mansarovar">Mansarovar</option>
                    <option value="Malvinagar">Malvinagar</option>
                    <option value="Vaishali">Vaishhai Nagar</option>
                    <option value="Gopalpura">Gopalpura</option>
                </select>
            </div>

        </>
    )
}
export {Days}