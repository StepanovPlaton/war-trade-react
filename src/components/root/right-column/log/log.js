import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './log.css'
import LogElement from './log-element/log-element'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const getLog = (type=0) => {

    var Log = document.getElementById("Log");
    Log.scrollTop = Log.scrollHeight;

    const request = new XMLHttpRequest();
    request.open('POST', 'http://192.168.32.10:5001/log');

    request.onload = () => {
        const input = JSON.parse(request.responseText);
        const data = input.log;
        var render = [];
        for (var i = 0; i < data.length; i++) { 
            render.push(<LogElement text={data[i][0]} type={data[i][1]} user={data[i][2]} color={data[i][3]} bold={data[i][4]} />); 
            console.log(data[i][0] + " " + data[i][1]);
        }
        ReactDOM.render(React.createElement('div', null, render), document.querySelector('#Log'));
    }

    const data = new FormData();
    data.append('login', cookies.get("login"));
    data.append('message', document.getElementById("send_to_log_text_input").value);
    data.append('type', type);
    request.send(data);
    return false;
}

export default class Log extends Component {

    sendToLog() { getLog(1); document.getElementById("send_to_log_text_input").value = ""; }

    render() {
        window.setInterval(getLog, 2000);
        return (
            <div>
                <div id="Log">

                </div>
                <p id="send_to_log_form">
                    <input size="40" id="send_to_log_text_input"></input>
                    <button onClick={this.sendToLog} id="send_to_log_button">Отправить</button>
                </p>
            </div>
            
        );
    };
}