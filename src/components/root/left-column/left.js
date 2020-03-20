import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './left.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

import TableOnline from './table-online/table-online';

export default class Left extends Component {
    render() {
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