import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { AccountContext } from '../context/AccountContext'
import AccountList from './AccountList'
import AccountRead from './AccountRead'
import Header from './Header'

const AccountPage = () => {
  const [accounts, setAccounts] = useState([]);
  const callAPIAccounts = async () => {
    const result = await axios.get('/api/account/list')
    setAccounts(result.data);
  }
  useEffect(() => {
    callAPIAccounts();
  }, []) 

  

  return (
<AccountContext.Provider value={{accounts, callAPIAccounts}} /* 여러개를 다 보낼때는 괄호를 쌍중괄호로 보내줌. 대신 받을 때 중괄호로 감싸서 받음. 
하나만 보내면 중괄호 하나만. 대신 받을때는 중괄호 x */>
    <div>
        <Route path="/account/list" component={AccountList} />
        <Route path="/account/read/:ano" component={AccountRead} />
    </div>
    </AccountContext.Provider>
  )
}

export default AccountPage