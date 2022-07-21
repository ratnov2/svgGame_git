export const getIsFetchingUserDataSelector = (state)=>{
    return state.UsersReducer.isFetchingUserData
}
export const getCurrentCount = (state)=>{
    return state.UsersReducer.currentCount
}
export const getCurrentUserCount = (state)=>{
    return state.UsersReducer.currentUserCount
}
export const getTermSelector = (state)=>{
    return state.UsersReducer.term
}
export const  getUsersSelector = (state)=>{
    return state.UsersReducer.users
}
export const  getTotalCountSelector = (state)=>{
    return state.UsersReducer.totalCount
}
export const  getIsUsersSelector = (state)=>{
    return state.UsersReducer.isUsers
}
export const  getIsFetchingSelector = (state)=>{
    return state.UsersReducer.isFetching
}

export const getPageDataSelector = (state)=>{
    return state.UsersReducer.pageData
}
