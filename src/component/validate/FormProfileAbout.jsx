import React, { useCallback } from "react"
import { Field, Form } from "react-final-form" 
import { useDispatch, useSelector } from "react-redux"
import { changeVisbleFormActive, putProfile } from "../../redux/profile-reducer"
import { getProfileSelector } from "../../redux/profile-selector"
import FieldHoc from "./FieldHoc"
import styles from './validate.module.css'


const FormProfileAbout = (props)=>{
    const profileOld = useSelector(getProfileSelector)
    const {photos, ...profile} = profileOld
    const dispatch = useDispatch()
    const putProfileSend = useCallback(
        (profile) => dispatch(putProfile(profile)),
        [dispatch]
    )
    const changeVisbleFormActiveDis = useCallback(
      (visibleFormActive)=>dispatch(changeVisbleFormActive(visibleFormActive)),
      [dispatch]
  )
    let onSubmit = async (values)=>{
      changeVisbleFormActiveDis(true)
        putProfileSend(values)
        console.log(values)
    }
   
   return(
       <div>   
    <Form 
            
            initialValues={profile}
            onSubmit={onSubmit} 
            validate={values => {
            const errors = {}
            if (!values.aboutMe) {
                errors.aboutMe = 'Required'
            }
            // }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)) {
            //   errors.login = 'Invalid email address'
            // }
            // if (!values.password) {
            //     errors.password = 'Required'
            // }
            return errors
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form  id='fere' onSubmit={handleSubmit} className={styles.formStyle}>
                  <FieldHoc name = 'lookingForAJob' inputType='checkbox' labelName='lookingForAJob' InputPlaceholder='lookingForAJob' inputStyle={{style_block:styles.input_block}}/>
                  <FieldHoc name = 'lookingForAJobDescription' inputType='text' labelName='Username' InputPlaceholder='Login' inputStyle={{style_block:styles.input_block}}/>
                  <FieldHoc name = 'aboutMe' inputType='text' labelName='aboutMe' InputPlaceholder='aboutMe' inputStyle={{style_block:styles.input_block}}/>
                  <FieldHoc name = 'fullName' inputType='text' labelName='fullName' InputPlaceholder='fullName' inputStyle={{style_block:styles.input_block}}/>
                  {/* <Address name="contacts" label="contacts" /> */}
                    {/* <span>RememberMe</span>
                    <Field name="rememberme" component="input" type="checkbox" /> */}
                    <div className="buttons">
                      <button type="submit" disabled={submitting}>
                        Submit
                      </button>
                      <button
                        type="button"
                        disabled={submitting || pristine}
                      >
                  Reset
              </button>
            </div>
            {/*   */}
            
                </form> 
            )}
        /></div>)
      
}


export default FormProfileAbout