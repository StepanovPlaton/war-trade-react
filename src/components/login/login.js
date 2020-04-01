import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Root from '../../components/root/root';

import './login.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

document.addEventListener("keydown", e => { if(e.keyCode === 13 && !window.__LOGINED__){ document.getElementById("send").click(); } });
document.addEventListener("keydown", e => { if(e.keyCode === 13 && window.__LOGINED__){ document.getElementById("send_to_log_button").click(); } });

export default class LoginForms extends Component {

    clickOnSendButton() {
        const request = new XMLHttpRequest();
        request.open('POST', window.__PATH__+'/login');

        request.onload = () => {
            const data = JSON.parse(request.responseText);
            if(`${data.answer}`.search("LOGINOK") === -1) { 
                ReactDOM.render(<div id="div_ERROR"><p id="ERROR">{data.answer}</p></div>, 
                                document.querySelector('#tr_ERROR'));
            }
            
            else { window.__LOGINED__ = true; ReactDOM.render(<Root />, document.getElementById("root"));  }  
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

    render() {
        return (
            <div id="login_div">
                <h4 className="center"><p>Форма регистрации</p></h4>
                <p><input type="text" id="login" size="30" maxLength="15" placeholder="Логин" className="center"></input></p>
                <p><input type="password" id="password" size="30" maxLength="15" placeholder="Пароль" className="center"></input></p>
                <p>
                    <button className="send center"  id="send" onClick={ this.clickOnSendButton.bind(this) } >Войти</button>
                    <button className="send center" onClick={ this.clickOnSendButton.bind(this) } >Зарегистрироваться</button>
                </p>
                <div id="tr_ERROR"></div>
            </div>
        );
    };
};

