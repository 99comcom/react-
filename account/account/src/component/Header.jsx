import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, Route, withRouter } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import UserInsert from './UserInsert';

const Header = ({history}) => {
    const onClickLogout=(e)=>{
        e.preventDefault();
        sessionStorage.removeItem('uid');
        //go와 push의 차이는? go는 안쌓이고 push는 history가 쌓이는 것인듯?
        history.push('/');
    }
    return (
        
        <>
        
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/account/list">계좌관리</Nav.Link>
                        <Nav.Link href="/shop/list">상품관리</Nav.Link>
                        <Nav.Link href="/user">이용자관리</Nav.Link>
                    </Nav>
                    <Nav>
                        {sessionStorage.getItem('uid') ? 
                        <>
                        {/* 다른 페이지로 넘어가는 순간 useContext로 얻어 온 user.uname의 값이 없어짐 */}
                        <Nav.Link href={`/user/read/${sessionStorage.getItem('uid')}`}>{sessionStorage.getItem('uid')}</Nav.Link>
                        <Nav.Link href="#" 
                        onClick={onClickLogout}>로그아웃</Nav.Link>
                        </>
                            : <Nav.Link href="/login">로그인</Nav.Link>}
                    </Nav>
                </Container>

            </Navbar>


        </>
    )
}

export default withRouter(Header)