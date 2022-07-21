import React from "react";
import { connect } from "react-redux";
import func2, { authAPI } from "../../api/api";
import { getAuthUserData, setAuthUserDataCreator,deleteLogin } from "../../redux/auth-reducer";
import Navbar from "./Navbar";


function NavbarContainer (props){
    return <Navbar {...props}/>
}
let mapStateToProps = (state)=>{
    return (
        { 
            profileInfo:state.AuthReducer
    })
}
export default connect(
    mapStateToProps,{getAuthUserData,deleteLogin}
)(NavbarContainer)