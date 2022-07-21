import React, { useState } from "react";
import * as axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import './Status.css'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:     {
        "API-KEY": "fc3d05ce-3d25-42f8-8f10-c89bb4848d9a"
    }
})
let userId=2;
// instance.get(`profile/status/` + userId).then(response=>{
//     console.log(response.data)
// })

function Status(props) {
  const [count, Setcount] = useState(true);
  const [text, setText] = useState(props.status)

  let userId = useParams().id
  const fChanheText=(e)=>{
      setText(e.currentTarget.value)
  }

  return (
    <div>
    {!userId 
    ?<div>
      {count ? (
        <>
          <div className="status" onClick={() => Setcount(false)}>{props.status}</div>
          {/* <button onClick={() => Setcount(false)}>Change</button> */}
        </>
      ) : (
        <>
          <input type="textarea" onChange={fChanheText} onBlur={()=>console.log('feef')} value = {text} />
          <button onClick={() => {
              Setcount(true)
            props.sendStatus(text)
        }}>save</button>
        </>
      )}
  </div>
    :<div>{props.status}</div>
  }
    
    </div>
  );
}
export default Status;
