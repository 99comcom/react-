import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import HeadPage from './HeadPage';

const LoginPage = ({history}) => {
    const [message, setMessage]=useState('');
    const [form,setForm]=useState({
        uid:'',upass:''
    })
    
    const{uid,upass}=form;
    const onSubmit=async(e)=>{
        e.preventDefault();
        const result=await axios.get('/api/user/read/'+uid);
        if(!result.data){
            setMessage('해당 아이디가 존재하지 않습니다.') 
        }else if(result.data.upass !== upass){
            setMessage("해당 비밀번호가 맞지 않습니다.")
        }else{
            setMessage('성공...');
            sessionStorage.setItem("uid",uid);
            history.push('/');
        }
    }
    const onChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }


  return (
<>
<HeadPage/>
<Card style={{ width: '50%',margin:'0px auto' }} className="text-center">

        <Form className='p-3' onSubmit={onSubmit}>
            <Form.Control className='my-3'
            onChange={onChange}
            value={uid}
            name="uid"
            placeholder='User ID'
            />

            <Form.Control className='my-3'
            onChange={onChange}
            value={upass}
            name="upass"
            type="password" placeholder='Pass Word'
            />
            <Button type="submit">로그인</Button>
        </Form>
        {message &&
        <Alert key="primary" variant="primary" className='my-3'>
          {message}
        </Alert>
        }
    </Card>
</>
    
  )
}

export default LoginPage