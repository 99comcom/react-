import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';

const LoginPage = ({history}) => {
  const {setUser} = useContext(UserContext);
  const{setBackground}=useContext(ThemeContext);

  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    uid: '',
    upass: '',
  });

  const onChange =(e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    setBackground('danger'); 
   },[])
  const onSubmit = async(e) => {
    e.preventDefault();
    if(form.uid==='' || form.upass==='') {
      setMessage('아이디와 비밀번호를 입력하세요!');
      return;
    }
    const result = await axios.post(
      `/api/user/login`, {uid:form.uid, upass:form.upass});
      
    if(result.data===0){
      setMessage('아이디가 존재하지 않습니다!');
    }else if(result.data===2){
      setMessage('비밀번호가 일치하지 않습니다!');
    }else{
      setMessage('');
      sessionStorage.setItem('uid', form.uid);
      history.push('/');
    }
  }

  return (
    <div>

      <Card className='p-3 my-5'>
        <Form onSubmit={ onSubmit }>
          <Form.Control className='my-3'
            onChange={onChange}
            name="uid"
            value={form.uid}
            placeholder='아이디'/>
          <Form.Control className='my-3'
            onChange={onChange}
            name="upass"
            value={form.upass}
            type="password"
            placeholder='비밀번호'/>
          <Button type="submit" style={{width:'100%'}}>로그인</Button>  
        </Form>
        { message &&
          <Alert className='my-3' style={{textAlign:'center'}}>{message}</Alert>  
        }
        <hr/>
        <Link to="/user/insert">회원가입</Link>
      </Card>
    </div>
  )
}

export default LoginPage