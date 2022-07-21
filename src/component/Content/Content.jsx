import React from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Profile from "../Profile/Profile";
import Users from "../Users/Users";
import styles from "./Content.module.css";
import { getAuthUserData } from '../../redux/auth-reducer'
import UsersContainer from "../Users/UsersContainer";
import ProfileContainer from "../Profile/ProfileContainer";
import Login from "../../Login/Login";
import Posts from "../Profile/Posts/Posts";
import { useEffect } from "react";


function Content2(props) {  
  const navigate=useNavigate()
  useEffect(()=>{
    navigate('/Login')
  },[])
return (
    <div className={styles.body}>
      <Routes>
        <Route path="Profile/:id" element={<ProfileContainer/>}></Route>
        <Route path="Users" element={<UsersContainer />}></Route>
        <Route path="News" element={<News />}></Route>
        <Route path="Post" element={<Posts />}></Route>
        <Route path="Login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}
function News() {
  return <div>News</div>;
}
function Post() {
  return <div>Post</div>;
}
export default Content2;
