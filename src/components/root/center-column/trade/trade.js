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
const clearCheckedQuantity = () => {
    document.getElementById("quantity_1").className = "buttons_trade buttons_quantity";
    document.getElementById("quantity_5").className = "buttons_trade buttons_quantity";
    document.getElementById("quantity_10").className = "buttons_trade buttons_quantity";
    document.getElementById("input_quantity").className = "buttons_trade buttons_quantity";
}

const clearCheckedPrice = () => {
    document.getElementById("quantity_1").className = "buttons_trade buttons_quantity";
    document.getElementById("quantity_5").className = "buttons_trade buttons_quantity";
    document.getElementById("quantity_10").className = "buttons_trade buttons_quantity";
    document.getElementById("input_quantity").className = "buttons_trade buttons_quantity";
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
const getQuantity = () => {
    if(document.getElementById("quantity_1").className.search("checked") != -1) { return "1"; }
    else if(document.getElementById("quantity_5").className.search("checked") != -1) { return "5"; }
    else if(document.getElementById("quantity_10").className.search("checked") != -1) { return "5"; }
    else { return document.getElementById("input_quantity").textContent; }
}
const getPrice = () => { return document.getElementById("input_price").textContent; }

const clickGold = () => { clearCheckedResource(); document.getElementById("trade_gold").className += " checked"; }
const clickWood = () => { clearCheckedResource(); document.getElementById("trade_wood").className += " checked"; }
const clickRock = () => { clearCheckedResource(); document.getElementById("trade_rock").className += " checked"; }
const clickSale = () => { clearCheckedType(); document.getElementById("sale").className += " checked"; }
const clickBuy = () => { clearCheckedType(); document.getElementById("buy").className += " checked"; }
const click1 = () => { clearCheckedQuantity(); document.getElementById("quantity_1").className += " checked"; }
const click5 = () => { clearCheckedQuantity(); document.getElementById("quantity_5").className += " checked"; }
const click10 = () => { clearCheckedQuantity(); document.getElementById("quantity_10").className += " checked"; }
const clickplus = () => { clearCheckedQuantity(); var input = document.getElementById("input_quantity"); input.className += " checked"; 
                        ReactDOM.render(<span>{parseInt(input.textContent)+1}</span>, input);  }
const clickminus = () => { clearCheckedQuantity(); var input = document.getElementById("input_quantity"); input.className += " checked"; 
                        if(parseInt(input.textContent)>1) {ReactDOM.render(<span>{parseInt(input.textContent)-1}</span>, input); } }
const clickinput = () => { clearCheckedQuantity(); document.getElementById("input_quantity").className += " checked"; }

const clickplusprice5 = () => { var input = document.getElementById("input_price");  ReactDOM.render(<span>{parseInt(input.textContent)+5}</span>, input);  }
const clickminusprice5 = () => { var input = document.getElementById("input_price");  if(parseInt(input.textContent)>5) {ReactDOM.render(<span>{parseInt(input.textContent)-5}</span>, input); } }
const clickplusprice1 = () => { var input = document.getElementById("input_price");  ReactDOM.render(<span>{parseInt(input.textContent)+1}</span>, input);  }
const clickminusprice1 = () => { var input = document.getElementById("input_price");  if(parseInt(input.textContent)>1) {ReactDOM.render(<span>{parseInt(input.textContent)-1}</span>, input); } }


const typeTransaction = (type) => {
    if(type==0) {return "status";} 
    if(type==2) {return "trade with players"}
    else {return "trade with market";}
}

function TradeAndGetStatus(type=0) {
    const request = new XMLHttpRequest();
    request.open('POST', '/user_status_or_trade');

    request.onload = () => {
        const data = JSON.parse(request.responseText);
        ReactDOM.render(data.Money, document.querySelector('#my_money'));
        ReactDOM.render(data.Gold, document.querySelector('#my_gold'));
        ReactDOM.render(data.Wood, document.querySelector('#my_wood'));
        ReactDOM.render(data.Rock, document.querySelector('#my_rock'));
    }

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

export default class Trade extends Component {
    
    Trade_with_market() { TradeAndGetStatus(1); }
    Trade_with_player() { TradeAndGetStatus(2); }

    render() {
        window.setTimeout(TradeAndGetStatus, 500);
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
                        <td><button className="buttons_trade checked" id="buy" onClick={clickBuy}><i class="fa fa-arrow-down"/>Покупка</button></td>
                        <td><button className="buttons_trade" id="sale" onClick={clickSale}><i class="fa fa-arrow-up"/>Продажа</button></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Предмет сделки:</th>
                        <td><button className="buttons_trade checked" id="trade_gold" onClick={clickGold}><i className="fa fa-cubes"/>Золото</button></td>
                        <td><button className="buttons_trade" id="trade_wood" onClick={clickWood}><i className="fa fa-bars"/>Дерево</button></td>
                        <td><button className="buttons_trade" id="trade_rock" onClick={clickRock}><i className="fa fa-area-chart" />Камень</button></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Количество:</th>
                        <td><button className="buttons_trade buttons_quantity checked" id="quantity_1" onClick={click1}> 1 </button></td>
                        <td><button className="buttons_trade buttons_quantity" id="quantity_5" onClick={click5}> 5 </button></td>
                        <td><button className="buttons_trade buttons_quantity" id="quantity_10" onClick={click10}> 10 </button></td>
                        <td id="trade_text_input"> <span>
                            <button className="buttons_trade buttons_input_quantity" onClick={clickminus}>-</button>
                            <button className="buttons_trade buttons_input_quantity" id="input_quantity" onClick={clickinput}><span>10 </span></button>
                            <button className="buttons_trade buttons_input_quantity" onClick={clickplus}>+</button>
                        </span> </td>
                    </tr>
                    <tr>
                        <th>C рыком:</th>
                        <td colspan="2">По рыночной цене!</td>
                        <th colspan="2" id="trade_th"><button className="buttons_issue checked" onClick={this.Trade_with_market}>Торговать</button></th>
                    </tr>   
                    <tr>
                        <th>C играками:</th>
                        <td colspan="2">
                            Цена: 
                            <button className="buttons_trade buttons_input_price" onClick={clickminusprice5}>-5</button>
                            <button className="buttons_trade buttons_input_price" onClick={clickminusprice1}>-1</button>
                            <button className="buttons_trade buttons_input_price checked" id="input_price"><span>100</span></button>
                            <button className="buttons_trade buttons_input_price" onClick={clickplusprice1}>+1</button>
                            <button className="buttons_trade buttons_input_price" onClick={clickplusprice5}>+5</button>
                        </td>
                        <th colspan="2" id="trade_th"><button className="buttons_issue checked" onClick={this.Trade_with_player}>Выложить заявку</button></th>                    
                    </tr>
                </table>
            </div>
        );
    };
};