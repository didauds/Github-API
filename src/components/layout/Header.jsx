import React from 'react';
import './header.css';
import logo from '../../assets/github-logo.png'

const Header = () => {
  return (
    <header>
      <div className="header-logo">
        <img src={logo} alt="Github" />
        <div className='header-logo--name'>Github Repository Finder</div>
      </div>
    </header>
  )
}

export default Header