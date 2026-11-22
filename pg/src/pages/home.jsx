import React from "react";
import { Header } from "../header";
import { Banner } from "../banner";
import { Products } from "../products";
import { About } from "../about";
import { Section } from "../mapandform";
import { Pgowners } from "../pgowners";
import { Footer } from "../footet";
import { Featurearray } from "../featureproductsarray/featureproducts";
import { Toaster } from "react-hot-toast";
import { Filter } from "../filter";

function Home() {
  return (
    <>
      <Toaster containerStyle={{ zIndex: 20000 }} />
      <Header />
      <Banner />
      <Filter />
      <Featurearray />
      <Products />
      <About />
      <Pgowners />
      <Section />
      <Footer />
    </>
  );
}

export { Home };
