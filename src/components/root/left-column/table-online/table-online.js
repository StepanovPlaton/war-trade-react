import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './table-online.css'
import { render } from '@testing-library/react';
import Cookies from 'universal-cookie';

const UserStatusBar = (input) => {
    return (
        <tr>
            <td className="status-table-title">{ input.name }</td>
            <td className="status-table-td">{ input.status }</td>
        </tr>
    );
}

export default class TableOnline extends Component {

    render() {
        return (
            <table>
                <tr>
                    <th className="status-table-title">User</th>
                    <th className="status-table-title">M/W/R</th>
                </tr>
                <UserStatusBar name="Platon" status="3/2/5" />
                <UserStatusBar name="Tihon" status="6/2/4" />
                <UserStatusBar name="Andrey" status="12/0/3" />
                <UserStatusBar name="bot1" status="8/9/2" />
                <UserStatusBar name="bot2" status="2/1/3" />
            </table>
        );
    };
};