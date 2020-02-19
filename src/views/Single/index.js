import React, { Component } from 'react';
import './style.scss';
import Loading from '../../components/Loading';

export default class Single extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            loading: false,
            error: false
        }
    }
    async getDetailsPokemon(pokemon) {
        this.setState({...this.state, loading: true});
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemon);
        return await response.json();
    }
    componentDidMount() {
        let params = this.props.match.params;
        this.getDetailsPokemon(params.pokemon)
        .then(res => {
            this.setState({...this.state, loading: false, data: res});
            console.log(res)
        })
        .catch(err => {
            this.setState({...this.state, loading: false, error: true});
            console.log(err)
        })
    }
    render() {
        const { loading, data } = this.state;
        return(
            <section id="section-single">
                <div className="container">
                    {
                        loading || !Object.entries(data).length
                        ? <Loading />
                        : (
                            <div className="wrapper-content">
                                <h2 className="text-center title-pokemon">
                                    {data.name}
                                    <figure>
                                        <img src={data.sprites.back_default} alt={data.name} />
                                        <img src={data.sprites.front_default} alt={data.name} />
                                    </figure>
                                </h2>
                            </div>
                        )
                    }
                </div>
            </section>
        );
    }
}