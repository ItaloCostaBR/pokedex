import React from 'react';
import { Link } from 'react-router-dom';

const CardPokemon = (props) => {
    const { objectContent } = props;

    return(
        <div className="row">
            {objectContent.map((item, key) =>
                <div key={key} className="col-12 col-sm-6 col-md-4 mb-3">
                    <div className="card text-center">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-uppercase">{item.name}</h5>
                            <Link to={location => `/${item.name}`} className="btn btn-warning">Saiba mais</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CardPokemon;