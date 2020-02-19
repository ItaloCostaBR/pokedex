import React, { Component } from 'react';
import CardPokemon from '../../components/CardPokemon';
import Loading from '../../components/Loading';
import './style.scss';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            loading: false,
            error: false,
            nextPage: '',
            prevPage: '',
        }
    }

    getAllPokemon = async (url) => {
        this.setState({...this.setState, loading: true})

        let response = await fetch(url);
        return await response.json();
    }

    componentDidMount() {
        this.getAllPokemon('https://pokeapi.co/api/v2/pokemon')
        .then(res => {
            this.setState({...this.state, loading: false, data: res.results, nextPage: res.next, prevPage: res.previous})
        })
        .catch(err => {
            this.setState({...this.state, loading: false, error: true})
            console.log(err)
        })
    }

    render() {
        return(
            <section id="section-highlight" className="padding-page">
                <div className="container">
                    {
                        this.state.loading
                        ? <Loading />
                        : (
                            Object.entries(this.state.data).length > 0
                            ? <CardPokemon objectContent={this.state.data} />
                            : <h3 className="text-center">Nenhum Pokémon encontrado.</h3>
                        )
                    }
                </div>
            </section>
        );
    }
}