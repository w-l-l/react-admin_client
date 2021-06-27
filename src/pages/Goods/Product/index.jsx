import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import Detail from './Detail'

export default class Product extends Component {
  render () {
    return (
      <Switch>
        <Route path='/goods/product' exact component={Home} />
        <Route path='/goods/product/detail' component={Detail} />
        <Redirect to='/goods/product' />
      </Switch>
    )
  }
}
