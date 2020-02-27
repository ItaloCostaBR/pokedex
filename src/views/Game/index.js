import React, { Component } from 'react';
import { Notification } from 'rsuite';
import './style.scss';
import Loading from '../../components/Loading';
import { Alert } from 'rsuite';

// eslint-disable-next-line no-extend-native
String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

export default class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            loading: false,
            error: false,
            nickname: null,
            hasNickname: false,
            currentPokemon: '',
            pokemonNotFound: false,
            qtdPoints: 0,
            qtdQuestions: 0
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    async getRandomPokemon() {
        let pokemon = this.getRandomInt(0, 807);
        this.setState({...this.state, loading: true});
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemon);
        return await response.json();
    }

    async setAnwers(data) {
        this.setState({...this.state, loading: true});
        let response = await fetch('https://pokedexapi-v1.herokuapp.com/api/v1/ranking', { method: 'POST', body: data });
        return await response.json();
    }

    answerQuestion = (e) =>{
        e.preventDefault();

        let field = document.getElementById('find');
        let btn = document.getElementById('btn-submit-answer');
        let newState = {...this.state};

        if(field.value === '') {
            field.placeholder = "Campo obrigatório"
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        } else {
            btn.disabled = true;

            if(field.value === this.state.currentPokemon){
                newState = {...newState, qtdPoints: this.state.qtdPoints + 1};

                field.classList.add('is-valid');
                field.classList.remove('is-invalid');
                Notification.success({title: 'Parabéns! :)', duration: 3000});
            }else{
                field.classList.remove('is-valid');
                field.classList.add('is-invalid');
                Notification.error({title: 'Ops! :(', description: 'O nome certo é: '+this.state.currentPokemon, duration: 3000});
            }

            this.evtShowPokemon();

            setTimeout(() => {
                this.setState({...this.state, loading: true});
                this.getRandomPokemon()
                .then(res => {
                    this.setState({...this.state, loading: false, data: res, currentPokemon: res.name, pokemonNotFound: !res.sprites.front_default });
                })
                .catch(err => {
                    this.setState({...this.state, loading: false, error: true});
                    console.log(err)
                })
            }, 4000);
        }
        newState = {...newState, qtdQuestions: this.state.qtdQuestions + 1};
        this.setState(newState);
    }

    evtShowPokemon = (e) => {
        let element = document.getElementById('figureBlock');
        element.classList.add("active");
    }

    startGame(e){
        e.preventDefault();
        let nickname = document.getElementById('nicknameField').value;

        if(nickname === '') {
            Notification.error({title: 'Ops!', description: 'O campo é obrigatório.'});
        } else {
            this.setState({...this.state, loading: true});
            this.getRandomPokemon()
            .then(res => {
                this.setState({...this.state, loading: false, nickname: nickname, hasNickname: true, data: res, currentPokemon: res.name, pokemonNotFound: !res.sprites.front_default });
            })
            .catch(err => {
                this.setState({...this.state, loading: false, error: true});
                console.log(err)
            })
        }
    }

    nextPokemon() {
        this.setState({...this.state, loading: true});
            this.getRandomPokemon()
            .then(res => {
                this.setState({...this.state, loading: false, data: res, currentPokemon: res.name, pokemonNotFound: !res.sprites.front_default });
            })
            .catch(err => {
                this.setState({...this.state, loading: false, error: true});
                console.log(err)
            })
    }

    sendAnswers(){
        if(!this.state.nickname){
            document.getElementById('nicknameField').classList.add('is-invalid');
        }else{
            document.getElementById('nicknameField').classList.remove('is-invalid');

            // let body = {
            //     nickname: this.state.nickname,
            //     points: 1,
            // }

            // this.setAnwers(body)
            // .then(res => {
            //     console.log(res)
            // })
            // .catch(err => {
            //     console.log(err)
            // })
        }
    }

    render(){
        const { loading, data, hasNickname, nickname, currentPokemon, pokemonNotFound } = this.state;
        return (
            <section id="section-game" className="padding-page">
                <div className="container">
                    {
                        loading
                        ? <Loading />
                        : (
                            <div className="wrapper-content">
                                { !hasNickname ?
                                    <div className="card my-5">
                                        <div className="card-header text-center">
                                            Simbora!
                                        </div>
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                                <form onSubmit={(e) => this.startGame(e)} method="POST">
                                                    <input type="text" className="form-control" id="nicknameField" placeholder="Digite seu Nickname" />
                                                    <div className="input-group-append justify-content-center">
                                                        <button className="btn btn-danger" type="submit">Iniciar</button>
                                                    </div>
                                                </form>
                                                <div className="blockquote-footer">Pare de tentar e comece a desistir!</div>
                                            </blockquote>
                                        </div>
                                    </div>
                                    : (
                                        !pokemonNotFound ?
                                        <div className="wrapper-game">
                                            <div className="row">
                                                <div className="col-md-12 mt-2">
                                                    <h2 className="text-center title-pokemon">
                                                        <span>{nickname}</span>, quem é esse Pokémon?
                                                        <figure id="figureBlock">
                                                            <img src={data.sprites.front_default} className="pokemon" alt="pokemon" />
                                                        </figure>
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="form-send-item">
                                                <form className="text-center" onSubmit={(event) => this.answerQuestion(event)}>
                                                        <input type="text" id="find" className="findInput form-control w-100" placeholder="Digite o nome aqui"  />
                                                        <button type="button" className="btn btn-warning my-4 mr-2" onClick={() => Alert.info('O nome desse pokémon é: '+currentPokemon.shuffle(), 5000)}>Ver dica</button>
                                                        <button type="submit" id="btn-submit-answer" className="btn btn-danger my-4 ml-2">Enviar</button>
                                                </form>
                                            </div>
                                        </div>
                                        : (
                                            <button className="btn btn-warning my-5" onClick={this.nextPokemon()}>Pular pokémon</button>
                                        )
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </section>
        );
    }
}