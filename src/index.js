import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { getUser } from '@utils/localStorage'
import memory from '@utils/memory'

// 读取用户信息到内存
const user = getUser()
memory.user = user

ReactDOM.render(<App />, document.getElementById('root'))
