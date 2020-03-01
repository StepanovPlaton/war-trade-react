import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './trade.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const clearCheckedResource = () => {
    document.getElementById("trade_gold").className = "buttons_trade";
    document.getElementById("trade_wood").className = "buttons_trade";
    document.getElementById("trade_rock").className = "buttons_trade";
}
const clearCheckedType = () => {
    document.getElementById("sale").className = "buttons_trade";
    document.getElementById("buy").className = "buttons_trade";
}

const getResource = () => {
    if(document.getElementById("trade_gold").className.search("checked") != -1) { return "Gold"; }
    else if(document.getElementById("trade_wood").className.search("checked") != -1) { return "Wood"; }
    else { return "Rock"; }
}

const getType = () => {
    if(document.getElementById("buy").className.search("checked") != -1) { return "Buy"; }
    else if(document.getElementById("sale").className.search("checked") != -1) { return "Sale"; }
}

const clickGold = () => { clearCheckedResource(); document.getElementById("trade_gold").className += " checked"; }
const clickWood = () => { clearCheckedResource(); document.getElementById("trade_wood").className += " checked"; }
const clickRock = () => { clearCheckedResource(); document.getElementById("trade_rock").className += " checked"; }

const clickSale = () => { clearCheckedType(); document.getElementById("sale").className += " checked"; }
const clickBuy = () => { clearCheckedType(); document.getElementById("buy").className += " checked"; }

const typeTransaction = (type) => {if(type==0) {return "status";} else {return "trade";}}

function TradeAndGetStatus(type=0) {
    const request = new XMLHttpRequest();
    request.open('POST', 'http://192.168.32.10:5001/user_status_or_trade');

    request.onload = () => {
        const data = JSON.parse(request.responseText);
        document.querySelector('#my_money').innerHTML = data.Money;
        document.querySelector('#my_gold').innerHTML = data.Gold;
        document.querySelector('#my_wood').innerHTML = data.Wood;
        document.querySelector('#my_rock').innerHTML = data.Rock;
    }

    const data = new FormData();
    data.append('login', cookies.get("login"));
    data.append('password', cookies.get("password"));
    data.append('type', typeTransaction(type));
    data.append('typeResource', getResource());
    data.append('typeTransaction', getType());
    data.append('Quantity', "1");
    request.send(data);
    return false;
}

export default class Trade extends Component {
    
    Trade() { TradeAndGetStatus(1); }

    render() {
        window.setInterval(TradeAndGetStatus, 5000);
        return (
            <div id="trade">
                <table>
                    <tr><th colspan="5" id="trade_th">Торговля</th></tr>
                    <tr>
                        <th >Мои ресурсы: </th>
                        <td>Монеты - <span id="my_money">1</span></td>
                        <td>Золото - <span id="my_gold">1</span></td>
                        <td>Дерево - <span id="my_wood">1</span></td>
                        <td>Камень - <span id="my_rock">1</span></td>
                    </tr>
                    <tr>
                        <th>Тип сделки:</th>
                        <td><button className="buttons_trade checked" id="buy" onClick={clickBuy}>Покупка</button></td>
                        <td><button className="buttons_trade" id="sale" onClick={clickSale}>Продажа</button></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Предмет сделки:</th>
                        <td><button className="buttons_trade checked" id="trade_gold" onClick={clickGold}>Золото</button></td>
                        <td><button className="buttons_trade" id="trade_wood" onClick={clickWood}>Деверо</button></td>
                        <td><button className="buttons_trade" id="trade_rock" onClick={clickRock}>Камень</button></td>
                        <td></td>
                    </tr>
                    <tr><th colspan="5" id="trade_th"><button className="buttons_issue checked" onClick={this.Trade}>Оформить сделку</button></th></tr>
                </table>
            </div>
        );
    };
};