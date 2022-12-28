import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Table, Button } from 'react-bootstrap';
import ShopItem from './ShopItem';
import './Paging.css';
import Pagination from 'react-js-pagination';
import qs from 'qs';

const ShopList = ({location, history}) => {
  const search = qs.parse(location.search, {ignoreQueryPrefix:true});
  const page = !search.page ? 1: parseInt(search.page);

  const [shops, setShops] = useState([]);
  const [total, setTotal] = useState(0);
  const [chkItems, setChkItems] = useState([]);

  const callShops = async() => {
    const result=await axios.get(`/api/shop/list?page=${page}&num=4`);
    setShops(result.data.list);
    setTotal(result.data.total);
  }

  const onChangePage = (e) => {
    history.push(`/shop/list?page=${e}`);
  }

  const onAllCheck = (checked)=> {
    if(checked){
      const all=[];
      shops.forEach(shop=>all.push(shop.code));
      setChkItems(all);
    }else {
      setChkItems([]);
    }
  }

  const onSingleCheck = (code, checked)=>{
    if(checked){
      setChkItems(chkItems.concat(code));
    }else{
      setChkItems(chkItems.filter(item=>item!==code));
    }
  }

  const onSubmit = async()=>{
    for(let i=0; i<chkItems.length; i++){
      await axios.post(`/api/shop/addSale?code=${chkItems[i]}`);
    }
    alert('세일등록 성공!');
    setChkItems([]);
  }

  useEffect(()=>{
    callShops();
  }, [location]);

  if(!shops) return <h1>Loading......</h1>
  return (
    <div>
      <Button onClick={onSubmit}>세일상품등록</Button>
      <hr/>
      <Table>
        <thead>
          <tr>
            <td>
              <input type="checkbox" 
                checked={chkItems.length===shops.length ? true:false}
                onChange={(e)=>onAllCheck(e.target.checked)}/></td>
            <td>코드</td>
            <td>이미지</td>
            <td>상품이름</td>
            <td>가격</td>
          </tr>
        </thead>
        <tbody>
          {shops.map(shop=>
            <ShopItem 
              onSingleCheck={onSingleCheck}
              key={shop.code} shop={shop} chkItems={chkItems}/>
          )}
        </tbody>
      </Table>
      <Pagination
        activePage={ page }
        itemsCountPerPage={4}
        totalItemsCount={ total }
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={onChangePage} />
    </div>
  )
}

export default ShopList