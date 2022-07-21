import React from 'react'
import { connect } from 'react-redux'
import { saveStatusCreator } from '../../redux/profile-reducer'
import Content from './Content'
import {useLocation, useParams} from 'react-router-dom'
import { getAuthUserData } from '../../redux/auth-reducer'


let mapStateToProps = (state)=>{
    return (
        {}
        )
}
let mapDispatchToProps = (dispatch)=>{
    return{
        
    }
}

// function usePageViews() {
//     let location = useLocation();
//     React.useEffect(() => {
//       ga.send(['pageview', location.pathname]);
//     }, [location]);
//   }
//   usePageViews()
//console.log(ContentWithRouter)
export default connect(
    mapStateToProps,mapDispatchToProps
)(Content)

