import React, { useCallback, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../../api/api'
import { postLogin } from '../../redux/auth-reducer'
import { getCaptcha, getIsAuth, getIsError } from '../../redux/auth-selector'
import FieldHoc from './FieldHoc'
import styles from './validate.module.css'


  
  

  function  Login2 (){
    const isError = useSelector(getIsError)
    const isAuth = useSelector(getIsAuth)
    const captchaSel = useSelector(getCaptcha)
    
    const dispatch = useDispatch()

    const postLoginDis = useCallback(
      (email,password,captcha,rememberMe) => dispatch(postLogin(email,password,captcha,rememberMe)),
      [dispatch]
    )
    const onSubmit = async values => {
      console.log(values)
      postLoginDis(values.login,values.password,true,values.captcha)
  }
    let navigate = useNavigate()
  useEffect(() => {
      if (!isError){
          navigate("/Profile");
      }
   },[isError]);
   if (isAuth){
    return <div>hgg</div>  
}
   if(!isAuth){return(
     <div className={styles.error_span}>
        <h1>Login</h1>
        <Form 
            onSubmit={onSubmit} 
            validate={values => {
            const errors = {}
            if (!values.login) {
                errors.login = 'Required'
            }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)) {
              errors.login = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            }
            return errors
            }}
           
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form  onSubmit={handleSubmit}>
                  <FieldHoc name = 'login' inputType='text' labelName='Username' InputPlaceholder='Login' inputStyle={{style_block:styles.input_block}}/>
                  <FieldHoc name = 'password' inputType='password' labelName='Password' InputPlaceholder='Password' inputStyle={{style_block:styles.input_block}}/>
                  {captchaSel!='' 
                  ? <FieldHoc name = 'captcha' inputType='text' labelName='captcha' InputPlaceholder='captcha' inputStyle={{style_block:styles.input_block}}/>
                  : ''
                }
                  
                    <span>RememberMe</span>
                    <Field name="rememberme" component="input" type="checkbox" />
                    <div className="buttons">
                      <button type="submit" disabled={submitting}>
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                      >
                  Reset
              </button>
              <img src={captchaSel}alt="" />
            </div>
            
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
            
                </form> 
            )}
        />
    </div>
    )
            }
  }
export default Login2
//export default Gg