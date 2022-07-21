import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu,Button, Radio, Spin  } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Posts from "./component/Profile/Posts/Posts";
import ProfileContainer from "./component/Profile/ProfileContainer";
import UsersContainer from "./component/Users/UsersContainer";
import Login from "./Login/Login";         
import { getProfileData , AdminProfile,nuleErrorFormEnd} from './redux/profile-reducer';
import { getUsersData } from './redux/users-reducer';
import './test.css';           
                                                                                                                                 
import { getAuthUserData,deleteLogin} from "./redux/auth-reducer";
import Login2 from './component/validate/validate';
import Dialogs from './component/Dialogs/Dialogs';
import Test from './component/Dialogs/Test';




const { Header, Content, Footer, Sider } = Layout;

function App(props) {
  
  const [errorForm,changeErrorForm]= useState(false)

useEffect(()=>{
  if(!props.isLoadingSetAuth){
    props.getAuthUserData()
  }
  if(props.isLoadingSetAuth){
    props.getProfileData(props.id)
  
  }
},[props.isLoadingSetAuth,props.isError])

  if(!props.isAuthLog && !props.isError){
    return <div>Loading</div>
  }
  
  
  return ( 
    <Layout hasSider>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to = {`/Profile/`}>Profile</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
        <Link to = '/Users'>Users</Link>
        </Menu.Item> 
        <Menu.Item key="3" icon={<UploadOutlined />}>
        <Link to = '/Dialogs'>Dialogs</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<BarChartOutlined />}>
          nav 4
        </Menu.Item>
        <Menu.Item key="5" icon={<CloudOutlined />}>
          nav 5
        </Menu.Item>
        <Menu.Item key="6" icon={<AppstoreOutlined />}>
          nav 6
        </Menu.Item>
        <Menu.Item key="7" icon={<TeamOutlined />}>
          nav 7
        </Menu.Item>
        <Menu.Item key="8" icon={<ShopOutlined />}>
          nav 8
        </Menu.Item>   
      </Menu>
      {props.errorFormEnd==null 
          ? ''
          :<div className='errorFormEnd'>
          {props.errorFormEnd.map((u,i)=>{
            // let i = 0
            // i++
            return<div key={i}>{u}</div>
          })
          }
          <Button onClick={()=>props.nuleErrorFormEnd(null)} >Скрыть</Button>
        </div>
        }
      
    </Sider>
    
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      {props.isLoadingSetAuth 
      ?<Header className="site-layout-background site-layout-background-ava">
        <div className='HeaderDiv'>
          <div className="ava-inform-reduct">
            <Link to = '/Profile/'>
              <img className='v1' src={props.admin_profile.photos.small}></img>
            </Link>
          <div className='list-profile'>
          <Link to = '/Profile/'>
              <div className='ava-inform-reduct-inside'>
                <img src={props.admin_profile.photos.small}></img>
                <p>{props.admin_profile.fullName}</p>
              </div>
              </Link>
              <div>Тема</div>
              <div>Помощь</div>
              <div onClick={()=>props.deleteLogin()}>Выход</div>
              </div>
          </div>
          <div className='loadForm'>
            <Spin spinning={props.sendFormTime} delay={1000}>
              {/* {container} */}
            </Spin>
          </div>
        </div>
      </Header>
    :
    <Header className="site-layout-background">
        <Radio.Button value="large"><Link to = '/Login'>Войти</Link></Radio.Button>
      </Header>
    }
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
          <div>
          <Routes>
            <Route path='/Profile/:id' element={<ProfileContainer/>}></Route> 
            <Route path="/Profile" element={<ProfileContainer/>}></Route> 
            <Route path="/Profile" element={<News />}></Route>
            <Route path="/Users" element={<UsersContainer />}></Route> 
            <Route path="/Dialogs" element={<Test />}></Route>
            <Route path="Post" element={<Posts />}></Route>    
            <Route path="Login" element={<Login2/>}></Route>
          </Routes>
        </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
  );
}

const mapStateToPtops = (state)=>{
  return(
    {isAuth:state.AuthReducer.isAuth,
      profileInfo:state.AuthReducer,
      isAuthLog:state.AuthReducer.isAuthLog,
      isError:state.AuthReducer.isError,
      profile:state.ProfileReducer.profile,
      id:state.AuthReducer.id,
      isError:state.AuthReducer.isError,
      isAuthLoading:state.AuthReducer.isAuthLoading,
      isLoadingSetAuth:state.AuthReducer.isLoadingSetAuth,
      admin_profile:state.ProfileReducer.admin_profile,
      sendFormTime:state.ProfileReducer.sendFormTime,
      errorFormEnd:state.ProfileReducer.errorFormEnd,
     
    }
  )
}
const mapDispatchToPtops = (dispatch)=>({

})
export default connect(mapStateToPtops,{getAuthUserData,getUsersData,getProfileData,AdminProfile,nuleErrorFormEnd,deleteLogin})(App)


    
                 
function News() {
  return <div>News</div>;
}
function Post() {
  return <div>Post</div>;
}
//export default App;
