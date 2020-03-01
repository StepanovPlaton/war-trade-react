import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './head.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

const getValueResource = () => {
    const request = new XMLHttpRequest();
    request.open('POST', 'http://192.168.32.10:5001/get_market');

    request.onload = () => {
        const data = JSON.parse(request.responseText);
        document.querySelector('#money_js').innerHTML = `<span> Золото - ${data.money} </span>`;
        document.querySelector('#wood_js').innerHTML = `<span> Дерево - ${data.wood} </span>`;
        document.querySelector('#rock_js').innerHTML = `<span> Камень - ${data.rock} </span>`;
    }

    const data = new FormData();
    data.append('NULL', "NULL");
    request.send(data);
    return false;
}

export default class Head extends Component {
    render() {
        getValueResource();
        window.setInterval(getValueResource, 2000);
        return (
            <div id="resource">
                <span id="price_money"><i className="fa fa-cubes"></i><span id="money_js"></span></span>
                <span id="price_wood"><i className="fa fa-bars"></i><span id="wood_js"></span></span>
                <span id="price_rock"><i className="fa fa-area-chart"></i><span id="rock_js"></span></span>
            </div>
        );
    };
};