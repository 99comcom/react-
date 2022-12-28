import React from 'react'
import { Badge, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const AccountItem = ({ account,history }) => {
    const { ano, aname, openDate, fbalance, } = account;
const onClickButton=(e)=>{
    e.preventDefault(); //이거 추가하면 새로고침 깜빡임 없이 이동
    history.push(`/account/read/${ano}`)
}
    return (
        <>
            <tr>
                <td>{ano}</td>
                <td>{aname}</td>
                <td>{openDate}</td>
                <td>{fbalance}</td>
                <td><Badge onClick={onClickButton} variant='primary'>보기</Badge></td>
            </tr>
        </>
    )
}

export default withRouter(AccountItem)