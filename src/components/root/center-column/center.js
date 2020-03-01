import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './center.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

import Head from './head/head';
import Trade from './trade/trade'

export default class Center extends Component {
    render() {
        return (
            <div>
                <div id="head"> <Head /> </div>
                <div> <Trade /></div>
            </div>
        );
    };
};