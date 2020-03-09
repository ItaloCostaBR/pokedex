import React, { Component } from 'react';
import Loading from '../../Loading';
import img from '../../../assets/images/atk.jpg';

export default class CardCompare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            namePokemons: props.poke,
            infoPokemon: [],
            loading: false
        };
    }
    async getInfoPokemon (e) {
        this.setState({...this.setState, loading: true})
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/"+e);
        return await response.json();
    }

    getHigherStat(val,index){
        let newArray = []
        this.state.infoPokemon.map((e,i)=>
            newArray.push(e.stats[index].base_stat)
        )
        let max = 0
        let repeatItem = 0
        newArray.forEach((item) => {
            if(item===max){
                repeatItem = item
            }
            if(item >= max || max === 0){
                max = item
            }
        })

        if(val === repeatItem && max === repeatItem){
            return 'yellow'
        }else if(val === max){
            return 'green'
        }else{
            return 'blue'
        }
    }

    componentWillMount() {
        this.setState({loading:true});
    
        var newArray;
        this.state.namePokemons.map((e,i)=>{
            
            this.getInfoPokemon(e)
            .then(res => {
                newArray = this.state.infoPokemon;
                newArray.push(res);
            if(newArray.length===this.state.namePokemons.length) {
                newArray.splice(3,newArray.length);
                this.setState({ infoPokemon: newArray, loading: false})
            }
            })
            .catch(err => {
                console.log(err);
                this.setState({...this.setState, loading: false})
            })
        })
    }

    

    componentWillUnmount() {
        this.setState({infoPokemon:[],loading: false})
    }
    
    render(){
        const { infoPokemon,loading } = this.state;
        return (
                <section className="padding-page">
                    <div className="container d-flex shadow pb-5 pl-5 pr-5">
                        
                        { loading ? <Loading /> :infoPokemon.map((item, k) =>
                            <div key={k} className="container">
                                <div className="row justify-content-center border-bottom ">
                                    <div hidden={k>0} className="col-6"></div>
                                    <div hidden={k<1} className="col-6"></div>
                                    <div className="col-6 text-center pb-3">
                                    <figure className="card-img-top m-0">
                                        <img src={item.sprites.front_default} className="pokemon" alt={infoPokemon.name}/>
                                    </figure>
                                        {item.species.name}
                                    </div>
                                </div>
                                {item.stats.map((e,i)=>
                                    <div key={i} className="row justify-content-center text-white pt-3 ">
                                        <div hidden={k>0} className="col-6 text-nowrap text-dark">{e.stat.name}</div>
                                        <div hidden={k<1} className="col-6 text-nowrap text-dark"></div>
                                        <div className={this.getHigherStat(e.base_stat,i)==="green"?"col-6 text-center border-bottom bg-success":
                                        this.getHigherStat(e.base_stat,i)==="yellow"?"col-6 text-center border-bottom bg-warning": 
                                        "col-6 text-center border-bottom bg-secondary"}>{e.base_stat}</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
        )
    }
}