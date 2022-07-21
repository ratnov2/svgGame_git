import classMassive from "./ClassMassive";
import React from "react";
import { Field } from "react-final-form";
import styles from './FieldHoc.module.css'
//const classMassive = 'ff'
//console.log(props)
function FieldHoc({name,inputType,InputPlaceholder,inputStyle,labelName}){
    let style = classMassive(inputStyle)
    return <Field name={name} type={inputType} >
    {({ input, meta }) => (      
    <div>
      <div className={style+(meta.error && meta.touched&&styles.errors_span_border) +' '+(meta.error||meta.touched&&styles.errors_span_border2)}>
        <label>{labelName}</label>
        <input {...input}  type={inputType} placeholder={InputPlaceholder} />
        {meta.error && meta.touched && <p>{meta.error}</p>}
      </div>
    </div>
    )}
</Field>
}
export default FieldHoc