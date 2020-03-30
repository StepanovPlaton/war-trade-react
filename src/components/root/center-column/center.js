import React, { Component } from 'react';

import './center.css'

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