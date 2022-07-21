import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {useSearchParams } from "react-router-dom";
import Preloader from "../../preloader/Preloader";
import { getFollowData } from "../../redux/profile-reducer";

import { getCount, getCurrentPageSelector, getFriendSelector } from "../../redux/profile-selector";
import UsersReducer, { getUsersData,postFollow,deleteFollow,toggleIsFetchingDis, setUsersDataInf} from "../../redux/users-reducer";
import { getIsFetchingSelector, getIsUsersSelector, getPageDataSelector, getTermSelector, getTotalCountSelector, getUsersSelector } from "../../redux/users-selector";
import Users from "./Users";

function UsersContainer (props){
    const users = useSelector(getUsersSelector)
    const totalCount = useSelector(getTotalCountSelector)
    const isUsers = useSelector(getIsUsersSelector)
    const isFetching = useSelector(getIsFetchingSelector)
    const {currentPage,count,term,frends} = useSelector(getPageDataSelector)
    ///const friend = useSelector(getFriendSelector)
    const dispatch = useDispatch()
    const setUsersDataInfDis = useCallback(
        (currentPage,count,term,friend)=>dispatch(setUsersDataInf(currentPage,count,term,friend)),
        [dispatch]
    )
    
    const effectTriggeredRef = isUsers   //спросить Возможно костыль, чтобы рендерилось 1 раз
    const useCustomSearchParams = () => {
        const [search, setSearch] = useSearchParams();
        const searchAsObject = Object.fromEntries(
          new URLSearchParams(search)
        );
        return [searchAsObject, setSearch];
      };
      const [search, setSearch] = useCustomSearchParams();
    

   useEffect(()=>{       
       let page = search.page || 1
       let count = search.count || 20
       let term = search.term || ''
       let friend = search.friend || 'false'
    props.getUsersData(page,count,term,friend)
    setUsersDataInfDis(Number(page),Number(count),term,friend)
    
   },[])
    useEffect(()=>{
        setSearch({page:String(currentPage),count:count,term:term,friend:frends})
        props.getUsersData(currentPage,count,term,frends)

    },[currentPage,term,frends])
    

    if(!effectTriggeredRef){
        return <Preloader />
    }else{
        return <Users 
        users={users}
        totalCount = {totalCount}
        getUsersData = {props.getUsersData}
        currentPage = {props.currentPage}
        count = {props.count}
        postFollow ={props.postFollow}
        deleteFollow = {props.deleteFollow}
        toggleIsFetchingDis = {props.toggleIsFetchingDis}
        isFetching = {isFetching}
        setUsersDataInfDis={setUsersDataInfDis}
        term={term}
        />
    }
    
}

let mapStateToProps = (state)=>{
    return (
        {
            currentPage:state.ProfileReducer.currentPage,
            count: state.ProfileReducer.count,
        })
}

export default connect(mapStateToProps,{getUsersData,getFollowData,postFollow,deleteFollow,toggleIsFetchingDis})(UsersContainer)