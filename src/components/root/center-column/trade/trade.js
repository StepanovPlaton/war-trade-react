import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './trade.css'
import Cookies from 'universal-cookie';

import openSocket from 'socket.io-client';
const sio = openSocket(window.__PATH_TO_SIO__);
sio.on('status_player', data => { if(window.__LOGINED__) { getStatus(data); } });

const cookies = new Cookies();

const getStatus = (data) => {
    for (let i = 0; i < document.getElementsByClassName('my_money').length; i++) { ReactDOM.render(data.Money, document.getElementsByClassName('my_money')[i]); } 
    for (let i = 0; i < document.getElementsByClassName('my_gold').length; i++) { ReactDOM.render(data.Gold, document.getElementsByClassName('my_gold')[i]); } 
    for (let i = 0; i < document.getElementsByClassName('my_wood').length; i++) { ReactDOM.render(data.Wood, document.getElementsByClassName('my_wood')[i]); } 
    for (let i = 0; i < document.getElementsByClassName('my_rock').length; i++) { ReactDOM.render(data.Rock, document.getElementsByClassName('my_rock')[i]); } 
}

const clearCheckedResource = () => {
    setClassName("trade_gold", "trade_gold buttons_trade");
    setClassName("trade_wood", "trade_wood buttons_trade");
    setClassName("trade_rock", "trade_rock buttons_trade");
}
const clearCheckedType = () => {
    setClassName("sale", "buttons_trade sale");
    setClassName("buy", "buttons_trade buy");
}
const clearCheckedQuantity = () => {
    setClassName("quantity_1", "buttons_trade buttons_quantity quantity_1");
    setClassName("quantity_5", "buttons_trade buttons_quantity quantity_5");
    setClassName("quantity_10", "buttons_trade buttons_quantity quantity_10");
    setClassName("input_quantity", "buttons_trade buttons_quantity input_quantity");
}

const getResource = () => {
    if(document.getElementsByClassName("trade_gold")[0].className.search("checked") !== -1) { return "Gold"; }
    else if(document.getElementsByClassName("trade_wood")[0].className.search("checked") !== -1) { return "Wood"; }
    else { return "Rock"; }
}
const getType = () => {
    if(document.getElementsByClassName("buy")[0].className.search("checked") !== -1) { return "Buy"; }
    else if(document.getElementsByClassName("sale")[0].className.search("checked") !== -1) { return "Sale"; }
}
const getQuantity = () => {
    if(document.getElementsByClassName("quantity_1")[0].className.search("checked") !== -1) { return "1"; }
    else if(document.getElementsByClassName("quantity_5")[0].className.search("checked") !== -1) { return "5"; }
    else if(document.getElementsByClassName("quantity_10")[0].className.search("checked") !== -1) { return "5"; }
    else { return document.getElementsByClassName("input_quantity")[0].textContent; }
}
const getPrice = () => { return document.getElementById("input_price").textContent; }

const setClassName = (in_, in2) => {
    for (let i = 0; i < document.getElementsByClassName(in_).length; i++) { document.getElementsByClassName(in_)[i].className = in2; } 
}

const clickGold = () => { clearCheckedResource(); setClassName("trade_gold buttons_trade", "trade_gold buttons_trade checked"); }
const clickWood = () => { clearCheckedResource(); setClassName("trade_wood buttons_trade", "trade_wood buttons_trade checked"); }
const clickRock = () => { clearCheckedResource(); setClassName("trade_rock buttons_trade", "trade_rock buttons_trade checked"); }
const clickSale = () => { clearCheckedType(); setClassName("sale", "buttons_trade sale checked"); }
const clickBuy = () => { clearCheckedType(); setClassName("buy", "buttons_trade buy checked"); }
const click1 = () => { clearCheckedQuantity(); setClassName("quantity_1", "buttons_trade buttons_quantity quantity_1 checked"); }
const click5 = () => { clearCheckedQuantity(); setClassName("quantity_5", "buttons_trade buttons_quantity quantity_5 checked"); }
const click10 = () => { clearCheckedQuantity(); setClassName("quantity_10", "buttons_trade buttons_quantity quantity_10 checked"); }
const clickplus = () => { 
    clearCheckedQuantity(); 
    clickinput();
    for (let i = 0; i < document.getElementsByClassName("input_quantity").length; i++) { 
        ReactDOM.render(<span>{parseInt(document.getElementsByClassName("input_quantity")[i].textContent)+1}</span>, document.getElementsByClassName("input_quantity")[i]); 
    } 
}
const clickminus = () => { 
    clearCheckedQuantity(); 
    clickinput();
    for (let i = 0; i < document.getElementsByClassName("input_quantity").length; i++) { 
        if(parseInt(document.getElementsByClassName("input_quantity")[i].textContent)>1) { 
            ReactDOM.render(<span>{parseInt(document.getElementsByClassName("input_quantity")[i].textContent)-1}</span>, document.getElementsByClassName("input_quantity")[i]); 
        } 
    } 
    
}
const clickinput = () => { clearCheckedQuantity(); setClassName("input_quantity", "buttons_trade buttons_quantity input_quantity checked"); }

