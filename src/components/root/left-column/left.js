import React, { Component } from 'react';
import './left.css'

import TableOnline from './table-online/table-online';

export default class Left extends Component {
    render() {
        return (
            <div>
                <div id="datetime_div">
                    <h5>
                        <span id="datetime">
                            <i className="fa fa-calendar-check-o fa-lg"/>
                            <span id="datetime_js"> Загрузка...</span>
                        </span>
                    </h5>
                    
                </div>
                
                <TableOnline />
            </div>
        );
    };
};