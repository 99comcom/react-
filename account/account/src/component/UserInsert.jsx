import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import Header from './Header'

const UserInsert = ({ history }) => {
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
        uid: '',
        upass: '',
        uname: '',
        file: null,
        fileName: ''
    })

    const { uid, upass, uname, file } = form;
    const onChangeFile = (e) => {
        setForm({
            ...form,
            file: e.target.files[0]
        })
    }
    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        }
        )
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if ((form.uid === '') || (form.upass === '') || (form.uname) === '') {
            setMessage('아이디,비밀번호,이름을 입력하세요')
            return;
        }
        if (!window.confirm("회원 가입을 하시겠습니까?")) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("uid", uid);
        formData.append("uname", uname);
        formData.append("upass", upass);

        await axios.post(`/api/user/insert`, formData);
        alert('회원가입이 성공하였습니다.');
        history.push('/login')
    }
    return (
        <div>
            <Card className="my-5 p-3">
                <Form onSubmit={onSubmit}>
                    <Form.Control className='my-3'
                        placeholder='아이디'
                        name='uid'
                        onChange={onChangeForm} />
                    <Form.Control className='my-3'
                        placeholder='비밀번호'
                        name='upass'
                        onChange={onChangeForm}
                        type="password" />
                    <Form.Control className='my-3'
                        onChange={onChangeForm}
                        name='uname'
                        placeholder='이름' />
                    <Form.Control className='my-3'
                        type='file'
                        name='file'
                        onChange={onChangeFile} />
                    <Button type='submit'>회원등록하기</Button>
                </Form>
                {message && <Alert>{message}</Alert>
                }
            </Card>
        </div>
    )
}

export default UserInsert