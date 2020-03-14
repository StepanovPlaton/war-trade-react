import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './head.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';


const getValueResource = () => {
    const request = new XMLHttpRequest();
    request.open('POST', 'http://192.168.32.10:5001/get_market_and_table_online_and_gametime');

    request.onload = () => {
        const data = JSON.parse(request.responseText);
        ReactDOM.render(<span> Золото - {data.money} </span>, document.querySelector('#money_js'));
        ReactDOM.render(<span> Дерево - {data.wood} </span>, document.querySelector('#wood_js'));
        ReactDOM.render(<span> Камень - {data.rock} </span>, document.querySelector('#rock_js'));

        ReactDOM.render((<span> {data.gametime} </span>), document.querySelector('#datetime_js'));

        var render = [];

        const price_money = parseInt(document.getElementById('money_js').textContent.split("").reverse().join(""));
        const price_wood = parseInt(document.getElementById('wood_js').textContent.split("").reverse().join(""));
        const price_rock = parseInt(document.getElementById('rock_js').textContent.split("").reverse().join(""));

        render.push((
        <tr> 
            <th className="status-table-title">User</th> 
            <th className="status-table-title">
                <i className="fa fa-money fa-lg" /> & 
                <i className="fa fa-cubes fa-lg" /> & 
                <i className="fa fa-bars fa-lg" /> & 
                <i className="fa fa-area-chart fa-lg"/>
            </th> 
        </tr> ));
        for (var i = 0; i < data.status.length; i++) { 
            render.push(<UserStatusBar add={"player"+(i+1)} name={data.status[i][0]} money={data.status[i][1]} gold={data.status[i][2]} wood={data.status[i][3]} rock={data.status[i][4]} />); 
        }

        render.sort((x, y) => { if(x.props.money + x.props.gold*price_money + x.props.wood*price_wood + x.props.rock*price_rock <
                                   y.props.money + y.props.gold*price_money + y.props.wood*price_wood + y.props.rock*price_rock) { return -1; }
                                else { return 1; } } );

        console.log(render);
        ReactDOM.render(React.createElement('tbody', null, render), document.querySelector('#UserStatusBar_div'));
    }

    const data = new FormData();
    data.append('NULL', "NULL");
    request.send(data);
    return false;
}

const UserStatusBar = (input) => {
    return (
        <tr className={input.add}>
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
        getValueResource();
        window.setInterval(getValueResource, 2000);
        return (
            <div id="resource">
                <span id="price_money"><i className="fa fa-cubes fa-lg"></i><span id="money_js"></span></span>
                <span id="price_wood"><i className="fa fa-bars fa-lg"></i><span id="wood_js"></span></span>
                <span id="price_rock"><i className="fa fa-area-chart fa-lg"></i><span id="rock_js"></span></span>
            </div>
        );
    };
};