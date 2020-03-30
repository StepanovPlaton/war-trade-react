import React, { Component } from 'react';

import './root.css'

import Right from './right-column/right';
import Left from './left-column/left';
import Center from './center-column/center';

export default class Root extends Component {

    render() {
        return (
            <div id="root">
                <div id="left"> <Left /> </div>
                <div id="center"> <Center /></div>
                <div id="right"> <Right /> </div>
            </div>
        );
    };
};