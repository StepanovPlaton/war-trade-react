import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Root from '../../components/root/root';

import './login.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class LoginForms extends Component {

    clickOnSendButton() {
        const request = new XMLHttpRequest();
        request.open('POST', 'http://192.168.32.10:5001/login');

        request.onload = () => {
            const data = JSON.parse(request.responseText);
            if(`${data.answer}`.search("LOGINOK") == -1) { document.querySelector('#tr_ERROR').innerHTML = `<div id="div_ERROR"><p id="ERROR">${data.answer}</p></div>`; }
            else { ReactDOM.render(<Root />, document.getElementById("root"));  }  
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
            <table id='login-form'>
                <tr align="center"><h4>Форма регистрации</h4></tr>
                <tr align="center"><p><input type="text" id="login" size="30" maxlength="15" placeholder="Логин"></input></p></tr>
                <tr align="center"><p><input type="password" id="password" size="30" maxlength="15" placeholder="Пароль"></input></p></tr>
                <tr align="center"><button id="send" onClick={ this.clickOnSendButton.bind(this) }>Отправить</button></tr>
                <tr id="tr_ERROR"></tr>
            </table>
            </div>
        );
    };
};
