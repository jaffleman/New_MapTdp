import { createStore } from 'redux'
import monStore from './reducers/monStore'

export default createStore(monStore,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
