import React from 'react';

import './log-element.css';

const getIcon = (typeMessege) => {
    if(typeMessege === "info") { return "fa fa-info"; }
    if(typeMessege === "message") { return "fa fa-user"; }
    if(typeMessege === "system") { return "fa fa-database"; }
    if(typeMessege === "game") { return "fa fa-diamond"; }
}

const getUser = (User) => {
    if(User !== "system") { return "("+User+")"; }
    else { return ""; }
}

const LogElement = (input) => { 
    return (
        <p key={toString(input.key_set)+"log_element"}>
            <i className={ getIcon(input.type) + " " + input.color + " " + input.bold}> 
            <span className="nik"> { getUser(input.user) }</span> > { input.text }</i>
        </p>
    ); 
}

export default LogElement;