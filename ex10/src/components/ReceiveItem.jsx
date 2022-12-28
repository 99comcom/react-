import axios from 'axios';
import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../context/UserContext';

const ReceiveItem = ({msg,callAPI,setUser}) => {
    const{mid,sender,uname,readDate,sendDate}=msg;
    const{callAPIUser}=useContext(UserContext);
    const [show, setShow] = useState(false);
    const [message,setMessage]=useState('');
    
    const handleClose = async() => {
        setShow(false)
        callAPI();
        const result=await axios.get(`/api//user/read/`+sessionStorage.getItem('uid'))
        callAPIUser();
        setUser(result.data)

    };
  
    const onClickView=async()=>{
        const result=await axios.get(`/api/message/read/${mid}`)
        setMessage(result.data.message);
        setShow(true);

    }
  return (
    <>
      
        <tr style={{color:!readDate && 'grad'}}>
            <td>{mid}</td>
            <td>{uname}({sender})</td>
            <td>{sendDate}</td>
            <td>{readDate}</td>
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

export default ReceiveItem