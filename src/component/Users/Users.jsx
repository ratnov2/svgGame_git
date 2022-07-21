import React, { useState } from "react";
import UserPhotoInf from "../../img/ava.jpeg";
import style from './Users.module.css'
import { Link, useNavigate } from "react-router-dom";
import Paginator from "../Paginator";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from '@ant-design/icons';

function Users(props) {
  console.log(props)
  const [state,setState] = useState(props.term)
  const [state2,setState2] = useState(props.friend)
  const handleChange = (e)=>{
    setState(e.target.value)
  }
  const handleChange2 = (e)=>{
    setState2(e.target.checked)
  }
  const handleSubmit=(e)=>{
    console.log(state2)
    
    props.setUsersDataInfDis(1,props.count,state,state2)
      // props.getUsersData(props.currentPage,props.count,state)
      // navigate(`/Users?page=${props.currentPage}&count=${props.count}&term=${''}`)
  }
  

  return (
    <>
      <Paginator {...props} />
      <div>
        <input type="text" value={state} onChange={handleChange}/>
        <Tooltip title="search">
        <Button type="submit" shape="circle" icon={<SearchOutlined />} onClick={handleSubmit}/>
        </Tooltip>
        <p>Ваши друзья: <input type="checkbox" checked={state2} onChange={handleChange2}/></p>
      </div>
      {props.users.map((k)=>{
        return <div key={k.id}>
          <div className={style.block_user_flex}>
            <div className={style.User_info}>
            <Link  to = {`/Profile/${k.id}`}><img className = {style.User_img}src={k.photos.small||UserPhotoInf} alt="" /></Link>
                {k.user}
              <div>
                <h4>{k.name}</h4>
                <span>id - {k.id}</span>
                <p>{k.status ? k.status: 'Здесь пока нет статуса'}</p>
              </div>
            </div>
            <div className={style.buttonDisabled}>
            {k.followed 
            ? <button  disabled = {props.isFetching.some(id => k.id == id)}
                onClick={()=>
                    {{props.toggleIsFetchingDis(k.id,true)};props.deleteFollow(k.id)}}>{k.followed ? 'UnSuscribe' : 'Suscribe'}
                </button>
            : <button disabled = {props.isFetching.some(id => k.id == id)} 
            onClick={()=>
                {{props.toggleIsFetchingDis(k.id,true)};props.postFollow(k.id)}}>{k.followed ? 'UnSuscribe' : 'Suscribe'}
              </button>
            }
            </div>
           
            
          </div>
        </div>
      })}
      </>
  );
}

export default Users