import { useCallback, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";
import { getIsAuth } from "../../redux/auth-selector";
import { getProfileData2, getStatus, deleteAuthUser, putPhotoFile, putProfile, sendStatus, AdminProfile, changeVisbleFormActive } from "../../redux/profile-reducer";
import { getIsProfileSelector, getProfileSelector, getSocial_icons, getStatusSelector, getUserIdSelector, getVisibleFormActive } from "../../redux/profile-selector";
import Profile from "./Profile";

function ProfileContainer(props){
    const profile = useSelector(getProfileSelector)
    const status = useSelector(getStatusSelector)
    const isProfile = useSelector(getIsProfileSelector)
    const userId = useSelector(getUserIdSelector)
    const social_icons = useSelector(getSocial_icons)
    const visibleFormActive = useSelector(getVisibleFormActive)

    const dispatch = useDispatch()
    const getProfileDataUserNoutSelector = useCallback(
        (userId) => dispatch(getProfileData2(userId)),
        [dispatch]
      )
    const sendStatusServ = useCallback(
        (newStatus) => dispatch(sendStatus(newStatus)),
        [dispatch]
      )  
    const getStatusServ = useCallback(
        (userId) => dispatch(getStatus(userId)),
        [dispatch]
      )  
    const putProfileSend = useCallback(
        (profile) => dispatch(putProfile(profile)),
        [dispatch]
    )
    const deleteAuthUserDis = useCallback(
        ()=>dispatch(deleteAuthUser()),
        [dispatch]
    )
    const changeVisbleFormActiveDis = useCallback(
        (visibleFormActive)=>dispatch(changeVisbleFormActive(visibleFormActive)),
        [dispatch]
    )

    
    let navigate = useNavigate()
    let userUrl_Auth = useParams().id
    let gg=useParams().id

    useEffect(()=>{
        if(!userUrl_Auth){    //из URL
            userUrl_Auth = userId
            if(!userUrl_Auth){
                navigate('/Login')
            }   
        } 
        if(userUrl_Auth) {
            getStatusServ(userUrl_Auth)
            getProfileDataUserNoutSelector(userUrl_Auth)
        }
    },[userUrl_Auth]) 
    
    useEffect(()=>{
        if(!userId)
        {return ()=>{deleteAuthUserDis()}}
    },[])
    // useEffect(()=>{
    //     if(userId===profile.userId)
    //     AdminProfileDis()
    // },[profile])
    

    if(!userId){
        if(!isProfile){return <div>ffefefeef33</div>}
    }


    if(gg &&userId){
        if(userId == profile.userId){return <div>Loading222</div>}       
    }
     
        return <Profile 
            profile = {profile}
            status = {status}
            sendStatus = {sendStatusServ}
            putPhotoFile ={props.putPhotoFile}
            putProfile={putProfileSend}
            userId = {userId}
            social_icons = {social_icons}
            visibleFormActive= {visibleFormActive}
            changeVisbleFormActive={changeVisbleFormActiveDis}
        />
    
    
}
export default compose(
    connect(null,{putPhotoFile})
    (ProfileContainer)
    )