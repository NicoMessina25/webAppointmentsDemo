import React, {useEffect, useState} from 'react'
import { useIntl } from 'react-intl'
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';

export default function UserVerificationForm({questions, answers, setAnswers, error}:any) {

  const intl = useIntl();
  
  
  

  useEffect(() => {
    setAnswers({
      city: null,
      birthDate: null,
      phone: "",
      address: "",
      email:""
    })
  }, [])
  

  return (
    <div>
        <p className='textDark'>{intl.formatMessage({id: "UserVerificationLabel"})}:</p>
        {questions.map(({label, field, options}:any, ind:number)=>{
        return options.length? <RadioButtonGroup 
                                  key={field + ind} 
                                  orientation="column"  
                                  options={options} 
                                  value={answers[field]}
                                  setValue={(v:any, field:any)=>{
                                    let _answers:any = {...answers};
                                    
                                    _answers[field] = v;
                                    setAnswers(_answers);
                                  }} label={label}
                                  fieldId={field}
                                  caption={error && !answers[field] &&  intl.formatMessage({id:"ThisFieldIsRequired"})}
                                  error={error} />
                                : ""
        })}
       
    </div>
  )
}

