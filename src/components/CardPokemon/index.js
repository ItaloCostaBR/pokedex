import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imageDefault from '../../assets/images/image_default.png';
import './style.scss';

export default class CardPokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoPokemon: props.infoPokemon,
            image: '',
            error: false
        };
    }

     async getInfoPokemon () {
        let { infoPokemon } = this.state;
        let response = await fetch(infoPokemon.url);
        return await response.json();
    }


    evtShowPokemon = (e) => {
        let element = e.currentTarget;
        // if(element.classList.contains("active")) {
        //     element.classList.remove("active");
        // } else {
            element.classList.add("active");
        // }
    }

    componentDidMount() {
        this.getInfoPokemon()
        .then(res => {
            this.setState({...this.state, image: res.sprites.front_default})
        })
        .catch(err => {
            this.setState({...this.state, error: true})
        })
    }

    render() {
        const { infoPokemon, error, image } = this.state;
        return(
            <div className="card text-center poke">
                <figure className="card-img-top" onClick={element => this.evtShowPokemon(element)}>
                    <img src={imageDefault} className="pokeball" alt={infoPokemon.name} />
                    <img src={error || image === '' ? imageDefault : image } className="pokemon" alt={infoPokemon.name} style={{opacity: "0"}} />
                </figure>
                <div className="card-body">
                    <h5 className="card-title text-uppercase">{infoPokemon.name}</h5>
                    <Link to={location => `/pokemon/${infoPokemon.name}`} className="btn btn-warning">Saiba mais</Link>
                </div>
            </div>
        )
    }
}