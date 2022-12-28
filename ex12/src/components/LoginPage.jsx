import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Card, Row, Col, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './context/UserContext';


const LoginPage = ({history}) => {
    const {setLoginUser}=useContext(UserContext);
    const [form,setForm] = useState({
        uid:'',upass:''
    })

    const onChange=(e)=>{
        setForm({
            ...form,
        [e.target.name]:e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if(form.uid===''||form.upass===''){
            alert('공란을 확인해주세요')
            return;
        }
        const result=await axios.post(`/api/user/login`,form);
        if(result.data===0){
            alert('등록된 정보가 아닙니다.');
        }else if(result.data==2){
            alert('비밀번호를 확인 바랍니다.');
        }else{
            sessionStorage.setItem("uid",form.uid);
            history.push("/");
            // const result=await axios.get(`/api/user/read/${form.uid}`)
            // setLoginUser(result.data);
        }
    }
  return (
    <div>
        <Row className="d-flex justify-content-conter">
            <Card style={{width:'50rem'}} className="p-3">
            <Form onSubmit={onSubmit}>
                <Form.Control className='my-3'
                    name='uid'
                    value={form.uid}
                    placeholder='아이디'
                    onChange={onChange}
                />
                 <Form.Control
                     name='upass'
                     value={form.upass}
                    type="password"
                    placeholder='비밀번호'
                    onChange={onChange}
                />
                <Button type='submit' style={{width:"100%"}}>로그인</Button>
                </Form>
                <div className='my-3'>
                <Link to="/user/insert">회원가입</Link>
                </div>
              
            </Card>

        </Row>

    </div>
  )
}

export default LoginPage