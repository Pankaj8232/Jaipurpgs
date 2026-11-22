import React from "react";

function Footerli(props){
    return(
        <>
        <div>
            <ul>
                <li>{props.heading}</li>
                <li>{props.item1}</li>
                <li>{props.item2}</li>
                <li>{props.item3}</li>
                <li>{props.item4}</li>
            </ul>
        </div>
        
        
        </>
    )
}

export{Footerli}

