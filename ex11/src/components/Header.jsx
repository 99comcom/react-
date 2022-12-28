import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { withRouter } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';

const Header = ({history}) => {
  const {user} = useContext(UserContext);
  const{background}=useContext(ThemeContext);

  const onClickLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('uid');
    history.go(-1);
  }

  const onClick=(e)=>{
    e.preventDefault();
    const href=e.target.getAttribute('href');
    history.push(href);
  }

  return (
  <>
    <Navbar bg={background} variant="dark">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/" onClick={onClick}>Home</Nav.Link>
          <Nav.Link href="/account/list"onClick={onClick}>계좌관리</Nav.Link>
          <Nav.Link href="/shop"onClick={onClick}>상품관리</Nav.Link>
          <Nav.Link href="/chat"onClick={onClick}>채팅</Nav.Link>
          <Nav.Link href="/user"onClick={onClick}>사용자관리</Nav.Link>
        </Nav>
        <Nav>
          {sessionStorage.getItem('uid') ?
            <>
              <Nav.Link href={`/user/read/${sessionStorage.getItem('uid')}`}>
                {sessionStorage.getItem('uid')}
              </Nav.Link>
              <Nav.Link href="#" onClick={onClickLogout}>로그아웃</Nav.Link>
            </>
            :
            <Nav.Link href="/login"onClick={onClick}>로그인</Nav.Link>
          }
        </Nav>
      </Container>
    </Navbar>
  </>
  )
}

export default withRouter(Header)