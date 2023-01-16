import { Button } from "primereact/button";
import { useState } from "react";
import { useIntl } from "react-intl";
import InputTextCustom from "../Inputs/InputText/InputTextCustom";
import Modal from "../Modal/Modal";



export default function NewPasswordForm(props:any){
    
    const intl = useIntl();
    const[password,setPassword]=useState("")
    const[repeatPassword,setRepeatPassword]=useState("")
 
    const [inputclass,setInputclass]=useState("");
    const [styleError,setStyleError]=useState(false);
    const [enableError,enableMessageError]=useState(false);
    const [messageError,setMessageError]=useState('');
    

    function handleConfirm(){
        if(password!="" && password==repeatPassword){
        }else{
            setStyleError(true);
            enableMessageError(true);
            setMessageError(intl.formatMessage({id:'PasswordsDoNotMatch'}));
        }
        
    }

    return (
        <div className='bodyForm flexible--column'>
            <p className='infoText'>{intl.formatMessage({ id:'CanEnterToSystem' })}</p>

            <div className="littleMargin"> 
                <InputTextCustom value={password}  error={styleError}  onChange={(e:any) => setPassword(e.target.value)} placeholder="" labelId="NewPassword" password/>
                <InputTextCustom value={repeatPassword} caption={messageError} error={styleError} onChange={(e:any) => setRepeatPassword(e.target.value)} placeholder="" labelId="RepeatPassword" password feedback={false}/>
            </div>
            <div className="flexible--row buttonContainer flex-end">
                <Button  iconPos="left" onClick={props.handleCancel} label={intl.formatMessage({ id:'Cancel' })} className="buttonMain3 cancelButton"></Button>
                <Button  icon="pi pi-check" onClick={handleConfirm} iconPos="right" label={intl.formatMessage({ id:'Finish' })} className="buttonMain saveButton"></Button> 
            </div>
            
        </div>
    )
}