import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './log.css'
import LogElement from './log-element/log-element'

import Cookies from 'universal-cookie';
import openSocket from 'socket.io-client';

const sio = openSocket(window.__PATH_TO_SIO__);
sio.on('get_log', data => { if(window.__LOGINED__) { getLog(data.log); } } );

const cookies = new Cookies();

const getLog = (log) => {
    var render = [];
    for (var i = 0; i < log.length; i++) { 
        render.push(<LogElement text={log[i][0]} type={log[i][1]} user={log[i][2]} color={log[i][3]} bold={log[i][4]} key={i} key_set={i} />); 
    }
    ReactDOM.render(React.createElement('div', null, render), document.querySelector('#Log'));

    var Log = document.getElementById("Log");
    Log.scrollTop = Log.scrollHeight;
}

const SendToLog = () => {
    const request = new XMLHttpRequest();
    request.open('POST', window.__PATH__+'/send_to_log');

    request.onload = () => {}

    const data = new FormData();
    data.append('login', cookies.get("login"));
    data.append('message', document.getElementById("send_to_log_text_input").value);
    request.send(data);

    document.getElementById("send_to_log_text_input").value = "";

    return false;
}

export default class Log extends Component {
    render() {
        return (
            <div>
                <div id="Log">

                </div>
                <p id="send_to_log_form">
                    <input size="25" id="send_to_log_text_input"></input>
                    <button onClick={SendToLog} id="send_to_log_button">Отправить</button>
                </p>
            </div>
        );
    };
}