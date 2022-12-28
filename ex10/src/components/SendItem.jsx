import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const SendItem = ({msg,callAPI}) => {
    const {mid,receiver,uname,sendDate,readDate} = msg;
    const [show, setShow] = useState(false);
    const [message,setMessage]=useState('');
    const handleClose = async() => {
        setShow(false)
        callAPI();
        const result=await axios.get(`/api//user/read/`+sessionStorage.getItem('uid'))

    };
  
    const onClickView=async()=>{
        const result=await axios.get(`/api/message/read/${mid}`)
        setMessage(result.data.message);
        setShow(true);
      
    }
  return (
    <>
    <tr>
        <td>{mid}</td>
        <td>{uname}({receiver})</td>
        <td>{sendDate}</td>
        <td>{readDate ? readDate:"읽지않음"}</td>
        <td><Button variant="primary" onClick={onClickView}>
           보기
            </Button></td>
    </tr>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>메세지 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>




    </>
  )
}

export default SendItem