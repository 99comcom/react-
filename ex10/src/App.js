import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import BoardPage from './components/BoardPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessagePage from './components/MessagePage';

function App() {
  return (
    <div className="App">
     
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/board" component={BoardPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/message" component={MessagePage}/>
      </Switch>  
    </div>
  );
}

export default App;
