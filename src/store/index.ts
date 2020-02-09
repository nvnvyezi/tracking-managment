import { createStore } from 'redux'

import { loginState, loginReducer } from './login'

const store = createStore(loginReducer, loginState)

export default store
