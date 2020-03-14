import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './left.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

import TableOnline from './table-online/table-online';

const getGameTime = () => {
    const request = new XMLHttpRequest();
    request.open('POST', 'http://192.168.32.10:5001/get_gametime');

    request.onload = () => {
        const data = JSON.parse(request.responseText);
        ReactDOM.render((<span> {data.gametime} </span>), document.querySelector('#datetime_js'));
    }

    const data = new FormData();
    data.append('NULL', "NULL");
    request.send(data);
    return false;
}

export default class Left extends Component {
    render() {
        //getGameTime();
        //window.setInterval(getGameTime, 5000);
        return (
            <div>
                <p id="datetime">
                    <i className="fa fa-calendar-check-o fa-lg"/>
                    <span id="datetime_js"></span>
                </p>
                <TableOnline />
            </div>
        );
    };
};