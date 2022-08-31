import React from "react";
import "./header.css";
import logo from "../../assets/github-logo.png";
import ThemeToggle from "../ui/ThemeToggle";

const Header = () => {
  return (
    <header>
      <div className="header-logo">
        <img src={logo} alt="Github" />
        <div className="header-logo--name">Github Repository Finder</div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
