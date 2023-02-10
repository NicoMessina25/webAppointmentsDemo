import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { saveUser, sendLocationConsent } from "../../../services/loginService";
import InputTextCustom from "../../Inputs/InputText/InputTextCustom";
import Modal from "../../Modal/Modal";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";


export default function SecurityDataForm({user, setUser, setDisplayRegisterCancel, toast, onSubmit}:any){
    const intl = useIntl();
    
    const [loading, setLoading] = useState(false);
    const [inputErrors, setInputErrors] = useState({
        username: {caption: "", isValid: true},
        password: {caption: intl.formatMessage({id:"AtLeast8Characters"}), isValid: true},
        repeatPassword: {caption: "", isValid: true},
        email:{isValid:true, caption: ""}
    })

    const navigate = useNavigate();



    /* useEffect(()=>{
        setStep(2);
    },[]) */

    function onChangeRemoveError(field:any){
        let _inputErrors:any = {...inputErrors}
        _inputErrors[field].isValid = true
        _inputErrors[field].caption = ""

        if(!field.localeCompare("password")){
            _inputErrors.password.caption = intl.formatMessage({id:"AtLeast8Characters"});
        }
        setInputErrors(_inputErrors)
    }

    function validateData(){
        let valid = true;
        let _inputErrors:any = {...inputErrors}

        if(!user.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            _inputErrors.email = {isValid: false, caption: intl.formatMessage({id:"EnterAValidEMail"})};
            valid = false
        }

        if (user.password.length < 8){
            _inputErrors.password = {isValid: false, caption: intl.formatMessage({id:"AtLeast8Characters"})}
            valid = false;
        }

        if(user.repeatPassword.length < 8){
            _inputErrors.repeatPassword = {isValid: false, caption: ""}
            valid = false;
        }

        if(user.password.localeCompare(user.repeatPassword)){
            _inputErrors.repeatPassword = {isValid: false, caption: intl.formatMessage({id:"PasswordsDoNotMatch"})}
            _inputErrors.password.caption = "";
            _inputErrors.password.isValid = valid = false;
        }

        for(const ie in inputErrors){
            if(!user[ie]){
                _inputErrors[ie].caption = intl.formatMessage({id: "ThisFieldIsRequired"});
                _inputErrors[ie].isValid = valid = false;
            }            
        }
        

        setInputErrors(_inputErrors);

        return valid;
    }

    return (
        <div className="flexible--column">
            <Button label={intl.formatMessage({ id: 'SignInWithGoogle' })} className="buttonMain2 googleButton"/>
            <div className="lineContainer flexible--row">
                <div className="lineGreenBlue"></div>
                <p>O</p>
                <div className="lineGreenBlue"></div>
            </div>

            <InputTextCustom value={user.username} onChange={(e:any) =>{
                setUser({...user, username: e.target.value});
                onChangeRemoveError("username")
            } } label={intl.formatMessage({id:"User" })} error={!inputErrors.username.isValid} caption={inputErrors.username.caption} />

            <InputTextCustom value={user.email} error={!inputErrors.email.isValid} caption={inputErrors.email.caption} onChange={(e:any) => { 
                setUser({...user, email: e.target.value});
                onChangeRemoveError("email");
            }} label={intl.formatMessage({id:"Email" })}/>

            <InputTextCustom value={user.password} onChange={(e:any) => {
                setUser({...user, password: e.target.value})
                onChangeRemoveError("password")
                }} label={intl.formatMessage({id: "Password"})} password error={!inputErrors.password.isValid} caption={inputErrors.password.caption}/>

            <InputTextCustom value={user.repeatPassword} onChange={(e:any) => {
                setUser({...user, repeatPassword: e.target.value});
                onChangeRemoveError("repeatPassword")
            } } label={intl.formatMessage({id: "RepeatPassword"})} password feedback={false} error={!inputErrors.repeatPassword.isValid} caption={inputErrors.repeatPassword.caption} />


            <div className="flexible--row buttonContainer" >
                <Link to="/register/2" className='linkReactRouter'><Button icon="pi pi-angle-left" iconPos="left" label={intl.formatMessage({id: "Back"})} className="buttonMain3"/></Link>
                <Link to="#" className='linkReactRouter'><Button label={intl.formatMessage({id: "Cancel"})} className="buttonMain3" onClick={()=>{setDisplayRegisterCancel(true)}}/></Link>
                <Link to="#" className='linkReactRouter'><Button icon="pi pi-check" iconPos="right" label={intl.formatMessage({id: "Finish"})} className="buttonMain" onClick={()=>{
                    if(validateData()){
                        onSubmit(user)
                    }
                    
                    
                    }}/></Link>
            </div>

            

        </div>
    );
}