import React, { Component } from 'react';
import imageDefault from '../../../assets/images/image_default.png';

export default class CardCompare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            namePokemons: props.poke,
            infoPokemon: [],
        };
    }
    async getInfoPokemon (e) {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/"+e);
        return await response.json();
    }
    componentDidMount() {
    
        var newArray;

        this.state.namePokemons.map((e,i)=>{
            
            this.getInfoPokemon(e)
            .then(res => {
                newArray = this.state.infoPokemon;
                newArray.push(res);
                
            if(this.state.infoPokemons.length===this.state.namePokemons.length) {
                this.setState({ infoPokemon: newArray})
            }
            })
            .catch(err => {
                console.log(err);
                this.setState({...this.state})
            })
        })
    }

    componentWillUnmount() {
        this.setState({infoPokemon:[]})
    }
    
    render(){
        const { infoPokemon } = this.state;
        return (
                <section className="padding-page">
                    <div className="container d-flex">
                        { 
                        infoPokemon.map((item, k) =>
                            <div key={k} className="container">
                                <div className="row justify-content-center">
                                    <div className="col-6"></div>
                                    <div className="col-6 text-center">
                                    <figure className="card-img-top m-0">
                                        <img src={item.sprites.front_default} className="pokemon" alt={infoPokemon.name}/>
                                    </figure>
                                        {item.species.name}
                                    </div>
                                </div>
                                {item.stats.map((e,i)=>
                                    <div key={i} className="row justify-content-center">
                                        <div hidden={k>0} className="col-6 text-nowrap">{e.stat.name}</div><div className="col-6 text-center">{e.base_stat}</div>
                                    </div>
                                )}
                                {console.log(item.stats)}
                            </div>
                        )}
                    </div>
                </section>
        )
    }
}