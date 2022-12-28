import React, { useContext, useEffect, useState ,useRef} from 'react'
import './chat.css';
import { getDatabase,ref,set,push,onValue, remove } from "firebase/database";
import{app} from'../firebase';
import moment from 'moment/moment';
import { UserContext } from './context/UserContext';
import { Card, Row } from 'react-bootstrap';
import axios from 'axios';
import { async } from '@firebase/util';

const ChatPage = () => {
    const db = getDatabase(app);
    const {loginUser}=useContext(UserContext);
    const [msg,setMsg]=useState('');
    const [messages,setMessages]=useState([]);
    const wrapRef=useRef(null);


    const getMessage=()=>{
        onValue(ref(db,'chats/'),(snapshot)=>{
            let rows=[];
            snapshot.forEach(row=>{
                rows.push(row.val());
            })
            setMessages(rows);
        })
    }
    const sendMessage=async(e)=>{
       
        if(e.keyCode===13) {
            if(msg===''){
                return;
            }
            const key=push(ref(db,'chats/')).key;
            const date=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            const uid=loginUser.uid;
            const photo=loginUser.photo;
            await set(ref(db, `chats/${key}/`), {
                key: key,
                date: date,
                uid: uid,
                photo: photo,
                text: msg
            });
            setMsg('');
            wrapRef.current.scrollTO(0,wrapRef.current.scrollHeight);
        }

    }
    const onClickDelete=async(e)=>{
      e.preventDefault();
      if(!window.confirm('초기화??')) return;
      await remove(ref(db,'/chats'));
    }
    useEffect(()=>{
        getMessage();
    })
    if(!messages)return <h1>Loading...</h1>

  return (
    <Row className="d-flex justify-content-conter">
         <Card   style={{width:'40rem', margin:10, padding:5}}>
            <Card.Title className='my-3'>
              채팅룸 &nbsp;&nbsp;
              <a href="#" onClick={onClickDelete}>초기화</a>
            </Card.Title>
    <div style={{margin:'50px 0px'}}>
      <div className="wrap" wrapRef={wrapRef}>
        {messages.map(message=>
             <div className={message.uid===loginUser.uid ? "chat ch2" : "chat ch1"}>
                <div><img src={message.photo} className="icon"/></div>
                <div className="textbox">{message.text}</div>
            </div>
            )}
        </div>
      <div>
        <textarea 
        onKeyDown={(e)=>sendMessage(e)}
        value={msg}
        onChange={(e)=>setMsg(e.target.value)}
        placeholder='Enter for ....'/>
      </div>
    </div>
    </Card>
</Row>
  )
}

export default ChatPage