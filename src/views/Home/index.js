import React, { Component } from 'react';
import CardPokemon from '../../components/CardPokemon';
import Loading from '../../components/Loading';
import './style.scss';
import { Link } from 'react-router-dom';
import controlGame from '../../assets/images/icon-control.png';



export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading: false,
            loadingLoadMore: false,
            hasLoadMore: false,
            error: false,
            nextPageUrl: '',
            pokeCompare: []
        }
    }

    async getAllPokemon(url) {
        this.setState({...this.setState, loading: true})

        let response = await fetch(url);
        return await response.json();
    }

    async getMorePokemon() {
        this.setState({...this.setState, loadingLoadMore: true})

        let response = await fetch(this.state.nextPageUrl);
        return await response.json();
    }
    comparePoke(e,element){
        if(element.currentTarget.children[0].classList.contains("clicked")){
            element.currentTarget.children[0].classList.remove("clicked")
            let nArray = this.state.pokeCompare;
            nArray.splice(nArray.indexOf(e),1);
            this.setState({pokeCompare:nArray})
        }else if(this.state.pokeCompare.length < 3){
            element.currentTarget.children[0].classList.add("clicked");
            let nArray = this.state.pokeCompare;
            nArray.push(e);
            this.setState({pokeCompare:nArray})
        }
    
    }
    loadMore = (e) => {
        let button = e.currentTarget;
        button.disabled = true;

        this.getMorePokemon()
        .then(res => {
            this.setState({...this.setState, loadingLoadMore: false, data: [...this.state.data, ...res.results], nextPageUrl: res.next, hasLoadMore: res.next.length > 0})
            button.disabled = false;
        })
        .catch(err => {
            this.setState({...this.setState, loadingLoadMore: false})
            console.log(err)
        })
    }

    componentDidMount() {
        this.getAllPokemon('https://pokeapi.co/api/v2/pokemon')
        .then(res => {
            this.setState({...this.state, loading: false, data: res.results, nextPageUrl: res.next, hasLoadMore: res.next.length > 0})
        })
        .catch(err => {
            this.setState({...this.state, loading: false, error: true})
            console.log(err)
        })
    }

    render() {
        const { data, hasLoadMore, loading, loadingLoadMore } = this.state;
        return(
            <section id="section-home" className="padding-page">
                <div className="container">
                    {
                        loading
                        ? <Loading />
                        : (
                            Object.entries(data).length > 0
                            ? (
                                <div className="wrapper-content text-center">
                                    <Link to={location => `/game/${this.state.pokeCompare.join().replace(",","&").replace(",","&")}`}>
                                        <figure className="control-game">
                                            <img src={controlGame} alt="control-game" />
                                        </figure>
                                    </Link>
                                    <div className="row" id="wrapper-pokemon">
                                        {data.map((item, key) =>
                                            <div key={key} onClick={(element)=>this.comparePoke(item.name,element)} className="col-6 col-sm-4 col-lg-3 mb-3">
                                                <CardPokemon infoPokemon={item} />
                                            </div>
                                        )}
                                    </div>
                                    {hasLoadMore ? <button type="button" className="btn btn-danger mt-3" onClick={element => this.loadMore(element)}>{loadingLoadMore ? 'Carregando...' : 'Ver mais'}</button> : ''}
                                </div>)
                            : <h3 className="text-center">Nenhum Pokémon encontrado.</h3>
                        )
                    }
                </div>
            </section>
        );
    }
}