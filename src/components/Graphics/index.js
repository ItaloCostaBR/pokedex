import React, { Component } from 'react';
import { Progress } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import './style.scss';

export default class Graphics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoContent: props.infoContent
        }
    }
    translateStat(stat){
        let arrTranslate = {
            'speed': 'velocidade',
            'defense': 'defesa',
            'attack': 'ataque',
            'special-attack': 'ataque especial',
            'special-defense': 'defesa especial',
            'hp': 'vida'
        };
        return arrTranslate[stat];
    }
    render() {
        const { infoContent } = this.state;
        const { Circle } = Progress;

        return(
            <div className="wrapper-stats">
                <div className="row">
                {
                    infoContent.map((item, key) =>
                        <div key={key} className="col-6 col-sm-4 mb-3">
                            <div className="card">
                                <div className="card-header">
                                    <Circle percent={item.base_stat} strokeColor="#08398b" />
                                </div>
                                <div className="card-body">
                                    <p className="card-text">
                                        {this.translateStat(item.stat.name)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
        )
    }
}