import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Root from '../../components/root/root';

import './login.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

var logined = false;

document.addEventListener("keydown", e => { if(e.keyCode == 13 && !logined){ document.getElementById("send").click(); } });
document.addEventListener("keydown", e => { if(e.keyCode == 13 && logined){ document.getElementById("send_to_log_button").click(); } });
//document.getElementById("login_div").addEventListener("keydown", e => { if(e.keyCode == 13){ document.getElementById(id_send_button).click(); } });

export default class LoginForms extends Component {

    clickOnSendButton() {
        const request = new XMLHttpRequest();
        request.open('POST', '/login');

        request.onload = () => {
            const data = JSON.parse(request.responseText);
            if(`${data.answer}`.search("LOGINOK") == -1) { 
                ReactDOM.render(<div id="div_ERROR"><p id="ERROR">{data.answer}</p></div>, 
                                document.querySelector('#tr_ERROR'));
            }
            
            else { logined = true; ReactDOM.render(<Root />, document.getElementById("root"));  }  
        }

        const data = new FormData();
        
        const login = document.querySelector('#login').value;
        const password = document.querySelector('#password').value;
        
        data.append('login', login);
        data.append('password', password);

        cookies.set('login', login, { path: '/' });
        cookies.set('password', password, { path: '/' });

        request.send(data);
        return false;

    }

    chekLogined() {
        if(cookies.get("login") != undefined && cookies.get("login") != null && cookies.get("login") != "" &&
           cookies.get("password") != undefined && cookies.get("password") != null && cookies.get("password") != "")  {
            document.querySelector('#login').value = cookies.get("login");
            document.querySelector('#password').value = cookies.get("password");
            this.clickOnSendButton();
        }
    }

    render() {
        //this.chekLogined();
        return (
            <div id="login_div">
                <h4 class="center"><p>Форма регистрации</p></h4>
                <p><input type="text" id="login" size="30" maxlength="15" placeholder="Логин" class="center"></input></p>
                <p><input type="password" id="password" size="30" maxlength="15" placeholder="Пароль" class="center"></input></p>
                <button id="send" onClick={ this.clickOnSendButton.bind(this) } class="center">Отправить</button>
                <div id="tr_ERROR"></div>
            </div>
        );
    };
};

