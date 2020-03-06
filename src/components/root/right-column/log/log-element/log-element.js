import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const getIcon = (typeMessege) => {
    if(typeMessege == "info") { return "fa fa-info"; }
    if(typeMessege == "message") { return "fa fa-user"; }
    if(typeMessege == "system") { return "fa fa-database"; }
    if(typeMessege == "game") { return "fa fa-diamond"; }
}

const LogElement = (input) => {
    return (
        <p>
            <i className={ getIcon(input.type) }></i>      
            >   { input.text }
        </p>
    );
}

export default LogElement;