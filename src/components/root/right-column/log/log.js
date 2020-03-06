import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import './right.css'
import LogElement from './log-element/log-element'

const getLog = () => {
    const request = new XMLHttpRequest();
    request.open('POST', 'http://192.168.32.10:5001/get_actual_log');

    request.onload = () => {
        const input = JSON.parse(request.responseText);
        const data = input.log;
        var render = [];
        for (var i = 0; i < data.length; i++) { 
            render.push(<LogElement text={data[i][0]} type={data[i][1]} class={data[i][2] + " " + data[i][3]} />); 
            console.log(data[i][0] + " " + data[i][1]);
        }
        ReactDOM.render(React.createElement('div', null, render), document.querySelector('#Log_div'));
    }

    const data = new FormData();
    data.append('NULL', "NULL");
    request.send(data);
    return false;
}

export default class Log extends Component {
    render() {
        window.setInterval(getLog, 5000);
        return (
            <div id="Log">

            </div>
        );
    };
}