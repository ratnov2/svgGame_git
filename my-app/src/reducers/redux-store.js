import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import valueBeginReducer from './valueBeginReducer'

let reducers = combineReducers({
   valueBeginReducer,
   valueBeginReducer
})

// let store = createStore(reducers)
let store = createStore(
    reducers,
    compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
window.store = store;

export default store