import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import './right.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

const getIcon = (typeMessege) => {
    if(typeMessege == "info") { return "fa fa-info"; }
    if(typeMessege == "message") { return "fa fa-user"; }
    if(typeMessege == "system") { return "fa fa-database"; }
    if(typeMessege == "game") { return "fa fa-diamond"; }
}

const LogElement = (input) => {
    return (
        <span>
            <i className={ getIcon(input.type) }></i>      
            >   { input.text }
        </span>
    );
}

export default LogElement;