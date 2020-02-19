import React from 'react';
import './style.scss';

const Footer = () => {
    return(
        <footer id="footer">
            <div className="container">
                <h5 className="m-auto py-3">
                    © 2020 <a href="https://github.com/ythalocosta" target="_blank" rel="noopener noreferrer">Italo Costa</a> e colaboradores do <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a>.
                </h5>
            </div>
        </footer>
    );
}

export default Footer;