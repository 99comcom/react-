import React from 'react'
import { Link, Route } from 'react-router-dom'
import ShopList from './ShopList'
import ShopRead from './ShopRead'

const ShopPage = () => {
  return (
    <div>
        <div className='main_menu'>
            <Link to="/shop/list">상품목록</Link>
        </div>
        <hr/>
        <Route path="/shop/list" component={ShopList}/>
        <Route path="/shop/read/:code" component={ShopRead}/>
        
    </div>
  )
}

export default ShopPage