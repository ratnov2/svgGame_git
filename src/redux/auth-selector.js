export const getIsAuth = (state)=>{
    return state.AuthReducer.isAuth
}
export const getIsError = (state)=>{
    return state.AuthReducer.isError
}
export const getCaptcha= (state)=>{
    return state.AuthReducer.captcha
}
