import React from 'react'
import { Link, Route } from 'react-router-dom'
import Header from './Header'
import ShopInsert from './ShopInsert'
import ShopList from './ShopList'
import ShopRead from './ShopRead'
const ShopPage = () => {
  return (
    <div>
      <div className='sub_menu'>
        <Link to="/shop/insert">상품등록</Link>
        <Link to="/shop/list">상품목록</Link>
      </div>
      <Route path='/shop/list' component={ShopList} />
      <Route path='/shop/insert' component={ShopInsert} />
      <Route path='/shop/read/:code' component={ShopRead} />
    </div>
  )
}

export default ShopPage