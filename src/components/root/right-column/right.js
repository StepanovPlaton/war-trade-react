import React, { Component } from 'react';

import './right.css'

import Log from './log/log';

export default class Right extends Component {
    render() {
        return (
                <div className="graph">
                    <div id="graph_div">
                        <img width="115%" id="graph" className="graph" alt=""/>
                    </div>
                    <div id="Log_div">
                        <Log />
                    </div>
                </div>
        );
    };
};
// <img src="http://192.168.32.10:5001/static/graphs/1.png?name=1" width="115%" id="graph" className="graph"/>