const clickplusprice5 = () => { var input = document.getElementById("input_price");  ReactDOM.render(<span>{parseInt(input.textContent)+15}</span>, input);  }
const clickminusprice5 = () => { var input = document.getElementById("input_price");  if(parseInt(input.textContent)>15) {ReactDOM.render(<span>{parseInt(input.textContent)-15}</span>, input); } }
const clickplusprice1 = () => { var input = document.getElementById("input_price");  ReactDOM.render(<span>{parseInt(input.textContent)+5}</span>, input);  }
const clickminusprice1 = () => { var input = document.getElementById("input_price");  if(parseInt(input.textContent)>5) {ReactDOM.render(<span>{parseInt(input.textContent)-5}</span>, input); } }


const typeTransaction = (type) => {
    if(type===1) {return "trade with players"}
    else {return "trade with market";}
}

function TradeAndGetStatus(type=0) {
    const request = new XMLHttpRequest();
    request.open('POST', window.__PATH__+'/user_status_or_trade');

    request.onload = () => {}

    const data = new FormData();
    data.append('login', cookies.get("login"));
    data.append('password', cookies.get("password"));
    data.append('type', typeTransaction(type));
    data.append('typeResource', getResource());
    data.append('typeTransaction', getType());
    data.append('Quantity', getQuantity());
    data.append('Price', getPrice());
    request.send(data);
    return false;
}

const TheadTrade = () => {
    return (
        <thead>
            <tr>
                <th>Тип сделки:</th>
                <td colSpan="3">
                    <button className="buttons_trade checked buy" onClick={clickBuy}><i className="fa fa-arrow-down"/>Покупка</button>
                    <button className="buttons_trade sale" onClick={clickSale}><i className="fa fa-arrow-up"/>Продажа</button>
                </td>
            </tr>
            <tr>
                <th>Предмет сделки:</th>
                <td><button className="buttons_trade trade_gold checked" onClick={clickGold}><i className="fa fa-cubes"/>Золото</button></td>
                <td><button className="buttons_trade trade_wood" onClick={clickWood}><i className="fa fa-bars"/>Дерево</button></td>
                <td><button className="buttons_trade trade_rock" onClick={clickRock}><i className="fa fa-area-chart" />Камень</button></td>
            </tr>
            <tr>
                <th>Количество:</th>
                <td>
                    <button className="buttons_trade buttons_quantity quantity_1 checked" onClick={click1}> 1 </button>
                    <button className="buttons_trade buttons_quantity quantity_5" onClick={click5}> 5 </button>
                    <button className="buttons_trade buttons_quantity quantity_10" onClick={click10}> 10 </button>
                </td>
                <td colSpan="3" id="trade_text_input"> <span>
                    <button className="buttons_trade buttons_input_quantity" onClick={clickminus}>-</button>
                    <button className="buttons_trade buttons_input_quantity input_quantity" onClick={clickinput}><span>10 </span></button>
                    <button className="buttons_trade buttons_input_quantity" onClick={clickplus}>+</button>
                </span> </td>
            </tr>
        </thead>
    );
}

export default class Trade extends Component {
    
    Trade_with_player() { TradeAndGetStatus(1); }

    render() {
        if(window.__LOGINED__) { sio.emit("send_sid", cookies.get("login")); }
        return (
            <div id="trade">
                <div id="my_resource">
                    <span className="my_money_div"><i className="fa fa-money fa-lg" /> Мои монеты - <span className="my_money"> ? </span></span>
                    <span className="my_gold_div"><i className="fa fa-cubes fa-lg" /> Моё золото - <span className="my_gold"> ? </span></span>
                    <span className="my_wood_div"><i className="fa fa-bars fa-lg" /> Моё дерево - <span className="my_wood"> ? </span></span>
                    <span className="my_rock_div"><i className="fa fa-area-chart fa-lg"/> Мой камень - <span className="my_rock"> ? </span></span>
                </div>
                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab1" name="tab-group" defaultChecked></input>
                        <label htmlFor="tab1" className="tab-title">Торговля с рынком</label> 
                        <section className="tab-content">
                            <table>
                                <TheadTrade />
                                <tbody>
                                    <tr>
                                        <th colSpan="4" id="trade_th"><button className="buttons_issue checked" onClick={TradeAndGetStatus}>Торговать</button></th>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div> 
                    <div className="tab">
                        <input type="radio" id="tab2" name="tab-group"></input>
                        <label htmlFor="tab2" className="tab-title">Торговля с игроками</label> 
                        <section className="tab-content">
                            <table>
                                <TheadTrade />
                                <tbody>
                                    <tr>
                                        <th>Цена за шт:</th>
                                        <td colSpan="4">
                                            <button className="buttons_trade buttons_input_price15" onClick={clickminusprice5}>-15</button>
                                            <button className="buttons_trade buttons_input_price5" onClick={clickminusprice1}>-5</button>
                                            <button className="buttons_trade buttons_input_price checked" id="input_price"><span>25</span></button>
                                            <button className="buttons_trade buttons_input_price5" onClick={clickplusprice1}>+5</button>
                                            <button className="buttons_trade buttons_input_price15" onClick={clickplusprice5}>+15</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colSpan="5" id="trade_th"><button className="buttons_issue checked" onClick={this.Trade_with_player}>Торговать</button></th>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>
        );
    };
};