import React, { Component } from 'react';
import imageDefault from '../../../assets/images/image_default.png';

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

    componentDidMount() {
    
        var newArray;

        this.state.namePokemons.map((e,i)=>{
            
            this.getInfoPokemon(e)
            .then(res => {
                this.setState({...this.setState, loading: false})
                newArray = this.state.infoPokemon;
                newArray.push(res);
                
            if(this.state.infoPokemons.length===this.state.namePokemons.length) {
                this.setState({ infoPokemon: newArray})
            }
            })
            .catch(err => {
                console.log(err);
                this.setState({...this.setState, loading: false})
            })
        })
    }

    getHigherStat(val,index){
       
        let newArray = []
        this.state.infoPokemon.map((e,i)=>
            newArray.push(e.stats[index].base_stat)
        )
        // console.log((new Set(newArray)).size !== newArray.length? "Yellow": Math.max.apply(Math,newArray)===val? "green":"blue" +" - "+ index)
        return (new Set(newArray)).size !== newArray.length && Math.max.apply(Math,newArray)===val? "yellow"  : Math.max.apply(Math,newArray)===val  ? "green":"blue";
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
                                <div className="row justify-content-center border-bottom">
                                    <div hidden={k>0} className="col-6"></div>
                                    <div className="col-6 text-center pb-3">
                                    <figure className="card-img-top m-0">
                                        <img src={item.sprites.front_default} className="pokemon" alt={infoPokemon.name}/>
                                    </figure>
                                        {item.species.name}
                                    </div>
                                </div>
                                {item.stats.map((e,i)=>
                                    <div key={i} className="row justify-content-center text-white pt-3">
                                        {console.log(this.getHigherStat(e.base_stat,i))}
                                        <div hidden={k>0} className="col-6 text-nowrap text-dark">{e.stat.name}</div><div className={this.getHigherStat(e.base_stat,i)==="green"?"col-6 text-center border-bottom bg-success":this.getHigherStat(e.base_stat,i)==="yellow"?"col-6 text-center border-bottom bg-warning": "col-6 text-center border-bottom bg-secondary"}>{e.base_stat}</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
        )
    }
}