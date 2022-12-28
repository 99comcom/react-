import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
const UserItem = ({user}) => {
    const {uid, uname, photo} = user;



  return ( 
   <Card className='my-3 p-2'>
        <Row>
            <Col lg={2}>
            {!photo?
                <Image src="/logo192.png" fluid={true} width={30} />
                :
                <Image src={`/display?fileName=${photo}`} fluid={true} width={30} />
            }
            
            </Col>
            <Col lg={10}>
                <h4>{uid}</h4>
                <h4>{uname}</h4>
            </Col>
        </Row>
   </Card>
  )
}

export default UserItem