import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Caminho correto após mover a pasta assets para dentro de src

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link">
          <img src={logo} alt="Logo do Projeto" className="navbar-logo" />
          <span>Projeto Carapaça</span>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/about-us" className="navbar-link">Sobre Nós</Link>
      </div>
    </nav>
  );
};

export default Navbar;
