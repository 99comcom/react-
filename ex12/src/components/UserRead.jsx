import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { Card, Row, Col, Form} from 'react-bootstrap';
import { UserContext } from './context/UserContext';


const UserRead = () => {

    const {loginUser}=useContext(UserContext);
  return (
    <Row className="d-flex justify-content-conter">
      
        <Card   style={{width:'15rem', margin:10, padding:5}}>
            <Card.Img src={loginUser.photo}/>
            <Card.Body>
                <Card.Title>
                    
                    {loginUser.uname}
                    ({loginUser.uid})
                </Card.Title>
            </Card.Body>
        </Card>
    </Row>
  )
}

export default UserRead