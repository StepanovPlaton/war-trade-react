import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './log-element.css';

const getIcon = (typeMessege) => {
    if(typeMessege == "info") { return "fa fa-info"; }
    if(typeMessege == "message") { return "fa fa-user"; }
    if(typeMessege == "system") { return "fa fa-database"; }
    if(typeMessege == "game") { return "fa fa-diamond"; }
}

const getUser = (User) => {
    if(User != "system") { return "("+User+")"; }
    else { return ""; }
}

const LogElement = (input) => { 
    return (
        <p>
            <i className={ getIcon(input.type) + " " + input.color + " " + input.bold}> 
            <span className="nik"> { getUser(input.user) }</span> > { input.text }</i></p>
    ); 
}

export default LogElement;