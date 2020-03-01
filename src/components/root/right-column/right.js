import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './right.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

import LogElement from './log-element/log-element'

const getGraph = () => {
    const request = new XMLHttpRequest();
    request.open('GET', 'http://192.168.32.10:5001/get_graph');

    request.onload = () => {
        const data = request.responseText;
        console.log(data);
        //const data = JSON.parse(request.responseText);
        const x = Math.random();
        document.querySelector('#graph').src = `${data}`;
        //document.getElementById('graph_div').value = `${x}`;
    }

    const data = new FormData();
    data.append('NULL', "NULL");
    request.send(data);
    return false;
}

export default class Right extends Component {

    render() {
        getGraph();
        window.setInterval(getGraph, 12000);
        return (
                <div className="graph">
                <div id="graph_div">
                    <img src="http://192.168.32.10:5001/static/graphs/1.png?name=1" width="115%" id="graph" className="graph"/>
                </div>
                <p><LogElement type="message" text="Пример текста 1"/></p>
                <p><LogElement type="game" text="Пример текста 2"/></p>
                <p><LogElement type="system" text="Пример текста 3"/></p>
                <p><LogElement type="info" text="Пример текста 4"/></p>
                </div>
        );
    };
};
// <img src="http://192.168.32.10:5001/static/graphs/1.png?name=1" width="115%" id="graph" className="graph"/>
