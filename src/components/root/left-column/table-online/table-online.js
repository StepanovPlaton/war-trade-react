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
        render.push((
        <tr> 
            <th className="status-table-title">User</th> 
            <th className="status-table-title"><i className="fa fa-money fa-lg" />/<i className="fa fa-cubes fa-lg" />/<i className="fa fa-bars fa-lg" />/<i className="fa fa-area-chart fa-lg"/></th> 
        </tr> ));
        for (var i = 0; i < data.length; i++) { 
            render.push(<UserStatusBar name={data[i][0]} money={data[i][1]} gold={data[i][2]} wood={data[i][3]} rock={data[i][4]} />); 
        }
        ReactDOM.render(React.createElement('tbody', null, render), document.querySelector('#UserStatusBar_div'));
    }

    const data = new FormData();
    data.append('NULL', "NULL");
    request.send(data);
    return false;
}

const UserStatusBar = (input) => {
    return (
        <tr>
            <td className="status-table-title">{ input.name }</td>
            <td className="status-table-td">{ input.money}/{input.gold}/{input.wood}/{input.rock}</td>
        </tr>
    );
}

export default class TableOnline extends Component {

    render() {
        getTableOnline();
        window.setInterval(getTableOnline, 5000)
        return (
            <table  id="UserStatusBar_div">
                               
            </table>
        );
    };
};

//<tbody>
//<UserStatusBar name="Platon" status="3/2/5" />
//</tbody> 