import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Switch } from 'react-router-dom';
import HomePage from './component/HomePage';
import BoardPage from './component/BoardPage';
import UserPage from './component/UserPage';
import LoginPage from './component/LoginPage';

import ProductPage from './component/ProductPage';


function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/board" component={BoardPage}/>
        <Route path="/user" component={UserPage}/>
        <Route path="/product" component={ProductPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route render={({location})=>(<h2>{location.pathname}페이지가 존재하지 않습니다.</h2>)}/>
      </Switch>
    </div>
  );
}

export default App;
