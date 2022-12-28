import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Card, Button, Modal } from 'react-bootstrap';
import Header from './Header'

const UserRead = ({match, history}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const uid=match.params.uid;
  const [image, setImage]=useState('');
  const [form, setForm] = useState({
    uid: uid,
    uname: '',
    file: null,
    photo:''
  });

  const [pass, setPass] = useState('')
  const [pass1, setPass1] = useState('')

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  }

  const onChangeFile = (e) => {
    setForm({
      ...form,
      file: e.target.files[0]
    })
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  const callUser = async()=>{
    const result= await axios.get(`/api/user/read/${uid}`);
    setForm(result.data);

    if(result.data.photo)
      setImage(`/api/display?fileName=${result.data.photo}`)
    else 
      setImage('/img01.png');  
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(!window.confirm('수정한 내용을 변경하실래요?')) return;
    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("uname", form.uname);
    formData.append("uid", uid);
    formData.append("photo", form.photo);
    await axios.post('/api/user/update', formData);
    alert('회원정보 수정완료!');
    history.push('/user');
  }

  const onClickChange= async()=>{
    if(pass==='' || pass1==='' || pass!==pass1) {
      alert('비밀번호와 비밀번호 확인을 입력하세요!');
      return;
    }
    await axios.post('/api/user/update/password',
      {uid:uid, upass:pass});
    alert("비빌번호변경완료!");
    handleClose();
    sessionStorage.removeItem('uid');
    history.push('/login');  
  }
  useEffect(()=>{
    callUser();
  },[uid]);

  if(!form) return <h1>Loading......</h1>
  return (
    <div>
      <Header/>
      <Card className="my-5 p-3">
        <Form onSubmit={onSubmit} encType="multipart/form-data">
          <Form.Control className="my-3"
            disabled={true}
            value={uid}/>
          <Button onClick={handleShow}>비밀번호변경</Button>  
          <Form.Control className="my-3"
            onChange={onChange}
            value={form.uname}
            name="uname"/>
          <img src={image} width={300}/>
          <Form.Control className="my-3"
            type="file"
            onChange={onChangeFile}/> 
          <Button type="submit">수정</Button>     
        </Form>
      </Card>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>비밀번호수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control className="my-3"
              placeholder='비밀번호'
              type="password"
              value={pass}
              onChange={(e)=>setPass(e.target.value)}/>
            <Form.Control
              placeholder='비밀번호확인'
              value={pass1}
              onChange={(e)=>setPass1(e.target.value)}
              type="password"/>  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={onClickChange}>
              비밀번호변경
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  )
}

export default UserRead