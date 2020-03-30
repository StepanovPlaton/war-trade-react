import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './head.css'

import openSocket from 'socket.io-client';
const sio = openSocket(window.__PATH_TO_SIO__);
sio.on('market_and_table_online_and_gametime', data => { if(window.__LOGINED__) { SetMarketTableOnlineAndGameTime(data); } });

const SetMarketTableOnlineAndGameTime = (data) => {
    ReactDOM.render(<span> Золото - {data.money} </span>, document.querySelector('#money_js'));
    ReactDOM.render(<span> Дерево - {data.wood} </span>, document.querySelector('#wood_js'));
    ReactDOM.render(<span> Камень - {data.rock} </span>, document.querySelector('#rock_js'));
    ReactDOM.render((<span> {data.gametime} </span>), document.querySelector('#datetime_js'));
    
    var render = [];
    const price_money = parseInt(document.getElementById('money_js').textContent.split("").reverse().join(""));
    const price_wood = parseInt(document.getElementById('wood_js').textContent.split("").reverse().join(""));
    const price_rock = parseInt(document.getElementById('rock_js').textContent.split("").reverse().join(""));
    for (var i = 0; i < data.status.length; i++) { 
        render.push(<UserStatusBar key={i+" user_status_bar_object"} add={"player"+(i+1)} name={data.status[i][0]} money={data.status[i][1]} gold={data.status[i][2]} wood={data.status[i][3]} rock={data.status[i][4]} key_set={i}/>); 
    }
    render.sort((x, y) => { if(x.props.money + x.props.gold*price_money + x.props.wood*price_wood + x.props.rock*price_rock <
                               y.props.money + y.props.gold*price_money + y.props.wood*price_wood + y.props.rock*price_rock) { return -1; }
                            else { return 1; } } );
    render.push((
        <tr key="thead_table_online"> 
            <th className="status-table-title">Имя</th> 
            <th className="status-table-title">
                <i className="fa fa-money fa-lg" /> & <i className="fa fa-cubes fa-lg" /> & <i className="fa fa-bars fa-lg" /> & <i className="fa fa-area-chart fa-lg"/>
            </th> 
        </tr> 
    ));
    ReactDOM.render(React.createElement('tbody', null, render.reverse()), document.querySelector('#UserStatusBar_div'));

    document.querySelector('#graph').src = `${data.graph}`;
}


const UserStatusBar = (input) => {
    return (
        <tr className={input.add} key={toString(input.key_set)+"user_status_bar"}>
            <td className="status-table-title">{ input.name }</td>
            <td className="status-table-td">{
            input.money + input.gold*parseInt(document.getElementById('money_js').textContent.split("").reverse().join("")) + 
            input.wood*parseInt(document.getElementById('wood_js').textContent.split("").reverse().join("")) + 
            input.rock*parseInt(document.getElementById('rock_js').textContent.split("").reverse().join(""))}
            </td>
        </tr>
    );
}

export default class Head extends Component {
    render() {
        return (
            <div id="resource">
                <span id="price_money"><i className="fa fa-cubes fa-lg"></i><span id="money_js"></span></span>
                <span id="price_wood"><i className="fa fa-bars fa-lg"></i><span id="wood_js"></span></span>
                <span id="price_rock"><i className="fa fa-area-chart fa-lg"></i><span id="rock_js"></span></span>
            </div>
        );
    };
};