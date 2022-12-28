import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Header from './Header'
import UserInsert from './UserInsert';

const LoginPage = ({history}) => {
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
      uid: '',
      upass: ''
  });
  const { uid, upass } = form;
  const onChangeForm = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      }
      )
  }

  const onSubmit = async (e) => {
      e.preventDefault();
      //===안 하고 =해버려서 const는 재할당 불가능하다는 오류 뜸.
      if ((uid === "") || (upass === "")) {
          alert('아이디와 비밀번호를 입력하세요')
          return;
      }
      const result = await axios.post(`/api/user/login`,{uid:uid,upass:upass});
      if (result.data===0) setMessage('아이디가 존재하지 않습니다.')
      else if (result.data===2) setMessage('비밀번호가 다릅니다.');
      else {
         /*  setUser(result.data);  *///user라는 state변수에 로그인이 성공한 사람의 모든 DB정보를 다 넣어줌
          //근데 이게 app에서 규정했기 때문에 모든 페이지에서 다 사용할 수 있음. 이제 이걸 <Header>에서 사용.
          //근데 component 이동하거나 리랜더 하는 순간 값이 싹 사라짐.
          setMessage('로그인에 성공하였습니다.')
          sessionStorage.setItem('uid', uid);
          history.push('/');
      }
    }
  return (
    <div>
     
      <Card className='p-3 my-5'>
                    <Form onSubmit={onSubmit}>
                        <Form.Control className='my-2'
                            placeholder='아이디'
                            value={uid}
                            name='uid'
                            onChange={onChangeForm} />
                        <Form.Control className='my-2'
                            placeholder='비밀번호'
                            value={upass}
                            name='upass'
                            type='password'
                            onChange={onChangeForm} />
                        <Button style={{ width: '100%' }} type='submit'>로그인</Button>
                    </Form>
                    {message &&
                        <Alert className='my-3'>{message}</Alert>
                    }
                    <hr />
                    <Link to="/user/insert">회원가입</Link>
                </Card>

    </div>
  )

}

export default LoginPage