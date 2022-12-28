import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HeaderPage from './HeaderPage'
import UserInsert from './UserInsert'
import UserList from './UserList'

const UserPage = () => {
  return (
    <div>
        <HeaderPage/>
        <Switch>
        <Route path="/user/list" component={UserList}/>
        <Route path="/user/insert" component={UserInsert}/>
        </Switch>
    </div>
  )
}

export default UserPage