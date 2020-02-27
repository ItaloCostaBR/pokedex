import React from 'react';
import imageDefault from '../../assets/images/image_default.png';
import './style.scss';

const Loading = () => {
    return(
        <div id="loading">
            <div className="wrapper-loading">
                <figure>
                    <img src={imageDefault} alt="Carregando..." />
                </figure>
            </div>
        </div>
    )
}

export default Loading;