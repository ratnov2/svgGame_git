import { usersAPI } from "../api/api"
let SET_FOLLOW = 'SET_FOLLOW'
const SET_USERS = 'SET_USERS'
const DELETE_FOLLOW = 'DELETE_FOLLOW'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const IS_FETCHING_USER_DATA ='IS_FETCHING_USER_DATA'
const CURRENT_COUNT_CREATOR = 'CURRENT_COUNT_CREATOR'
const CURRENT_USER_COUNT = 'CURRENT_USER_COUNT'

const SET_PAGE_USER_BUTTON = 'SET_PAGE_USER_BUTTON'
const SET_USERS_INF_DATA = 'SET_USERS_INF_DATA'
const initialState ={
    users:[
        {id: 1, user: 'Anton', subscribe: false},
        {id: 2, user: 'Ratnov', subscribe: true},
        {id: 3, user: 'Masha', subscribe: true},
        {id: 4, user: 'Sasha', subscribe: true}
    ],
    isUsers:false,
    totalCount: null,
    term:'',
    photos:null,
    profile:null,
    isFetching: [],
    isFetchingUserData: false,
    currentCount: 0,
    currentUserCount:1,
    pageData:{
        currentPage:1,
        count:20,
        term:'',
        frends:false
    }
}

const UsersReducer = (state= initialState,action)=>{
    switch(action.type){
        
        case SET_USERS:
            return{
                ...state,
                users:[...action.users.items],//fvvekjen!!!!!!!!!
                isUsers:action.isUsers,
                totalCount:action.totalCount,
                term:action.term
            }
            case SET_FOLLOW:
                return{
                    ...state,
                    users:state.users.map((k)=>{if(k.id==action.userId){ return {...k,followed:true}} else return k})
                }
            case DELETE_FOLLOW:
                return{
                    ...state,
                    users:state.users.map((k)=>{if(k.id==action.userId){ return {...k,followed:false}} else return k})
                }
            case TOGGLE_IS_FETCHING:
                return {
                    ...state,
                    isFetching: action.isFetching 
                    ? [...state.isFetching,action.userId]
                    : state.isFetching.filter((id)=> id!=action.userId)
                }
            case IS_FETCHING_USER_DATA:
                return {
                    ...state,
                    isFetchingUserData: action.isFetching
                }
            case CURRENT_COUNT_CREATOR:
                return {
                    ...state,
                    currentCount:action.currentCount
                }
            case CURRENT_USER_COUNT:
                return{
                    ...state,
                    currentUserCount:action.userCount
                }
            case 'termCr':
                return{
                    ...state,
                    term:action.term
                }

            case SET_PAGE_USER_BUTTON:
                return {
                    ...state,
                    pageData:{...state.pageData,currentPage:action.currentPage}       
                }
            case SET_USERS_INF_DATA:
                return{
                    ...state,
                    pageData:{...state.pageData,
                        currentPage:action.currentPage,
                        count:action.count,
                        term:action.term,
                        frends:action.followFrend}
                }
        default: return state
    }
}
export const setUsersDataInf=(currentPage=1,count=20,term='',followFrend=false)=>(dispatch)=>{
    dispatch(setUsersDataInfCreator(currentPage,count,term,followFrend))
}

export const setPageUserButton=(currentPage)=>(dispatch)=>{
    dispatch(pageUserButtonCreator(currentPage))
}


export const pageUserButtonCreator=(currentPage)=>({type:SET_PAGE_USER_BUTTON,currentPage})
export const setUsersDataInfCreator=(currentPage,count,term,followFrend)=>({type:SET_USERS_INF_DATA,currentPage,count,term,followFrend})


export const setFollowCreator =(userId)=> ({type:SET_FOLLOW,userId,isFollow:true})
export const deleteFollowCreator= (userId)=>({type:DELETE_FOLLOW, userId,isFollow:false})
export const toggleIsFetchingCreator = (userId,isFetching)=>({type:TOGGLE_IS_FETCHING,userId,isFetching})
export const isFetchingUserDataCreator = (isFetching)=>({type:IS_FETCHING_USER_DATA,isFetching})
export const currentCountCreator = (currentCount)=>({type:CURRENT_COUNT_CREATOR,currentCount})
export const currentUserCountCreator = (userCount)=>({type:CURRENT_USER_COUNT,userCount})
export const termCreator=(term)=>({type:'termCr',term})

export const UsersActionCreator = (users,isUsers,totalCount,term)=>({
    type: SET_USERS,
    users:users,
    isUsers,
    totalCount,
    term
})

export const toggleIsFetchingDis = (userId,isFetching)=>(dispatch)=>{
    dispatch(toggleIsFetchingCreator(userId,isFetching))
}
export const setCurrentUserCount = (userCount)=>(dispatch)=>{
    
    dispatch(currentUserCountCreator(userCount))
}

export const setCurrentCount = (currentCount)=>(dispatch)=>{
    console.log(currentCount)
    dispatch(currentCountCreator(currentCount))
}

export const getUsersData =(page,count,term,friend)=> async (dispatch)=>{
    
    let response = await usersAPI.getUsers(page,count,term,friend)
    if(response.status === 200){
        dispatch(isFetchingUserDataCreator(true))
        dispatch(UsersActionCreator(response.data,true,response.data.totalCount,term))
        setTimeout(() => {
            dispatch(isFetchingUserDataCreator(false))
          }, 300)
        
    }
}

export const postFollow = (userId)=> async(dispatch)=>{
    let response = await usersAPI.postFollow(userId)
    if(response.data.resultCode==0){
        dispatch(setFollowCreator(userId))

        dispatch(toggleIsFetchingDis(userId,false))
    }
}
export const deleteFollow = (userId) =>async(dispatch)=>{
    let response = await usersAPI.deleteFollow(userId)
    if(response.data.resultCode == 0){
        dispatch(deleteFollowCreator(userId))
        dispatch(toggleIsFetchingDis(userId,false))
    }
}
export default UsersReducer