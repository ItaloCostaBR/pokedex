import React, { Component } from 'react';
import './style.scss';
import Loading from '../../components/Loading';
import Graphics from '../../components/Graphics';

export default class Single extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            loading: false,
            error: false
        }
        this.animateImageTime = null;
    }
    async getDetailsPokemon(pokemon) {
        this.setState({...this.state, loading: true});
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemon);
        return await response.json();
    }
    animateImage() {
        this.animateImageTime = setInterval(()=>{
            let element = document.getElementById('image-pokemon');
            if(element.classList.contains("active")) {
                element.classList.remove('active');
            } else {
                element.classList.add('active');
            }
        }, 1500);
    }

    typeTranslate(type){
        const types = [["grass","Planta"], ["poison","Veneno"], ["water","Água"],
            ["bug","Inseto"], ["eletric","Elétrico"], ["ground","Terra"],
            ["fighting","Lutador"], ["psychic","Psíquico"], ["rock","Pedra"],
            ["flying","Voador"], ["ghost","Fantasma"], ["ice","Gelo"],
            ["dragon","Dragão"], ["steel","Metálico"], ["dark","Noturno"],
            ["fairy","Fada"],["fire", "Fogo"],["normal","Normal"]


        ]
        for (let i = 0, final = types.length; i < final ; i++) {
            for (let j = 0, final = types.length; j < final ; j++) {
                if(types[i][j]==type){
                    return types[i][1];
                }
            }
        }
    }

    componentDidMount() {
        let params = this.props.match.params;
        this.getDetailsPokemon(params.name)
        .then(res => {
            this.setState({...this.state, loading: false, data: res});
            this.animateImage();
        })
        .catch(err => {
            this.setState({...this.state, loading: false, error: true});
            console.log(err)
        })
    }
    componentWillUnmount() {
        clearInterval(this.animateImageTime);
    }
    render() {
        const { loading, data } = this.state;
        return(
            <section id="section-single" className="padding-page">
                <div className="container">
                    {
                        loading || !Object.entries(data).length
                        ? <Loading />
                        : (
                            <div className="wrapper-content">
                                <h2 className="text-center title-pokemon">
                                    {data.name}
                                    <figure id="image-pokemon" className="active">
                                        <img src={data.sprites.back_default} alt={data.name} className="back" style={{display: 'none'}} />
                                        <img src={data.sprites.front_default} alt={data.name} className="front" />
                                    </figure>
                                </h2>
                                <div className="type-pokemon mb-3">
                                    <ul className="list-group text-center">
                                        <li className="list-group-item active">Tipo</li>
                                        {data.types.map((value, i) =>

                                         <li key={i} className="list-group-item">{this.typeTranslate(value.type.name)}</li>
                                        )}
                                    </ul>
                                </div>
                                <Graphics infoContent={data.stats} />
                            </div>
                        )
                    }
                </div>
            </section>
        );
    }
}