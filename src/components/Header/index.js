import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './style.scss';

const Header = () => {
    return(
        <header id="header">
            <div className="container">
                <div className="m-auto py-4">
                    <Link to="/">
                        <h1 style={{display: "none"}}>Pokedex</h1>
                        <figure className="logo">
                            <img src={logo} alt="Pokedex" />
                        </figure>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;