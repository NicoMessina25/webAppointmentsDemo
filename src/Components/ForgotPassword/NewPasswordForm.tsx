import { Button } from "primereact/button";
import { useContext, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { postNewPassword } from "../../services/loginService";
import InputTextCustom from "../Inputs/InputText/InputTextCustom";
import Modal from "../Modal/Modal";
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha"


import { Toast } from 'primereact/toast';
import { getCaptchaKey } from "../../services/siteService";
import { appContext } from "../Context/appContext";



export default function NewPasswordForm(props:any){
    
    const intl = useIntl();
    const[password,setPassword]=useState("")
    const[repeatPassword,setRepeatPassword]=useState("")
 
    const [inputclass,setInputclass]=useState("");
    const [styleError,setStyleError]=useState(false);
    const [messageError,setMessageError]=useState('');
    
    const [visibilitySuccessModal,setVisibilitySuccessModal]=useState(false);

    const [validCaptcha,setValidCaptcha]:any=useState();
    const [validUser,setValidUser]=useState(false);
    const [tokenGenerated,setTokenGenerated]=useState("");

    const [visibilityFailureModal,setVisibilityFailureModal]=useState(false);

    const reCaptchaRef:any=useRef(null);

    let isSiteKey = false;
    

    function handleConfirm(){
       
        if(password!="" && repeatPassword!="" && validUser && password==repeatPassword){
            postNewPassword(props.patientId,password,repeatPassword,tokenGenerated,props.receivedCode).then(res =>{
                if(res.status===200)
                    setVisibilitySuccessModal(!visibilitySuccessModal);
                else{
                    //ATTEMPS + 1
                    if(reCaptchaRef.current)
                        reCaptchaRef.current.reset();
                    setVisibilityFailureModal(true);
                }
            });
        }else{
            setStyleError(true);
            if(password=="" || repeatPassword=="")
                setMessageError(intl.formatMessage({id:'CompleteTheData'}));
            else if(password!=repeatPassword)
                setMessageError(intl.formatMessage({id:'PasswordsDoNotMatch'}));
            else if(!validUser){
                setMessageError("");
                setValidCaptcha(false);
                setStyleError(false);
            }
                
        }
    }

    let navigate = useNavigate();
    
    function onHide(){
        navigate('/');
    };

    //El evento es el token que se genera al validar el captcha que se debe mandar a google y validar desde el backend 
    function onCaptchaChange(e:any){
        setTokenGenerated(e);
        setValidUser(true);
        setValidCaptcha(true);
    }

    const [siteKey,setSiteKey]=useState("");
    const {captchaKey}:any = useContext(appContext);

    useEffect(()=>{
        if(!isSiteKey){
            isSiteKey = true;
            setSiteKey(captchaKey);
        }
    },[])
    
    return (
        <div className='bodyFormForgotPass flexible--column'>
            <p className='infoText'>{intl.formatMessage({ id:'CanEnterToSystem' })}</p>

            <div className="littleMargin"> 
                <InputTextCustom value={password}  error={styleError}  onChange={(e:any) => setPassword(e.target.value)} placeholder="" label={intl.formatMessage({id: "NewPassword"})} password/>
                <InputTextCustom value={repeatPassword} caption={messageError} error={styleError} onChange={(e:any) => setRepeatPassword(e.target.value)} placeholder="" label={intl.formatMessage({id: "RepeatPassword"})} password feedback={false}/>
            </div>
            
            <div className="captcha flexible--column passwordCaptcha">
                {siteKey!="" && <ReCAPTCHA ref={reCaptchaRef} sitekey={siteKey} onChange={onCaptchaChange}  />}

                {validCaptcha == false && <div className="caption-invalid">Complete el captcha</div>}
            </div>
            
            <div className="flexible--row buttonContainer flex-end">
                <Button  iconPos="left" onClick={props.handleCancel} label={intl.formatMessage({ id:'Cancel' })} className="buttonMain3 cancelButton"></Button>
                <Button  icon="pi pi-check" onClick={handleConfirm} iconPos="right" label={intl.formatMessage({ id:'Finish' })} className="buttonMain saveButton"></Button> 
            </div>

            <Modal visible={visibilitySuccessModal} setVisible={setVisibilitySuccessModal} header={intl.formatMessage({ id: 'YouHaveNewPassword' })} footerButtonRightText={intl.formatMessage({ id: 'Continue' })} pathRightBtn={"/"} onHideCustom={onHide}>
            {intl.formatMessage({ id: 'NewPasswordMessage' })}
            </Modal>

            <Modal visible={visibilityFailureModal} setVisible={setVisibilityFailureModal} header="Error"  footerButtonRightText={intl.formatMessage({ id: 'Back' })} 
            onClickRightBtn={(()=>{{ setVisibilityFailureModal(false) }})}>
            {intl.formatMessage({ id: 'ErrorResetingPassword' })}
        </Modal>
            
        </div>
    )
}