import axios from 'axios';
import React, { useEffect, useId, useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap';
import Header from './Header';

const UserRead = ({ match, history }) => {
    const uid = match.params.uid;
    const [show, setShow] = useState(false);
    const [pass, setPass] = useState('');
    const [veripass, setVeripass] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [image, setImage] = useState(null);
    const [user, setUser] = useState({
        uid: uid,
        uname: '',
        file: null,
        photo: ''
    });

    const callUser = async () => {
        const result = await axios.get(`/api/user/read/${uid}`);
        setUser(result.data);
        console.log(result.data);
        result.data.photo ? setImage(`/api/display?fileName=${result.data.photo}`) : setImage('/img9.png')
    }

    const onChangeForm = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    const onChangeFile = (e) => {
        setUser({
            ...user,
            file: e.target.files[0]
        })
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!window.confirm('내용을 수정하시겠습니까?')) return;
        const formData = new FormData();
        formData.append("uid", uid);
        formData.append("uname", user.uname);
        formData.append("file",user.file);
        formData.append("photo", user.photo)


        await axios.post(`/api/user/update`, formData);
        alert('수정성공!');

    }

    const onClickPassChange = async() => {
        if ((pass === '') || (veripass === "")) {
            alert("비밀번호와 확인 비밀번호를 입력하세요");
            setPass('');
            setVeripass('');
            return;
        }
        if(pass!==veripass){
            alert('두 비밀번호가 일치하지 않습니다.')
            return;
        }
        //vo가 upass라서 upass라는 key로 보내야함.
        await axios.post('/api/user/update/password',{upass:pass,uid:uid})
        alert('비밀번호를 변경하였습니다.');
        handleClose();
        sessionStorage.removeItem('uid');
        history.push('/login')
    }



        useEffect(() => {
            callUser();
        }, [])

        if (!user) <h1>데이터를 불러오는 중입니다.</h1>




  


    return (
        <div>
            <Card className='my-5 p-3'>
                <Form onSubmit={onSubmit}>
                    <Form.Control
                        value={user.uid}
                        disabled={true}
                        name='uid' />
                    <Form.Control
                        value={user.uname}
                        name='uname'
                        onChange={onChangeForm} />
                    <Form.Control
                        value={user.photo}
                        name='photo'
                        type='hidden' />
                    {user.photo && <img src={image} width={100} />}
                    <Form.Control className='my-3'
                        // 파일은 name이 필요가 없음. name을 받지 않기 떄문
                        type='file'
                        onChange={onChangeFile} />
                    <Button type='submit' style={{ marginRight: 50 }}>수정</Button>
                    <Button onClick={handleShow}>비밀번호 변경</Button>
                </Form>
            </Card>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>비밀번호 수정</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            placeholder='비밀번호'
                            type='password'
                            value={pass}
                            onChange={(e) => setPass(e.target.value)} />
                        <Form.Control
                            placeholder='비밀번호 확인'
                            type='password'
                            value={veripass}
                            onChange={(e) => setVeripass(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        {/* 모달창은 event가 안먹음.. 그래서 onkeyDown은 못씀. */}
                        <Button onClick={onClickPassChange}  variant="secondary">
                            비밀번호 수정
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )
}

export default UserRead