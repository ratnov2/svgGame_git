export const getCurrentPageSelector = (state)=>{
    return state.ProfileReducer.currentPage
}
export const getFriendSelector =(state)=>{
    return state.ProfileReducer.followFrend
}
export const getCount = (state)=>{
    return state.ProfileReducer.count
}
export const getProfileSelector = (state)=>{
    return state.ProfileReducer.profile
}
export const getStatusSelector = (state)=>{
    return state.ProfileReducer.status
}
export const getIsProfileSelector = (state)=>{
    return state.ProfileReducer.isProfile
}

// export const getProfileDataUserNoutSelector = (state)=>{
//     return state.
// }

export const getUserIdSelector = (state)=>{
    return state.AuthReducer.id
}
export const getSocial_icons = (state)=>{
    return state.ProfileReducer.social_icons
}
export const getVisibleFormActive = (state)=>{
    return state.ProfileReducer.visibleFormActive
}
export const getSendFormTime = (state)=>{
    return state.ProfileReducer.sendFormTime
}
export const getErrorFormEnd = (state)=>{
    return state.ProfileReducer.errorFormEnd
}

