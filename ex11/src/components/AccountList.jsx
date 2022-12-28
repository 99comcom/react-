import React, {useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { AccountContext } from '../context/AccountContext';
import AccountItem from './AccountItem';   

const AccountList = () => {
  const {accounts, callAPIAccounts} = useContext(AccountContext);
  return (
      <div>
        <Table className='my-5'>
          <thead>
            <tr>
              <td>No.</td>
              <td>성명</td>
              <td>개설일</td>
              <td>잔액</td>
              <td>내역확인</td>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account=>
              <AccountItem key={account.ano} account={account}/>
            )}
          </tbody>
        </Table>
    </div>
  )
}

export default AccountList