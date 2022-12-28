import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import SendItem from './SendItem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../context/UserContext';

const SendMessage = () => {
  const {callAPIUser}=useContext(UserContext);
  const [list,setList]=useState([]);
  const [users,setUsers]=useState([]);
  const uid=sessionStorage.getItem('uid')
  const [message,setMessage] = useState('uid');
  const [receiver,setReceiver]=useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setMessage('');
  }
  const handleShow = () => setShow(true);


  const callAPI=async()=>{
    const result=await axios.get(`/api/message/send/${uid}`)
    setList(result.data);

  }
  const callUsers=async()=>{
    const result=await axios.get(`/api/user/list`);
    setUsers(result.data)
  }
  const onClickSend=async()=>{
      if(!window.confirm(`${uid}가 ${receiver}에게 ${message}를 보내겠습니까?`)) return;
      await axios.post(`/api/message/insert`,
      {
        sender:uid,
        receiver:receiver,
        message:message
      });
      handleClose();
      callAPI();
      callAPIUser();
  }
  useEffect(()=>{
    callAPI();
    callUsers();


  },[]);
  if(!list || !users) return <h1>Loadgion...</h1>
  return (
    <div>      

<Button variant="primary" style={{float:'right' , fontSize:'15px'}} onClick={handleShow} className='my-3'>
        메세지 작성
      </Button>
    <Table>
        <thead>
            <tr style={{backgroundColor:"blue" ,color:"white" , fontSize:'15px'}}>
                <td>No.</td>
                <td>보낸이</td>
                <td>보낸날짜</td>
                <td>읽은날짜</td>
                <td>보기</td>
            </tr>
            </thead>
        <tbody>
        {list.map(msg=>
            <SendItem key={msg.uid} msg={msg} callAPI={callAPI}/>
            )}
        </tbody>
      
    </Table>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Select 
        className='my-2' 
        aria-label="Default select example"
        onChange={(e)=>setReceiver(e.target.value)}
        >
          <option>받으실 분을 선택해주세요 </option>
          {users.map(user=>
           <option
           
           key={user.uid} 
           value={user.uid}>{user.uname}({user.uid})
           </option> 
           )}

          </Form.Select>
         <Form.Control
         value={message}
         onChange={(e)=>setMessage(e.target.value)}
            as="textarea"
            rows={5}
          placeholder='Leave a comment here'
         />


  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickSend}>Send</Button>
        </Modal.Footer>
      </Modal>
    
   </div>
  )
}

export default SendMessage