import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './right.css'

import Log from './log/log';

const getGraph = () => {
    const request = new XMLHttpRequest();
    request.open('GET', 'http://192.168.32.10:5001/get_graph');

    request.onload = () => {
        const data = request.responseText;
        const x = Math.random();
        document.querySelector('#graph').src = `${data}`;
    }

    const data = new FormData();
    data.append('NULL', "NULL");
    request.send(data);
    return false;
}

export default class Right extends Component {

    state = { img_src: "/static/graphs/1.png?name=1" };

    static SetState(src) {
        this.SetState({img_src: src});
    }

    render() {
        getGraph();
        window.setInterval(getGraph, 12000)

        return (
                <div className="graph">
                <div id="graph_div">
                    <img src="${this.state.img_src}" width="115%" id="graph" className="graph"/>
                </div>
                <div id="Log_div">
                    <Log />
                </div>
                </div>
        );
    };
};
// <img src="http://192.168.32.10:5001/static/graphs/1.png?name=1" width="115%" id="graph" className="graph"/>
