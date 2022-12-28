import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
const ProductItem = ({product}) => {
    const {pcode,pname,price,image} = product;

  return ( 
   
<Card className='my-1 align-content'>
<Row className='p-1'>
    <Col lg={1}>
    {!image?
        <Image src="/logo192.png" fluid={true} width={30} />
        :
        <img src={`/display?fileName=${image}`} width={100}/>
    }
    
    </Col>
    <Col lg={9}>
        <h4>{pcode}</h4>
        <h4>{pname}</h4>
        <h4>{price}원</h4>
    </Col>
</Row>
</Card>
  )
}

export default ProductItem