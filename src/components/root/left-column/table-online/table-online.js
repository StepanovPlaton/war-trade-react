import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './table-online.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

const getTableOnline = () => {
    const request = new XMLHttpRequest();
    request.open('POST', 'http://192.168.32.10:5001/get_table_online');

    request.onload = () => {
        const input = JSON.parse(request.responseText);
        const data = input.status;
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
        for (var i = 0; i < data.length; i++) { 
            render.push(<UserStatusBar add={"player"+(i+1)} name={data[i][0]} money={data[i][1]} gold={data[i][2]} wood={data[i][3]} rock={data[i][4]} />); 
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

export default class TableOnline extends Component {

    render() {
        //getTableOnline();
        //window.setInterval(getTableOnline, 5000)
        return (
            <table  id="UserStatusBar_div">
                               
            </table>
        );
    };
};

//<tbody>
//<UserStatusBar name="Platon" status="3/2/5" />
//</tbody> 