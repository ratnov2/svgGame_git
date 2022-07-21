import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import ProfileReducer from './profile-reducer'
import AuthReducer from './auth-reducer'
import UsersReducer from './users-reducer'
import thunk from 'redux-thunk'
import ChatReducer from './chat-reducer'


let reducers = combineReducers({
    ProfileReducer:ProfileReducer,
    AuthReducer:AuthReducer,
    UsersReducer,
    chat:ChatReducer
})

let store = createStore(
    reducers,
    compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
window.store = store;

export default store