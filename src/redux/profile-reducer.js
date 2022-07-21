import { profileAPI, usersAPI } from "../api/api";
import { isAuthCreator, setIsLoadingSetAuth } from "./auth-reducer";
import { termCreator } from "./users-reducer";
import facebook from '../img/logo_social/facebook.svg'
import youtube from '../img/logo_social/youtube.svg'
import website from '../img/logo_social/website.svg'
import vk from '../img/logo_social/vk.svg'
import twitter from '../img/logo_social/twitter.svg'
import instagram from '../img/logo_social/instagram.svg'
import github from '../img/logo_social/github.svg'
import mainLink from '../img/logo_social/mainLink.svg'

let SAVE_STATUS = 'SAVE_STATUS'
let SET_PROFILE = 'SET_PROFILE'
let FOLLOW = 'FOLLOW'
let G_FOLLOW = 'G_FOLLOW'
let SEND_STATUS = 'SEND_STATUS'
let IS_PROFILE_LOAD = 'IS_PROFILE_LOAD'
let SET_FOTO_FILE = 'SET_FOTO_FILE'
const SET_PAGE_USER_BUTTON = 'SET_PAGE_USER_BUTTON'
const SET_USERS_INF_DATA = 'SET_USERS_INF_DATA'
const SET_ADMIN_PROFILE = 'SET_ADMIN_PROFILE'
const VISIBLE_FORM_ACTIVE = 'VISIBLE_FORM_ACTIVE'
const SEND_FORM_TIME = 'SEND_FORM_TIME'
const ERROR_FORM_END= 'ERROR_FORM_END'


let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    status: '',
    profile: null,
    isProfile:false,
    isProfileLoad:false,
    currentPage :1,
    count :20,
    admin_profile:null,
    followFrend: false,
    following:null,
    social_icons:{
        'facebook':facebook,
        'youtube':youtube,
        'website':website,
        'vk':vk,
        'twitter':twitter,
        'instagram':instagram,
        'github':github,
        'mainLink':mainLink
    },
    visibleFormActive:true,
    sendFormTime: false,
    errorFormEnd:null
};

///selector: pageUserButtonCreator,setUsersDataInfCreator  currentPage
///reducer: setUsersDataInf,setPageUserButton
///selector:setUsersDataInfCreator, count
///reducer:setUsersDataInf
///

const ProfileReducer = (state=initialState,action)=>{
    switch(action.type){
         case SAVE_STATUS:
             return{
                ...state,
                status:action.newStatus
             }
           case SET_PROFILE: 
               return{
                   ...state,
                profile:action.setProfile,
                isProfile:action.isProfile
               }
            case SET_ADMIN_PROFILE:
                return{
                    ...state,
                    admin_profile:{...state.profile}
                }
           case SET_FOTO_FILE:
               return {
                   ...state,
                   profile:{...state.profile,photos:action.foto}
               }
            case SET_PAGE_USER_BUTTON:
                return {
                    ...state,
                    currentPage:action.currentPage,       
                }
            case SET_USERS_INF_DATA:
                return{
                    ...state,
                    currentPage:action.currentPage,
                    count:action.count,
                    followFrend:action.followFrend
                }
            case VISIBLE_FORM_ACTIVE:
                return{
                    ...state,
                    visibleFormActive:action.visibleFormActive
                }
            case SEND_FORM_TIME:
                return{
                    ...state,
                    sendFormTime:action.sendFormTime
                }
            case ERROR_FORM_END:
                return{
                    ...state,
                    errorFormEnd:action.errorFormEnd
                }
        default: return state
    }
}

export const saveStatusCreator = (newStatus)=>({type:SAVE_STATUS,newStatus})
export const isProfileLoadCreator = (isProfileLoad)=>({type:IS_PROFILE_LOAD,isProfileLoad})
export const saveProfileCreator = (setProfile,isProfile)=>({type:SET_PROFILE, setProfile,isProfile})
export const gFollowCreator = ()=>({type:G_FOLLOW})
export const followCreatore = ()=>({type:FOLLOW})
export const sendStatusCreatore = ()=>({type:SEND_STATUS})
export const setFotoFile = (foto) =>({type:SET_FOTO_FILE,foto})
export const errorFormEndCreatore = (errorFormEnd)=>({type:ERROR_FORM_END,errorFormEnd})

export const changeVisbleFormActiveCreatore = (visibleFormActive)=>({type:VISIBLE_FORM_ACTIVE,visibleFormActive})

export const setAdminProfileCreatore=()=>({
type:SET_ADMIN_PROFILE
})
export const sendFormTimeCreatore = (sendFormTime)=>({type:SEND_FORM_TIME,sendFormTime})

export const   nuleErrorFormEnd = (errorFormEnd)=>(dispatch)=>{
    dispatch(errorFormEndCreatore(errorFormEnd))
}
export const  changeVisbleFormActive = (visibleFormActive)=>(dispatch)=>{
    dispatch(changeVisbleFormActiveCreatore(visibleFormActive))
}

export const AdminProfile = ()=>async(dispatch)=>{
    dispatch(setAdminProfileCreatore())
    // dispatch(setIsLoadingSetAuth(true,true,false))
}
export const putProfile = (profile)=>async(dispatch)=>{
    dispatch(sendFormTimeCreatore(true))

    let response = await profileAPI.putProfile(profile)
    if(response.status==200){
        dispatch(getProfileData(profile.userId))
        dispatch(sendFormTimeCreatore(false))
        console.log(profile.userId)
    }else{
        console.log(response.data.messages)
        dispatch(sendFormTimeCreatore(false))
    }
    {console.log(response)}
    if(response.data.resultCode==1){
        const ks = response.data.messages.map((u)=>{
            u=(u.match(/Contacts->([A-Z][a-z]*)/))
            return u=u[1]
        })
        dispatch(errorFormEndCreatore(ks))
    }
}

export const sendStatus = (newStatus)=> async(dispatch)=>{
    let response = await profileAPI.putStatus(newStatus)
    dispatch(saveStatusCreator(newStatus))
}
export const getStatus =(userId)=> async(dispatch)=>{
    let response = await profileAPI.getStatus(userId)
    dispatch(saveStatusCreator(response.data))
}

export const getFollowData = (userId)=> async(dispatch)=>{
    let response = await profileAPI.getFollow(userId)  
}

export const putPhotoFile = (photoFile) => async(dispatch)=>{
    let response = await profileAPI.postProfilePhoto(photoFile) 
    if(response.data.resultCode==0){
        dispatch(setFotoFile(response.data.data.photos))
    }
}
export const deleteAuthUser = () =>(dispatch)=>{
    dispatch(saveProfileCreator(null,false))
}

export const getProfileData = (userId)=> async(dispatch)=>{
    let response = await profileAPI.getProfile(userId)
    if(response.status == 200){
        isProfileLoadCreator(true)
        dispatch(saveProfileCreator(response.data,true))
        dispatch(setAdminProfileCreatore())
        dispatch(setIsLoadingSetAuth(true,true,false))
        isProfileLoadCreator(false)
    }
}
export const getProfileData2 = (userId,isProf=true)=> async(dispatch)=>{
    let response = await profileAPI.getProfile(userId)
    if(response.status == 200){
        isProfileLoadCreator(true)
        dispatch(saveProfileCreator(response.data,isProf))
        isProfileLoadCreator(false)
    }
}
// export const getAdminProfileCreatore = ()=>async(dispatch)=>{
//     let response = await profileAPI.getProfile(userId)

// }
export default ProfileReducer