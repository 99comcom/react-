import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Table } from 'react-bootstrap';
import ShopItem from './ShopItem';
import Pagination from 'react-js-pagination';
import './Pagination.css'
import qs from 'qs';

const ShopList = ({ location, history }) => {
  const search = qs.parse(location.search, { ignoreQueryPrefix: true });
  const page = parseInt(search.page) || 1; //parseInt안붙이면 page가 active가 안됨. url은 전부
  //string인데 react-js-pagination의 activePage는 number로 붙어야 하니까 인식이 안되는 것. 그래서 parseInt해줌.
  const num = 5;
  const [shops, setShops] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkItems, setCheckItems] = useState([]);
  const callShop = async () => {
    const result = await axios.get(`/api/shop/list?page=${page}&num=${num}`);
    setShops(result.data.list);
    setTotal(result.data.total);
  }


  const onAllCheck = (checked) => {
    if (checked) {
      const all = [];
      shops.forEach(shop => all.push(shop.code))
      setCheckItems(all);
    /*   alert(checkItems); */
    } else {
      setCheckItems([]);
    }
  }

  const onSingleCheck = (checked, code)=>{
  checked ? setCheckItems(checkItems.concat(code)) : setCheckItems(checkItems.filter(item=>item!==code))
  }

  const onSubmit=async()=>{
    for(let i=0;i<checkItems.length;i++){
      await axios.post(`/api/shop/addSale?code=${checkItems[i]}`);
    }
    alert('세일등록성공')
    setCheckItems([]);
  }

  useEffect(() => {
    callShop();
  }, [page])

  //setPage로 가져가면 page를 계속 가져갈 수가 없어서 read를 하고 목록으로 돌아가면 페이지가 1로 돌아가버림.
  //page 3번을 읽고 있었는데 3페이지로 나오려면 아래와 같이 해줘야 함. page를 state변수로 선언하면 안됨.
  //(e)=>setPage(e)라고 하는 건 위와 같은 편의성을 증진할 수 없음.
  const onChangePage = (e) => {
    history.push(`/shop/list?page=${e}`)
  }

  if (!shops) <h1>데이터를 불러오는 중입니다.</h1>
  return (
    <div>
      <Button onClick={onSubmit}>세일상품등록</Button>
      <hr />
      <Table>
        <thead>
          <tr>
            {/* value가 on이라서 value라고 쓰면 안되고 checked로 써야함. */}
            <td><input type='checkbox'
                      checked={checkItems.length === shops.length ? true: false} 
                      onChange={(e) => onAllCheck(e.target.checked)} /></td>
            <td>코드</td>
            <td>이미지</td>
            <td>상품이름</td>
            <td>가격</td>
          </tr>
        </thead>
        <tbody>

          {/* <tr> 여기 tr td 추가하면 안됨. 모양이 이상해짐. Item에서 어차피 tr td를 선언해줬기 때문에 그럼*/}
          {/* <td> */}
          {shops.map(shop =>
            <ShopItem
              key={shop.code}
              checkItems={checkItems}
              onSingleCheck={onSingleCheck}
              shop={shop} />)}
          {/* </td> */}
          {/* </tr> */}
        </tbody>
        <Pagination
          activePage={page}
          itemsCountPerPage={num}
          totalItemsCount={total}
          pageRangeDisplayed={10}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(e) => onChangePage(e)}
        />
      </Table>
    </div>

  )
}

export default ShopList