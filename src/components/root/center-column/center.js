import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './center.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

import Head from './head/head';
import Trade from './trade/trade'
import TradePlayersList from './TradePlayersList/TradePlayersList';

export default class Center extends Component {
    render() {
        return (
            <div id="trading">
                <div id="head"> <Head /> </div>
                <div id="trading"> 
                    <TradePlayersList />
                    <Trade />
                </div>
            </div>
        );
    };
};