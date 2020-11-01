import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CompanyRegForm from './CompanyRegForm';
import CompanyList from './CompanyTable';
import Login from './Login';
import INF from './INF';
import Home from './Home';
import $ from 'jquery';
$.DataTable = require('datatables.net');

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/register" name="register page" render={() => <CompanyRegForm />} />
            <Route exact path="/cdc/displayRegs" name="table page" render={() => <CompanyList />} />
            <Route exact path="/login" name="login page" render={() => <Login />} />
            <Route exact path="/home" name="home page" render={(props) => <Home {...props}/>} />
            <Route exact path="/inf" name="inf form page" render={(props) => <INF {...props}/>} />
            
        </Switch>
    </BrowserRouter>,
    document.getElementById("root"));

$(document).ready(function () {
    $('#dtBasicExample').DataTable();
});