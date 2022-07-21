import React, { useCallback } from "react"
import { Field, Form } from "react-final-form" 
import { useDispatch, useSelector } from "react-redux"
import { changeVisbleFormActive, putProfile } from "../../redux/profile-reducer"
import { getProfileSelector } from "../../redux/profile-selector"
import FieldHoc from "./FieldHoc"
import styles from './validate.module.css'


const FormProfile = (props)=>{
    const profileOld = useSelector(getProfileSelector)
    const {photos, ...profile} = profileOld
    const dispatch = useDispatch()
    const putProfileSend = useCallback(
        (profile) => dispatch(putProfile(profile)),
        [dispatch]
    )
    const Address = ({ name, label }) => (
        <React.Fragment>
          <div className={styles.formDiv}>
            {/* <label>{label}</label> */}
            <FieldHoc name = {`${name}.github`} inputType='text' labelName='github' InputPlaceholder='github' inputStyle={{style_block:styles.input_block}}/>
            <FieldHoc name = {`${name}.vk`} inputType='text' labelName='vk' InputPlaceholder='vk' inputStyle={{style_block:styles.input_block}}/>
            <FieldHoc name = {`${name}.facebook`} inputType='text' labelName='facebook' InputPlaceholder='facebook' inputStyle={{style_block:styles.input_block}}/>
            <FieldHoc name = {`${name}.instagram`} inputType='text' labelName='instagram' InputPlaceholder='instagram' inputStyle={{style_block:styles.input_block}}/>
            <FieldHoc name = {`${name}.twitter`} inputType='text' labelName='twitter' InputPlaceholder='twitter' inputStyle={{style_block:styles.input_block}}/>
            <FieldHoc name = {`${name}.website`} inputType='text' labelName='website' InputPlaceholder='website' inputStyle={{style_block:styles.input_block}}/>
            <FieldHoc name = {`${name}.youtube`} inputType='text' labelName='youtube' InputPlaceholder='youtube' inputStyle={{style_block:styles.input_block}}/>
            <FieldHoc name = {`${name}.mainLink`} inputType='text' labelName='mainLink' InputPlaceholder='mainLink' inputStyle={{style_block:styles.input_block}}/>
          </div>
        </React.Fragment>
      ) 
    let onSubmit = async (values)=>{
        props.changeVisbleFormActive(true)
        putProfileSend(values)
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
                  {/* <FieldHoc name = 'lookingForAJob' inputType='text' labelName='lookingForAJob' InputPlaceholder='lookingForAJob' inputStyle={{style_block:styles.input_block}}/>
                  <FieldHoc name = 'lookingForAJobDescription' inputType='text' labelName='Username' InputPlaceholder='Login' inputStyle={{style_block:styles.input_block}}/>
                  <FieldHoc name = 'aboutMe' inputType='text' labelName='aboutMe' InputPlaceholder='aboutMe' inputStyle={{style_block:styles.input_block}}/>
                  <FieldHoc name = 'fullName' inputType='text' labelName='fullName' InputPlaceholder='fullName' inputStyle={{style_block:styles.input_block}}/> */}
                  <Address name="contacts" label="contacts" />
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
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
            
                </form> 
            )}
        /></div>)
      
}


export default FormProfile