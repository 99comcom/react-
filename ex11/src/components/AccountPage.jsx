import React, {useState, useEffect} from 'react'
import {Route} from 'react-router-dom'
import AccountList from './AccountList';
import AccountRead from './AccountRead';
import { AccountContext } from '../context/AccountContext';
import axios from 'axios';

const AccountPage = () => {
  const [accounts, setAccounts] = useState([])

  const callAPIAccounts = async()=> {
    const result = await axios.get('/api/account/list');
    setAccounts(result.data);
  }

  useEffect(()=>{
    callAPIAccounts()
  }, []);

  return (
    <AccountContext.Provider 
      value={{accounts}}>
      <div>
        <Route 
          path="/account/list" 
          component={AccountList}/>
        <Route 
          path="/account/read/:ano" 
          component={AccountRead}/>
      </div>
    </AccountContext.Provider>  
  )
}

export default AccountPage