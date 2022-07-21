import { authAPI } from "../api/api"
import { AdminProfile } from "./profile-reducer"
const  IS_AUTH_LOG = 'IS_AUTH_LOG'
const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const DELET_LOGIN = 'DELET_LOGIN'
const INITIALIATION_USER_AUTH = 'INITIALIATION_USER_AUTH'
const SET_USER_ID='SET_USER_ID'
const IS_AUTH ='IS_AUTH'
const IS_LOADING_SET_AUTH ='IS_LOADING_SET_AUTH'
const SAVE_CAPTCHA='SAVE_CAPTCHA'
let initialState = {
    id:null,
    email:null,
    login:null,
    isAuth:false,
    isAuthLoading:false,
    isAuthLog: false,
    isError:false,
    isLoadingSetAuth:false,
    isError2:false,
    captcha:''
}

 const AuthReducer = (state = initialState,action)=>{
    switch(action.type){
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case IS_AUTH_LOG:
            return{
                ...state,
                isAuthLog:action.isAuthLog,
                isError:action.isError
            }
        case INITIALIATION_USER_AUTH:
            return{
                ...state,
                isAuthLoading:action.isAuthLoading
            }
        case SET_USER_ID:
            return{
                ...state,
                id:action.id
            }
        case IS_AUTH:
            return{
                ...state,
                isAuth:action.isAuth
            }   
           case IS_LOADING_SET_AUTH:
            return{
                ...state,
                isLoadingSetAuth:action.isLoadingSetAuth,
                isAuthLog:action.isAuthLog,
                isError:action.isError,
                isError2:action.isError2
            }   
        case SAVE_CAPTCHA:
            return{
                ...state,
                captcha:action.captcha
            }
        default: return state
    }
}
export const setCaptchaCreatore = (captcha)=>({
    type:SAVE_CAPTCHA,
    captcha
})
export const setIsLoadingSetAuth = (isLoadingSetAuth,isAuthLog,isError,isError2=false)=>({
    type:IS_LOADING_SET_AUTH,
    isLoadingSetAuth,
    isAuthLog,
    isError,
    isError2
})

export const setIsAuth = (captcha)=>({
    type:SAVE_CAPTCHA,
    captcha
})
export const setUserId = (id)=>({
    type:SET_USER_ID,
    id
})
export const initializationUserAuthCreator = (isAuthLoading)=>({
    type:INITIALIATION_USER_AUTH,
    isAuthLoading
})
export const initializationUserAuth = (isAuthLoading) =>(dispatch)=>{
    dispatch(initializationUserAuthCreator(isAuthLoading))
}

export const setAuthUserDataCreator = (id, email, login,isAuth)=>({
    type: SET_AUTH_USER_DATA,
    payload:
        {id, email, login,isAuth}
})
export const isAuthCreator = (isAuthLog,isError)=>({
    type: IS_AUTH_LOG,
    isAuthLog,
    isError
})
export const deleteLoginCreator = ()=>({
    type:DELET_LOGIN
})


export const setCaptcha = (captcha)=>async(dispatch)=>{
    dispatch(setCaptchaCreatore(captcha))
}

export const deleteLogin = ()=>async(dispatch)=>{
    let response = await authAPI.deleteLogin()
    if(response.data.resultCode == 0){
        dispatch(setAuthUserDataCreator(null,null,null,false))
        dispatch(setIsLoadingSetAuth(false,false,false,false))
        dispatch(AdminProfile())
    }
}

export const postLogin = (email,password,rememberMe,captcha)=> async (dispatch)=>{    
    let response = await authAPI.postLogin(email,password,rememberMe,captcha)
    if(response.data.resultCode==0){
        dispatch(setUserId(response.data.data.userId))
        dispatch(setIsLoadingSetAuth(false,false,false))
        dispatch(setCaptcha('')) 
    }
    if(response.data.resultCode==10){
        let k = await authAPI.getCaptcha()
        if(k.status==200){
            dispatch(setCaptcha(k.data.url))
            //k.data.url
        }
       
    }
}

export const getAuthUserData = () =>async(dispatch)=>{
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserDataCreator(id, email, login,true));
        dispatch(setIsLoadingSetAuth(true,false,false))
    }else{
        dispatch(setIsLoadingSetAuth(false,false,true))
    }
}

export function Init (){
    // console.log('111')
    //  getAuthUserData(true)
    // console.log('222222')
    // await getAuthUserData(true)
    // console.log('333')
    
}

export default AuthReducer

