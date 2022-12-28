import React from 'react'
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
const AccountItem = ({account, history}) => {
  const {ano, aname, openDate, fbalance} = account;
  const onClickButton= () => {
      history.push(`/account/read/${ano}`);
  }
  return (
    <tr>
      <td>{ano}</td>
      <td>{aname}</td>
      <td>{openDate}</td>
      <td>{fbalance}</td>
      <td><Button onClick={onClickButton}>내역확인</Button></td>
    </tr>
  )
}

export default withRouter(AccountItem);