import React, { Profiler, useEffect, useRef, useState } from "react";
import styles from './Navbar.module.css'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAuthUserData } from '../../redux/auth-reducer'

function Navbar(props){
    
   
   console.log(props)
 const location = useLocation();
 const { pathname } = location;
 const splitLocation = pathname.split("/");
    let userId = props.profileInfo.id
    return(
            <div>
                <ul className={`${styles.decorUl}`}>
                    <li>
                        <Link to = {`/Profile/`} className={`${styles.DecorA} ${splitLocation[1] ==="Profile" ? styles.active : ''}`}>Profile</Link>
                    </li>
                    <li >
                        <Link to = '/Users' className={`${styles.DecorA} ${splitLocation[1] ==="Users" ? styles.active : ''}`}>Users</Link>
                    </li>
                    <li>
                        <Link to = '/News' className={`${styles.DecorA} ${splitLocation[1] ==="News" ? styles.active : ''}`}>News</Link>
                    </li>
                    <li>
                        <Link to = '/Post' className={`${styles.DecorA} ${splitLocation[1] ==="Post" ? styles.active : ''}`}>Post</Link>
                    </li>
                    <li>
                        <Link to = '/Login' className={`${styles.DecorA} ${splitLocation[1] ==="Post" ? styles.active : ''}`}>Login</Link>
                    </li>
                    <li>
                        <button onClick={props.deleteLogin}>Logout</button>
                    </li>
                </ul>
            </div>
            

    )
}

export default Navbar