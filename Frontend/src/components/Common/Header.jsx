import React from "react";
import Topbar from "../Layout/Topbar.jsx";
import Navbar from "./Navbar.jsx";

const Header = () => {
  return (
    <div>
      {/*Topbar*/}
      <Topbar />
      {/*navbar*/}
      <Navbar />
      {/*Cart Drawer*/}
    </div>
  );
};

export default Header;
