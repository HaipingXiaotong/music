import { createStore } from 'redux'
import reducers from './reducers'
// 定义初始化状态
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store