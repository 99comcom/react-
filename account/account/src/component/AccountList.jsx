import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { List, Table } from 'react-bootstrap';
import AccountItem from './AccountItem';
import {AccountContext} from '../context/AccountContext'

const AccountList = () => {
  // 중괄호 없이와 있이의 차이는 뭘까? 중괄호 넣으니까 accoutns가 undefined가 떴음. 객체차이라고 함.
  // 
  const {accounts, callAPIAccounts}=useContext(AccountContext);


  if (!accounts) <h3>데이터를 불러오는 중입니다.</h3>
  return (
    /*         <div>
             <Table >
               <thead>
                 <tr>
                   <td>번호</td>
                   <td>이름</td>
                   <td>날짜</td>
                   <td>잔액</td>
                   <td>내역버튼</td>
                 </tr>
               </thead>
               <tbody>
                 {accounts.map(account => <AccountItem key={account.id} account={account} />)}
               </tbody>
             </Table>
           </div>   */
  /*   <AccountContext.Provider value={accounts}> 직계자식은 되지만, 형제는 안됨. 그래서 read는 안먹음.*/
      <div>
        <Table>
          <thead>
            <tr>
              <td >No.</td>
              <td >성명</td>
              <td >계설일</td>
              <td >잔액</td>
              <td >내역확인</td>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account =>
              <AccountItem key={account.ano} account={account} />
            )}
          </tbody>
        </Table>
      </div>
   /*  </AccountContext.Provider> */
  )
}

export default AccountList