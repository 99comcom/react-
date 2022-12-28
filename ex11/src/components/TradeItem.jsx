import React from 'react'

const TradeItem = ({trade}) => {
  const {ano, tno, famount, tradeDate, type, aname} = trade;
  return (
    <tr>
      <td>{tno} ({aname})</td>
      <td>{tradeDate}</td>
      <td>{type}</td>
      <td>{famount}</td>
    </tr>
  )
}

export default TradeItem