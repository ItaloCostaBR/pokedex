import React, { Component } from 'react';
import CardCompare from '../../components/CardPokemon/CardCompare';

export default class Compare extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokeCompare: props.match.params.pokeCompare.split('&')
        }
    }

    render(){
        return (
                <div>
                    <CardCompare poke={this.state.pokeCompare}/>
                </div>
        )
    }
}