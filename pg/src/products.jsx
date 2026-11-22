import React from "react";
import { Pg } from "./pgphots";
import photo1 from "./assets/gopalpura.jpg";
import photo2 from "./assets/malvinagar.jpg";
import photo3 from "./assets/mansarovar.jpg";
import photo4 from "./assets/vaishali.jpg";

function Products() {
    return (
        <div className="products">
            <Pg img={photo1} name="Gopalpura" slug="gopalpura" />
            <Pg img={photo2} name="Jhotwara" slug="jhotwara" />
            <Pg img={photo3} name="Mansarovar" slug="mansarovar" />
            <Pg img={photo4} name="Vaishali" slug="vaishali" />
        </div>
    );
}

export { Products };
