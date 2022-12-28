import axios from 'axios';
import { getDatabase, onChildChanged,ref } from 'firebase/database';
import { useContext, useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { withRouter } from 'react-router-dom';
import { app } from '../firebase';
import { UserContext } from './context/UserContext';


const Header = ({history, location}) => {
  const db = getDatabase(app);
  const path=location.pathname;
  const [count,setCount]=useState(
    !sessionStorage.getItem('count') ? 0 :
    parseInt(sessionStorage.getItem('count'))
  )
  const {loginUser,setLoginUser}=useContext(UserContext);

  const onClick=(e)=>{
    e.preventDefault();
    const href=e.target.getAttribute('href');
    history.push(href);
  }
  const onClickLogout=(e)=>{
    e.preventDefault();
    alert(sessionStorage.getItem("uid"))
    sessionStorage.removeItem('uid');
    history.push('/');
  }

  const getLoginUser=async()=>{
    const result=await axios.get(`/api/user/read/${sessionStorage.getItem("uid")}`)
    setLoginUser(result.data);
  }
  useEffect(()=>{
    if(sessionStorage.getItem("uid")){
      getLoginUser();
    }
  },[sessionStorage.getItem("uid")])

  useEffect(()=>{
    if(path !== '/chat'){
      onChildChanged(ref(db,'/'),(data) => {
        setCount(count+1);
      })
    }else{
      setCount(0);
    }
    sessionStorage.setItem('count',count);
  },[sessionStorage.getItem('count'),path])


  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/" onClick={onClick}>Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/movie" onClick={onClick}>영화예약</Nav.Link>
            <Nav.Link href="/shop" onClick={onClick}>상품관리</Nav.Link>
            <Nav.Link href="/chat" onClick={onClick}>채팅
            {count > 0 && <Badge bg="danger">{count}</Badge>}
            </Nav.Link>
            
            
          </Nav>
          <Nav>
            {sessionStorage.getItem('uid')?
            <>
             <Nav.Link href={`/user/read/${sessionStorage.getItem("uid")}`} onClick={onClick}>{loginUser.uid}</Nav.Link>
            <Nav.Link href="#" style={{float:'right'}} onClick={onClickLogout}>로그아웃</Nav.Link>
            </>
           
            :
            <Nav.Link href="/login" style={{float:'right'}} onClick={onClick}>로그인</Nav.Link>
          }

          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default withRouter(Header)