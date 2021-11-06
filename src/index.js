import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'

import { getUser } from '@utils/localStorage'
import memory from '@utils/memory'
import store from '@redux/store'

// 读取用户信息到内存
const user = getUser()
memory.user = user

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))
