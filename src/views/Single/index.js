import React, { Component } from 'react';

export default class Single extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            loading: false,
        }
    }
    render() {
        return(
            <section id="section-highlight">
                <div className="container">
                    Single
                </div>
            </section>
        );
    }
}