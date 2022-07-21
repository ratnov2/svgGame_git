import React, { useState } from "react";
import ava from '../../../img/ava.jpeg';
import styles from './UserPhotoInf.module.css'
import { Button, Tooltip } from 'antd';
import { useParams } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import  { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import Status from "../Status/Status";
import FormProfileAbout from "../../validate/FormProfileAbout";

function UserPhotoInf(props){
  const [avaFoto,setAvaFoto] = useState()
  let userId = useParams().id
  const onMainFotoSelected=(e)=>{
    setAvaFoto(e.target.files[0])
    // props.putPhotoFile(e.target.files[0])
  }
  const [showForm,setShowForm]=useState(true)
  function putFoto(){
    props.putPhotoFile(avaFoto)
  }
    return(
        <div>
          <div className ={styles.avaInform}>
            <div className={styles.avaInformLoad}>
              <img src={props.profile.photos.large || ava} alt="" className = {styles.ava}/>
              {!userId ?  <p><input type={'file'} className={styles.LoadFile} onChange={onMainFotoSelected}/>
              <Tooltip placement="left" title={!avaFoto ? 'Выберите фото' : ''}>
                <Button disabled={!avaFoto } type="primary" onClick={putFoto}>
                    Loading
                </Button>
              </Tooltip>
              </p>
              :''}
          </div>
          <section>
            <div className={styles.status_name}>
              <p>{props.profile.fullName}</p>
              <Status status= {props.status} sendStatus={props.sendStatus} userId={props.userId} />           
            </div>

            {props.visibleFormActive
              ? <div className={styles.information}>
                  <p><b>Обо мне: </b> {props.profile.aboutMe}</p>
                  <p><b>Ищу работу: </b>{props.profile.lookingForAJob ? 'da' : 'net'}</p>
                  <p><b>Описание работы: </b>{props.profile.lookingForAJobDescription}</p>

                  {/* {props.visibleFormActive 
                    ? <Button type="primary" onClick={()=>props.changeVisbleFormActive(false)}>Изменить</Button>
                    : <Button type="primary" onClick={()=>props.changeVisbleFormActive(true)}>Сохранить</Button>
                  } */}
                </div>
              : <div className={styles.information}>
                  <FormProfileAbout />
                </div>
              
            }
          </section>
          </div>
        </div>
    )
}
export default UserPhotoInf