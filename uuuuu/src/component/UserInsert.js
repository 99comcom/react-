
import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import HeaderPage from './HeaderPage';
import { Link } from 'react-router-dom';

const UserInsert = ({history}) => {
    const refImage=useRef();

const[image,setImage]=useState('/logo192.png');
const [form,setForm]=useState({
    uid:'',upass:'',uname:'',file:null,fileName:''
});
 const {uid,upass,uname,file,fileName}=form;
 const [message, setMessage]=useState('');
 const onSubmit=async(e)=>{
    e.preventDefault();
    const result=await axios.get(`/user/read/${uid}`);
    const user=result.data;
    if(user){
        setMessage("이미 사용중인 아이디 입니다");
        return;
    }
    const formData=new FormData();
    formData.append("file",file);
    formData.append("uid",uid);
    formData.append("uname",uname);
    formData.append("upass",upass);
    const config={
        headers:{'content-type':'multipart/form-data'}
    }
    await axios.post(`/user/insert`,formData,config);

    await axios.post(`/user/insert`,form);
    alert('회원가입이 완료되었습니다.')
    history.push('/login')
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
            file:e.target.files[0],
            fileName: e.target.value
        })
        //이미지 미리보기
        const reader=new FileReader();
        reader.onload=(e)=>{
            setImage(e.target.result);
        }
        reader.readAsDataURL(e.target.files[0])
    }  
 return (
    <div>
   
        <Card style={{ width: '28rem',margin:'0px auto' }} className="text-center">
            <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form onSubmit={onSubmit}>
            <Form.Control
                onChange={onChange}
                 value={uname}
                 name='uname'
                className='my-3'
                placeholder='Name'
               />
            <Form.Control 
            onChange={onChange}
             value={uid}
             name='uid'
                className='my-3'
                placeholder='ID'
               />
            <Form.Control
                 onChange={onChange}
                 value={upass}
                type="password"
                name="upass"
                placeholder='PassWord'
                />
                <td>　</td>
                <h6>――――――――――― 사진 ――――――――――</h6>
                <img src={image} width={150} onClick={()=>refImage.current.click()}/>
                <td>　</td>
                <td>　</td>
            <input
             onChange={onChangeFile}
                type="file"
                ref={refImage}
                style={{display:'none'}}
                />
            <Card.Text>
            </Card.Text>
            <Button variant="primary" type="Submit" >회원가입</Button>
            </Form>
            </Card.Body>
            {message &&
            <Alert className='mx-3' color='red'>{message}</Alert>
            }
        </Card>
    </div>
  )
}

export default UserInsert