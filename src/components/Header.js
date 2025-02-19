import React from "react";
import logoImg from "../assets/logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/"><img className="logoImg" src={logoImg} alt="logo" /></Link>
    </header>
  );
};

export default Header;
