import axios from 'axios';
import React, {useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import Header from './Header'

const UserInsert = ({history}) => {
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    uid:'',
    upass:'',
    uname:'',
    file: null,
  });
  const onChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const onChangeFile=(e)=>{
    setForm({
      ...form,
      file: e.target.files[0]
    });
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(form.uid==='' || form.upass==='' || form.uname===''){
      setMessage('아이디, 비밀번호, 이름을 입력하세요!');
      return;
    }
    if(!window.confirm('새로운 사용자를 등록하실래요?')) return;
    const formData=new FormData();
    formData.append("file", form.file);
    formData.append("uid", form.uid);
    formData.append("uname", form.uname);
    formData.append("upass", form.upass);
    await axios.post('/api/user/insert', formData);

    alert('새로운 사용자 등록 성공!');
    history.push('/login');
  }

  return (
    <div>
      <Header/>
      <Card className="my-5 p-3">
        <Form onSubmit={onSubmit}>
          <Form.Control className="my-3"
            onChange={onChange}
            name="uid"
            value={form.uid}
            placeholder='아이디'/>
          <Form.Control className="my-3"
            onChange={onChange}
            name="upass"
            value={form.upass}
            placeholder='비밀번호'
            type="password"/>
          <Form.Control className="my-3"
            onChange={onChange}
            name="uname"
            value={form.uname}
            placeholder='이름'/>   
          <Form.Control className="my-3"
            onChange={onChangeFile}
            type="file"/>  
          <Button type="submit">회원가입</Button>                     
        </Form>
        { message &&
          <Alert className='my-3' style={{textAlign:'center'}}>
            {message}
          </Alert>  
        }
      </Card>
    </div>
  )
}

export default UserInsert