import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Table } from 'react-bootstrap';
import TradeItem from './TradeItem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { AccountContext } from '../context/AccountContext';

const AccountRead = ({match}) => {
  const ano=match.params.ano;
  const [show, setShow] = useState(false);
  const [trade, setTrade] = useState({
    ano: ano,
    tno: '',
    amount: ''
  });
  const [account, setAccount] = useState('');
  const [trades, setTrades] = useState([]);
  const {aname, openDate, fbalance, balance} = account;

  const {accounts} = useContext(AccountContext);

  const onChange = (e) => {
    setTrade({
      ...trade,
      [e.target.name]: e.target.value
    })
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const callAPIAccount= async() =>{
    const result = await axios.get(`/api/account/read/${ano}`);
    setAccount(result.data);
  }

  const callTrades = async() => {
    const result= await axios.get(`/api/trade/list/${ano}`);
    setTrades(result.data);
  }

  const onSubmit = async() => {
    if(trade.amount > balance) {
      alert('잔액이 부족합니다!');
      return;
    }

    if(!window.confirm(`${trade.ano}가 ${trade.tno}에게 ${trade.amount}원을 이체하실래요?`)) return;
    await axios.post('/api/trade/', trade);
    handleClose();
    setTrade({
      ano: ano,
      tno: '',
      amount: ''
    });
    callTrades();
    callAPIAccount();
  }

  useEffect(()=>{
    console.log('.....accountRead')
    callAPIAccount();
    callTrades();
  },[]);

  if(!account || !trades || !accounts) return <h1>Loading......</h1>
  return (
    <div>
      <Card className='my-5 p-3'>
        <Row>
          <Col>계좌번호: {ano}</Col>
          <Col>계좌주명: {aname}</Col>
          <Col>{openDate}</Col>
          <Col>잔액: <Badge bg="primary">{fbalance} </Badge></Col>
        </Row>
      </Card>
      <Button variant="primary" onClick={handleShow}>
          계좌이체
      </Button>
      <hr/>
      <Table>
        <thead>
          <tr>
            <td>계좌번호</td>
            <td>날짜</td>
            <td>입금/출금</td>
            <td>입출금액</td>
          </tr>
        </thead>
        <tbody>
          {trades.map(trade=>
            <TradeItem key={trade.id} trade={trade}/>
          )}
        </tbody>
      </Table>
      {/* 이체 모달창 */}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>계좌이체</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Select className='my-3'
              name="tno"
              value={trade.tno}
              onChange={onChange}>
              <option>계좌를 선택하세요!</option>
              {accounts.map(account=>
                  <option value={account.ano} key={account.ano}>
                    {account.ano} ({account.aname})
                  </option>
              )}
            </Form.Select>
            <Form.Control
              name="amount"
              value={trade.amount}
              onChange={onChange}
              placeholder='이체금액'
              type="number"
              min={1}
              step={100}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button 
              onClick={onSubmit}
              variant="primary">
              이체
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  )
}

export default AccountRead