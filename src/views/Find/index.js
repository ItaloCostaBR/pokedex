import React, { Component } from 'react';
import './style.scss';
import Loading from '../../components/Loading';

export default class Find extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {},
            loading: false,
            error: false
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    async getDetailsPokemon(pokemon) {
        this.setState({...this.state, loading: true});
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemon);
        return await response.json();
    }

    componentDidMount(){
        let idPokemon = this.getRandomInt(0, 150);
        this.getDetailsPokemon(idPokemon)
        .then(res => {
            this.setState({...this.state, loading: false, data: res});
            console.log(res)
        })
        .catch(err => {
            this.setState({...this.state, loading: false, error: true});
            console.log(err)
        })
    }

    checkPokemon = (e) =>{
        e.preventDefault();
        let field = document.getElementById('find');

        if(field.value === this.state.data.name){
            field.classList.add('is-valid');
            field.classList.remove('is-invalid');
            document.getElementById('tryAgain').classList.remove('d-none');
            this.evtShowPokemon();
        }else{
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    }

    evtShowPokemon = (e) => {
        let element = document.getElementById('figureBlock');
        element.classList.add("active");
    }

    render(){
        const { loading, data } = this.state;
        return (
            <section id="section-find" className="padding-page">
                <div className="container">
                    {
                        loading || !Object.entries(data).length
                        ? <Loading />
                        : (
                            <div className="wrapper-content">
                                <h2 className="text-center title-pokemon">
                                    Quem é esse Pokémon?
                                    <figure id="figureBlock">
                                        <img src={data.sprites.back_default}  className="pokemon" alt={data.name} />
                                        <img src={data.sprites.front_default}  className="pokemon" alt={data.name} />
                                    </figure>
                                </h2>
                                <div className="row">
                                    <div className="col-md-12 mt-2">
                                        <form className="form-inline justify-content" onSubmit={(event) => this.checkPokemon(event)}>
                                            <input type="text" id="find" className="findInput form-control" placeholder="Quem é esse Pokemon?"  />
                                            <button className="btn btn-primary ml-2 mt-2 mt-lg-0">Enviar</button>
                                            <button className="btn btn-info ml-2 mt-2 mt-lg-0 d-none" id="tryAgain" onClick={() => window.location.reload(false)}>Jogar novamente</button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        )
                    }
                </div>
            </section>
        );
    }
}