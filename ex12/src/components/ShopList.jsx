import axios from 'axios';
import { parseTwoDigitYear } from 'moment';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ShopList = () => {
    const [shops,setShops]=useState([]);
    const callShops=async()=>{
        const result=await axios.get(`/api/shop/list`);
        setShops(result.data);
    }
    useEffect(()=>{
        callShops();
    },[])

    if(!shops) return <h1>Loading....</h1>
  return (
    <div>
        <Table>
            <thead>
                <tr>
                    <td>상품코드</td>
                    <td>상품사진</td>
                    <td>상품이름</td>
                    <td>상품가격</td>
                    
                </tr>
            </thead>
        </Table>
        <tbody>
            {shops.map(shop=>
            <>
                <tr ket={shop.code}>
                    <td>{shop.code}</td>
                    <td><img src={shop.image} width={100}/> </td>
                    <td><Link to={`/shop/read/${shop.code}`}>{shop.title}</Link></td>
                    <td>{shop.price}</td>
                    <td colSpan={4}>
                        {parseTwoDigitYear(shop.content)}
                    </td>
                </tr>
            </>
            )}
                 
        </tbody>
    </div>
  )
}

export default ShopList