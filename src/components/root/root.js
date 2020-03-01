import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './root.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

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