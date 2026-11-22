import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Find } from "./pages/find";
import { Work } from "./pages/works";
import { Aboutproduct } from "./pages/aboutproduct";
import "./App.css";
import { LoginForm } from "./login";
import { Locationproducts } from "./pages/locationproducts";
import { CartProvider } from "react-use-cart";
import { Errorpage } from "./pages/error";
import { Cart } from "./pages/cart";
import { Registeruser } from "./pages/register";
import { Adminlogin } from "./pages/adminlogin";
import { AdminPanel } from "./pages/adminpanel";
import { Themeprovider } from "./context/theme";
import { Qrcodecart } from "./qrcodecart";
import { Profile } from "./pages/profile";
import { Formcheck } from "../../backend/form";

function App() {
  return (
    <Themeprovider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find" element={<Find />} />
            <Route path="/work" element={<Work />} />
            <Route
              path="/aboutproductdetails/:slug"
              element={<Aboutproduct />}
            />
            <Route path="/location/:slug" element={<Locationproducts />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Registeruser />} />
            <Route path="/adminlogin" element={<Adminlogin />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/qrcodecart" element={<Qrcodecart/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<Errorpage />} />
            <Route path="/formcheck" element={<Formcheck/>}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </Themeprovider>
  );
}

export { App };
