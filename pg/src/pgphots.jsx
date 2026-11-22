import React from "react";
import { Link } from "react-router-dom";

function Pg(props) {
    return (
        <Link to={`/location/${props.slug}`}>
            <div className="bigbox">
                <div className="pgimages">
                    <img src={props.img} alt="" />
                </div>

                <h3>{props.name}</h3>
            </div>
        </Link>
    );
}

export { Pg };
