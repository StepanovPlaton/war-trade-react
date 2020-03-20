import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Cookies from 'universal-cookie';

import './TradePlayersList.css'

const cookies = new Cookies();

const getList = (x=-1, type="update") => {
    document.getElementById("TradePlayersList_div").scrollTop = 0;

    const request = new XMLHttpRequest();
    request.open('POST', '/get_tradeplayerlist');

    request.onload = () => {
        const input = JSON.parse(request.responseText);
        const data = input.tradeplayerlist;
        var render = [];

        render.push((
            <tr> 
                <th>Дата</th> 
                <th>Имя игрока</th> 
                <th>Тип сделки</th>
                <th>Ресурс</th>
                <th>Количество</th>
                <th>Сумма</th> 
                <th>- - - - - - -</th> 
            </tr> 
        ));
        for (var i = 0; i < data.length; i++) { 
            render.push(<TradeLine data1={data[i][1]} data2={data[i][2]} data3={data[i][3]}  
                                    data4={data[i][4]} data5={data[i][5]} data6={data[i][6]} x={data[i][0]}/>); 
        }

        ReactDOM.render(React.createElement('tbody', null, render), document.querySelector('#TradePlayersList_div'));
    }

    const data = new FormData();
    data.append('login', cookies.get("login"));
    data.append('password', cookies.get("password"));
    data.append('type', type);
    data.append('id', x);
    request.send(data);
    return false;
}

const close_or_approve = (input) => {
    if(input == cookies.get("login")) { return "close"; }
    else { return "approve"; }
}

const TradeLine = (data) => {
    return (
        <tr> 
            <th>{data.data1}</th> 
            <td>{data.data2}</td> 
            <td>{data.data3}</td>
            <td>{data.data4}</td>
            <td>{data.data5}</td>
            <td>{data.data6}</td> 
            <td><TradeLineButton type={close_or_approve(data.data2)} x={data.x}/></td> 
        </tr> 
    );
}
//<td><button className="approv_tradelistbuttons" onClick={ () => { getList(data.x, "approv"); } }>Принять</button></td> 

const TradeLineButton = (data) => {
    if(data.type == "approve") {
        return ( <button className="approv_tradelistbuttons" onClick={ () => { getList(data.x, "approv"); } }>Принять</button> );
    }else {
        return ( <div className="close" onClick={ () => { getList(data.x, "close"); } }></div> );
    }
}

export default class Right extends Component {
    render() {
        window.setInterval(getList, 2000);
        return (
            <div id="TradePlayersList_div">
                <div className="close" onClick={ () => { getList(0, "close"); } }></div>
                <table id="TradePlayersList_table">

                </table>
            </div>
        );
    };
};
