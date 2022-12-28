import React from 'react'
import { Link } from 'react-router-dom';

const ShopItem = ({shop, chkItems, onSingleCheck}) => {
  const {code, image, title, price} = shop;
  return (
    <tr>
      <td>
        <input 
          onChange={(e)=>onSingleCheck(code,e.target.checked)}
          checked={chkItems.includes(code) ? true: false}
          type="checkbox"/>
      </td>
      <td>{code}</td>
      <td><img src={image} width={70}/></td>
      <td>
        <Link to={`/shop/read/${code}`}>{title}</Link>
      </td>
      <td>{price}</td>
    </tr>
  )
}

export default ShopItem