import React, { Component } from 'react';
import './left.css'

import TableOnline from './table-online/table-online';

export default class Left extends Component {
    render() {
        return (
            <div>
                <div id="datetime">
                    <h5>
                        <i className="fa fa-calendar-check-o fa-lg"/>
                        <span id="datetime_js"></span>
                    </h5>
                </div>
                <TableOnline />
            </div>
        );
    };
};