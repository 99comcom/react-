import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './component/HomePage';
import AccountPage from './component/AccountPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShopPage from './component/ShopPage';
import UserPage from './component/UserPage';
import LoginPage from './component/LoginPage';
import { UserContext } from './context/UserContext';
import { useState } from 'react';
import UserInsert from './component/UserInsert';
import UserRead from './component/UserRead';
import Header from './component/Header';


function App() {

    return (
        <div className="App">
            <Header />
            <Switch>
                <Route path='/' component={HomePage} exact />
                <Route path='/account' component={AccountPage} />
                <Route path='/shop' component={ShopPage} />
                {/* 아래 eaxct안붙이면 list가 떠버림 */}
                <Route path='/user' component={UserPage} exact />
                <Route path='/login' component={LoginPage} />
                <Route path="/user/insert" component={UserInsert} />
                <Route path="/user/read/:uid" component={UserRead} />
            </Switch>
        </div>
    );
}

export default App;
