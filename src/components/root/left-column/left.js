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
        document.querySelector('#datetime_js').innerHTML = `<span> ${data.gametime} </span>`;
    }

    const data = new FormData();
    data.append('NULL', "NULL");
    request.send(data);
    return false;
}

export default class Left extends Component {

    render() {
        getGameTime();
        window.setInterval(getGameTime, 5000);
        return (
            <div>
                <h6 id="datetime"><i className="fa fa-calendar-check-o"></i> <span id="datetime_js"></span> </h6>
                <TableOnline />
            </div>
        );
    };
};