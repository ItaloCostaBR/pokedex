import React, { Component } from 'react';
import Loading from '../../components/Loading';
import controlGame from '../../assets/images/icon-control.png';
import { Link } from 'react-router-dom';
import './style.scss';

export default class Ranking extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            error: false,
            loading: false,
        }
    }

    async getInfoRanking() {
        this.setState({...this.setState, loading: true})

        let response = await fetch('https://pokedexapi-v1.herokuapp.com/api/v1/ranking');
        return await response.json();
    }

    componentDidMount() {
        this.getInfoRanking()
        .then(res => {
            this.setState({...this.setState, loading: false, data: res.data})
        })
        .catch(err => {
            this.setState({...this.setState, loading: false, error: true})
            console.log(err)
        });
    }

    render() {
        const { data, loading } = this.state;
        return (
            <section id="section-ranking" className="padding-page">
                {
                    loading
                    ? <Loading />
                    : (
                        <div className="container">
                            <Link to="/game">
                                <figure className="control-game">
                                    <img src={controlGame} alt="control-game" />
                                </figure>
                            </Link>
                            <h4 className="text-center mt-5 mb-3">Ranking</h4>

                            <table className="table text-center">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Pontos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    data.map((el, i) =>
                                        <tr key={i}>
                                            <td>{el.nickname}</td>
                                            <td>{el.points}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    )}
            </section>
        )
    }
}