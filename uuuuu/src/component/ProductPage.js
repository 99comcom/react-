import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HeaderPage from './HeaderPage'
import ProductInsert from './ProductInsert'
import ProductList from './ProductList'

const ProductPage = () => {
  return (
    <div>
        <HeaderPage/>
        <Switch>
        <Route path="/product/list" component={ProductList}/>
        <Route path="/product/insert" component={ProductInsert}/>
        </Switch>

    </div>
  )
}

export default ProductPage