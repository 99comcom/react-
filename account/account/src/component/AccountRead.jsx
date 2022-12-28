import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import TradeItem from './TradeItem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AccountContext } from '../context/AccountContext';

const AccountRead = ({ match }) => {
  const ano = match.params.ano;

  const [account, setAccount] = useState({});
  const [trades, setTrades] = useState([]);
  const [show, setShow] = useState(false);
/*   const [accounts,setAccounts]=useState([]); */
//useContext 변수인데, 두개 이상을 보냈음. 하지만 쓰는 건 하나임. 그럼에도 여기 중괄호로 반드시 묶어서 활용해야 함. 
  const {accounts}=useContext(AccountContext);

  const newAccounts=accounts.filter(account=>account.ano!==ano);

  const [trade, setTrade] = useState({
    ano: ano,
    tno: '',
    amount: ''
  });


  /*   const {accounts}=useContext(AccountContext); */
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //page에서 해주면 usecontext로 활용이 가능해서 이렇게 여러번 계속 다시 써줄필요없음.
  const callAPIAccount = async () => {
    const result = await axios.get(`/api/account/read/${ano}`)
    setAccount(result.data);
  }

  const callTrades = async () => {
    const result = await axios.get(`/api/trade/list/${ano}`)
    setTrades(result.data);
  }

  //useContext를 활용해서 이제 아래는 필요없음.
/*   const callAPIAccounts = async () => {
    const result = await axios.get('/api/account/list')
    setAccounts(result.data);
  } */

  const { aname, openDate, fbalance,balance } = account;

  const onChange = (e) => {
    setTrade({
      ...trade,
      [e.target.name]: e.target.value
    })
  }


  useEffect(() => {
    callAPIAccount();
    callTrades();
 /*    callAPIAccounts(); */
  }, [])

  const onSubmit = async () => {
    //잔액이 이체금액보다 작으면 알림 띄우고 종료시킴.
    if(trade.amount>balance){
      alert('잔액이 부족합니다.') 
      return;
    }
    if (!window.confirm(`${trade.ano}가 ${trade.tno}에게 ${trade.amount}원을 이체하시겠습니까?`)) return;
      await axios.post(`/api/trade/`,trade);
      handleClose();
      setTrade({
        ano:'',
        tno:'',
        amount:''
      });
      callTrades(); //이체하면 이체이력이 실시간으로 반영됨.
      callAPIAccount(); //잔액 바뀌는 것을 실시간으로 반영

  }

  if (!account || !trades || !accounts) <h3>데이터를 불러오는 중입니다.</h3>

  return (
    <>

      <Card className='my-5 p-3'>
        <Row style={{ marginBottom: '20px 0px', borderBottom: '1px solid gray' }}>
          <Col>이름</Col>
          <Col>계좌개설일</Col>
          <Col>잔액</Col>
        </Row>
        <Row>
          <Col>{aname}</Col>
          <Col>{openDate}</Col>
          <Col>{fbalance}</Col>
        </Row>

      </Card>
      <Button variant="primary" onClick={handleShow}>
        이체하기
      </Button>
      <Table>
        <thead>
          <tr>
            <td>계좌번호</td>
            <td>날짜</td>
            <td>입출금유형</td>
            <td>입출금액</td>
          </tr>
        </thead>
        <tbody>
          {trades.map(trades => <TradeItem key={trades.id} trades={trades} />)}
        </tbody>
      </Table>

 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>계좌이체</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            value={trade.tno}
            name='tno'
            onChange={onChange}>
            <option>계좌를 선택하세요!</option>
            {newAccounts.map(account =>
              <option key={account.ano} value={account.ano}>
                {account.ano}({account.aname})</option>
            )}
          </Form.Select>

          <Form.Control
            placeholder='이체금액'
            type='number'
            name='amount'
            value={trade.amount}
            onChange={onChange}
            step={100}
            min={1}
          />
        </Modal.Body>
        <Modal.Footer>
          {/*     <Button variant="secondary" onClick={handleClose}>
                닫기
              </Button> */}

          <Button variant="primary"
            onClick={onSubmit}>
            이체
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AccountRead