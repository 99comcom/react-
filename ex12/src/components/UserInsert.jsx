import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Card, Row, Col, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserInsert = ({history}) => {
    const [form,setForm]=useState({
        uid:'',upass:'',uname:'',file:null
    });
    const{uid,upass,uname,file}=form;
    

    const onSubmit=async(e)=>{
        e.preventDefault();
        if(uid===''||upass===''||uname===''){
            alert("입력란을 확인바랍니다.")
            return;
        }
        const formData=new FormData();
        formData.append('uid',uid);
        formData.append('upass',upass);
        formData.append('uname',uname);
        formData.append('file',file);

        if(!window.confirm('새로운 회원을 등록하시겠습니까?'))return;
        await axios.post(`/api/user/insert`,formData);

        alert(`회원가입 완료`)
        history.push('/login');
    }
    const onChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const onChangeFile=(e)=>{
        setForm({
            ...form,
            file:e.target.files[0]
        })
    }

  return (
    <div>
        <Row className="d-flex justify-content-conter">
            <Card style={{width:'50rem'}} className="p-3">
                <Form onSubmit={onSubmit}>
               
                <Form.Control className='my-3'
                    onChange={onChange}
                    name="uid"
                    value={uid}
                    placeholder='아이디'
                />
                 <Form.Control
                 onChange={onChange}
                     name="upass"
                     value={upass}
                    type="password"
                    placeholder='비밀번호'
                />
                 <Form.Control className='my-3'
                 onChange={onChange}
                     name="uname"
                     value={uname}
                    placeholder='이름'
                />
                 <Form.Control className='my-3'
                  onChange={onChangeFile}
                    type="file"
                />
                <Button type='submit' style={{width:"100%"}}>로그인</Button>
                <div className='my-3'>
                <Link to="/user/insert">회원가입</Link>
                </div>
                </Form>
            </Card>

        </Row>

    </div>
  )
}

export default UserInsert