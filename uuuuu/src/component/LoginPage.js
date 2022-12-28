import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import HeaderPage from './HeaderPage';
import { Link } from 'react-router-dom';

const LoginPage = ({history}) => {
    const[form,setForm]=useState({
        uid:'',upass:'',uname:''
    });
    const{uid, upass, uname}=form;
    const [mesage,setMessage]=useState('');
    const onChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const onSubmit=async(e)=>{
        e.preventDefault();
        const result=await axios.get(`/user/read/${uid}`);
        const user=result.data;

        if(!user){
            setMessage('아이디가 존재하지 않습니다.')
        }else if(upass!==user.upass){
            setMessage('비밀번호가 일치하지 않습니다.')
        }else{
            sessionStorage.setItem('uid',uid);
            history.go(-1);
           
        }
    }


  return (
    <div>
    <HeaderPage/>
   
    <Card style={{ width: '28rem',margin:'0px auto' }} className="text-center">
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Form onSubmit={onSubmit}>
        <Form.Control 
            name="uid"
            value={uid}
            className='my-3'
            placeholder='ID'
            onChange={onChange}/>
        <Form.Control type="password"
            value={upass}
            name="upass"
            placeholder='PassWord'
            onChange={onChange}/>
        <Card.Text>
        </Card.Text>
        <Link to="/user/insert"> <Button  style={{float:'left' , fontSize:'13px'}} variant="primary" >Create an account</Button></Link>
        <Button  
        style={{float:'right' , fontSize:'13px'}} 
        variant="primary"
        type='Submit'>Login</Button>
        </Form>
      </Card.Body>
      {mesage && 
      <Alert className='mx-3'>{mesage}</Alert>
    }
    </Card>
    </div>
  )
}

export default LoginPage