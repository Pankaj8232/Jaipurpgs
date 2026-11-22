import React from "react";
import bannerimg from"./assets/bannerimg.jpg"


function Banner(){
    return(
        <>
        <div className="banner">
            <div className="bannerleft">
                <h3 className="bannerheading"><i class="fas fa-home"></i>Jaipur's PG & Hostel Marketplace</h3>
                <h1>Find a place <span>you'll love to stay.</span></h1>
                <p>Discover PGs and hostels near your college or workplace. Compare prices ,amenities and locations-all in one place.</p>
            </div>
            <div className="banneright">
                <div className="bannerimg"><img src={bannerimg} alt="Pgbanner" /></div>
                Comfort Stay In our PGs
            </div>
        </div>
        </>
    )
}

export{Banner}