import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormProfile from "../validate/FormProfile";
import Posts from "./Posts/Posts";
import Status from "./Status/Status";
import UserPhotoInf from "./UserPhotoInf/UserPhotoInf";
//import facebook from '../../img/logo_social/facebook.svg'
import styles from './Profile.module.css'
import { useParams } from "react-router-dom";
function Profile(props){
  let userId = useParams().id
  useEffect(() => {
    return () => {
      props.changeVisbleFormActive(true);
    };
  },[]);
    return(
      <div>
        <UserPhotoInf profile = {props.profile} putPhotoFile={props.putPhotoFile} isAuth={props.isAuth} status= {props.status} sendStatus={props.sendStatus} userId={props.userId} visibleFormActive={props.visibleFormActive} changeVisbleFormActive={props.changeVisbleFormActive}/>
      <figcaption className={styles.icon_social}>
        {/* {props.social_icons.map((u)=><p>KJKJ</p>)} */}
      {Object.keys(props.profile.contacts)
        .map((u)=>
          <div key={u}> 
            {props.profile.contacts[u]!=null
              ?<a className={styles.icon_social_active} href={props.profile.contacts[u]}><img src={props.social_icons[u]} alt="" /></a> 
              : <a className={styles.icon_social_inActive} href={props.profile.contacts[u]}><img src={props.social_icons[u]} alt="" /></a> }
          </div>
            )}
          <div className={styles.buttonFormVisible}>
            {!userId?
            props.visibleFormActive 
              ? <Button type="primary" onClick={()=>props.changeVisbleFormActive(false)}>Изменить</Button>
              :<Button type="primary" onClick={()=>props.changeVisbleFormActive(true)}>Отменить</Button>
              :''
            }
          </div>
      </figcaption> 
      {props.visibleFormActive ? ''
          :<div>
            <FormProfile changeVisbleFormActive={props.changeVisbleFormActive}/>
          </div>}
          
      </div>
    )
  }

export default Profile