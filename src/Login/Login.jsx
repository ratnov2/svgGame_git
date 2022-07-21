import React, { useEffect, useState }  from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Redirect from "../component/Redirect/Redirect";
import { postLogin } from "../redux/auth-reducer";
import { Field, reduxForm } from 'redux-form'

function Login (props){


    

    let navigate = useNavigate()
    useEffect(() => {
        if (!props.isError){
            navigate("/Profile");
        }
     },[props.isError]);
     
    const [state, setState] = useState(
        {
            email:'',
            password:'',
            rememberMe: false
        });
    
        if (props.isAuth){
            return <div>hgg</div>  
        }

    function handleSubmit (event){
        event.preventDefault()
        props.postLogin(state.email,state.password,state.rememberMe)
    }
    function handleChange(event){
        const { name, value } = event.target
        
        switch (event.target.name){
            case 'email':
                setState(prevState=>({
                    ...prevState,
                    [name]:value
                }))
                break
            case 'password':
                setState(prevState=>({
                    ...prevState,
                    [name]:value
                }))
                break
        }
    }
    
    if(!props.isAuth) {return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input name ='email' type="text" value = {state.email} onChange = {handleChange}/>
                <input name = 'password' type="text" value = {state.password} onChange = {handleChange}/>
                {/* <input type="text" /> */}
                <input type="submit" />
            </form>
            
        </>
    )
    }
    // else {
    //     console.log('fef')
    //     return( <>
    //      <Routes>
    //        <Route
    //             path="*"
    //           element={<Redirect to="/Profile" />}
    //       />
    //      </Routes>
    //      </>
    //     )
    // }
}
const mapStateToProps = (state)=>{
    return({
        isAuthLog: state.AuthReducer.isAuthLog,
        isAuth:state.AuthReducer.isAuth,
        isAuthLoading:state.AuthReducer.isAuthLoading,
        isError:state.AuthReducer.isError
    })
}
const mapDispatchToProps = ()=>{
    return({

    })
}
export default connect(mapStateToProps,{postLogin})(Login)
//export default Login
