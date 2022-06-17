import { createStore } from 'redux'
import rootReducer from './ind'

const store = createStore(rootReducer)

export default store