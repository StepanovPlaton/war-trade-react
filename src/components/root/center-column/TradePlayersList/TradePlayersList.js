import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Cookies from 'universal-cookie';

import './TradePlayersList.css'

import openSocket from 'socket.io-client';
const sio = openSocket(window.__PATH_TO_SIO__);
sio.on('trade_players_list', data => { if(window.__LOGINED__) { GetTradeList(data.tradeplayerlist); } });

const cookies = new Cookies();

const GetTradeList = (data) => {
    var render = [];
    render.push((
        <tr key="thead_trade_players_list"> 
            <th>Дата</th> 
            <th>Имя игрока</th> 
            <th>Тип сделки</th>
            <th>Ресурс</th>
            <th>Количество</th>
            <th>Сумма</th> 
            <th></th> 
        </tr> 
    ));
    for (var i = 0; i < data.length; i++) { 
        render.push(<TradeLine data1={data[i][1]} data2={data[i][2]} data3={data[i][3]}  
                                data4={data[i][4]} data5={data[i][5]} data6={data[i][6]} x={data[i][0]} key={i} key_set={i} />); 
    }
    ReactDOM.render(React.createElement('tbody', null, render), document.querySelector('#TradePlayersList_table'));
}

const getList = (x=-1, type="") => {
    document.getElementById("TradePlayersList_div").scrollTop = 0;

    const request = new XMLHttpRequest();
    request.open('POST', window.__PATH__+'/get_tradeplayerlist');

    request.onload = () => {}

    const data = new FormData();
    data.append('login', cookies.get("login"));
    data.append('password', cookies.get("password"));
    data.append('type', type);
    data.append('id', x);
    request.send(data);
    return false;
}

const close_or_approve = (input) => {
    if(input === cookies.get("login")) { return "close"; }
    else { return "approve"; }
}

const getResource = (in_) => {
    if(in_ === "Gold") { return "Золото"; }
    if(in_ === "Wood") { return "Дерево"; }
    if(in_ === "Rock") { return "Камень"; }
}
const getType = (in_) => {
    if(in_ === "Buy") { return "Покупка"; }
    if(in_ === "Sale") { return "Продажа"; }
}

const TradeLine = (data) => {
    return (
        <tr key={toString(data.key_set)+"trade_line"}> 
            <th>{data.data1}</th> 
            <td>{data.data2}</td> 
            <td>{getType(data.data3)}</td>
            <td>{getResource(data.data4)}</td>
            <td>{data.data5}</td>
            <td>{data.data6}</td> 
            <td><TradeLineButton type={close_or_approve(data.data2)} x={data.x}/></td> 
        </tr> 
    );
}

const TradeLineButton = (data) => {
    if(data.type === "approve") {
        return ( <button className="approv_tradelistbuttons" onClick={ () => { getList(data.x, "approv"); } }>Принять</button> );
    }else {
        return ( <button className="buttons_trade checked" onClick={ () => { getList(data.x, "close"); } }>Отменить</button> );
    }
}

export default class Right extends Component {
    render() {
        return (
            <div id="TradePlayersList_div">
                <table id="TradePlayersList_table">
                </table>
            </div>
        );
    };
};
