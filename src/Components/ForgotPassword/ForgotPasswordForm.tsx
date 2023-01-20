import { Button } from 'primereact/button';
import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl';
import { getMailAndCellphone, sendCodeByMail, validateRecoveryCode } from '../../services/loginService';
import InputTextCustom from '../Inputs/InputText/InputTextCustom';
import Modal from '../Modal/Modal'
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup'

export default function ForgotPasswordForm(props :any) {

    
    const [descriptionClass,setDescriptionClass]=useState("infoText");
    const intl = useIntl();
    const options=[ 
        {label:"DNI", value: 1},
        {label:intl.formatMessage({ id:'Foreign' }), value: 2}
    ];
    
    const [confirm,setConfirm]=useState(false);
    const [dniClass,setDniClass]=useState("textHeading dniRegistered");

    
    const [visibilityCompleteFields,setVisibilityCompleteFields]=useState(false);
    const [visibilityUserNotExist,setVisibilityUserNotExist]=useState(false);
    const [visibilityCancelModal,setVisibilityCancelModal]=useState(false);
    const [visibilityCodeModal,setVisibilityCodeModal]=useState(false);
    const [visibilityNewPasswordForm,setVisibilityNewPasswordForm]=useState(false);
    let [mail,setMail]=useState("");
    let [mobilephone,setMobilephone]=useState("");
    const [document,setDocument]=useState("");
    const [documentType,setDocumentType]=useState("");
    const sendOptions=[
        {label:mail, value: mail, captions:"Mail"},
        {label:mobilephone, value: mobilephone, captions:"SMS"}
    ];
    const [sendOptionSelected,setSendOptionSelected]=useState("");
    let [receivedCode,setReceivedCode]=useState("");

    const [styleError,setStyleError]=useState(false);
    const [messageError,setMessageError]=useState('');

    function handleSend(e:any){
        
        if(sendOptionSelected!=mail && sendOptionSelected!=mobilephone) // No eligio forma de contacto
            console.log("Elegi contacto")
        else{
            if(sendOptionSelected==mail){
                sendCodeByMail(props.patientId);
                setVisibilityCodeModal(!visibilityCodeModal)
            }
        }
    }

    function handleCancel(){
        setVisibilityCancelModal(!visibilityCancelModal);
    }

    function toggleModalFields(){
        setVisibilityCompleteFields(!visibilityCompleteFields);
    }

    function toggleModalUserNotExists(){
        setVisibilityUserNotExist(!visibilityUserNotExist);
    }

    function handleConfirm(){
        
        if(documentType!="" && document!=""){
            //SETEAR CAMPO MAIL Y DNI, ej:
            getMailAndCellphone(document,documentType).then(res => {
                if ("response" in res && res.response.status === 404){
                    toggleModalUserNotExists();
                }else{
                    setConfirm(true);
                    setDescriptionClass("textTertiary");
                    setDniClass("textTertiary");
                    setMail(res.email);
                    setMobilephone(res.mobilephone);
                    props.setPatientId(res.medereentity);
                }
            });
        }else{
            toggleModalFields();
        }
    }

    function handleCodeValidation(){
        
        validateRecoveryCode(props.patientId,receivedCode).then(res => {
            if (!res){
                setStyleError(true);
                setMessageError(intl.formatMessage({id :'WrongCode'}))
            }  
            else{
                setStyleError(false);
                setVisibilityCodeModal(false);        
                setVisibilityNewPasswordForm(true);
                props.toggleForm();
            }
        } );
        
    }
    
    return (
    
    <div className='bodyForm flexible--column'>
        <div className='descriptionText littleMargin'>
            <p className={descriptionClass}>{intl.formatMessage({ id: 'ForgotPasswordDescriptionStepOne' })}
            <span className={dniClass}> {intl.formatMessage({ id: 'DniRegistered' })+":"}</span></p>
        </div>

        <RadioButtonGroup className="radioButtonGroup littleMargin" orientation="row" options={options} value={documentType} setValue={setDocumentType} labelId='Type'/>

        
        <InputTextCustom labelId="Number" value={document}  onChange={(e:any) => setDocument(e.target.value)} className="input" placeholder=""/>
        
        {
            confirm && <div >
                <p className='littleMargin'>
                    <span className='textDark'>{intl.formatMessage({ id:'WeWillSendYouaNumericalCode' })}</span>
                    <span className='infoText'>{intl.formatMessage({ id:'NumericalCodeMsg' })}</span>
                </p>

                <RadioButtonGroup className="radioButtonGroup" orientation="column" options={sendOptions} value={sendOptionSelected} setValue={setSendOptionSelected}/>
            </div>
        }

        <div className="flexible--row buttonContainer flex-end">
            <Button onClick={props.handleCancel} label={intl.formatMessage({ id:'Cancel' })} className="buttonMain3 cancelButton"></Button>
            {
                confirm ? <Button icon="pi pi-angle-right" iconPos="right" onClick={handleSend} label={intl.formatMessage({ id:'Send' })} className="buttonMain saveButton"></Button> :
                <Button onClick={handleConfirm} icon="pi pi-angle-right" iconPos="right" label={intl.formatMessage({ id:'Confirm' })} className="buttonMain saveButton"></Button> 
            }
        </div>
        <Modal visible={visibilityCompleteFields} setVisible={setVisibilityCompleteFields} header={intl.formatMessage({ id: 'IncompleteData' })} footerButtonRightText={intl.formatMessage({ id: 'Back' })}  onClickRightBtn={()=>setVisibilityCompleteFields(false)} pathRightBtn={"#"}>
        {intl.formatMessage({ id: 'CompleteTheTypeOfIDAndTheNumber' })}
        </Modal>
        <Modal visible={visibilityUserNotExist} setVisible={setVisibilityUserNotExist} header={intl.formatMessage({ id: 'UserDoesNotExist' })} footerButtonRightText={intl.formatMessage({ id: 'Back' })}  onClickRightBtn={()=>setVisibilityUserNotExist(false)} pathRightBtn={"#"}>
        {intl.formatMessage({ id: 'UserNotExistByDocument' })}
        </Modal>
        

        <Modal visible={visibilityCodeModal} setVisible={setVisibilityCodeModal} header={intl.formatMessage({ id: 'WeSendYouACode' })} footerButtonLeftText={intl.formatMessage({ id: 'TryAnotherWay'})} footerButtonRightText={intl.formatMessage({ id: 'Validate' })}  onClickLeftBtn={()=> setVisibilityCodeModal(false)} onClickRightBtn={handleCodeValidation}>
        {
            (sendOptionSelected==mobilephone) && 
            <FormattedMessage
            id="MobileVerificationMesssage"
            defaultMessage=""
            values={{
                mobilephone: mobilephone,
            }}
            />
        }
        {
            (sendOptionSelected==mail) && 
            <FormattedMessage
            id="EmailVerificationMesssage"
            defaultMessage=""
            values={{
                mail: mail,
            }}
            />
        }
        {
            
            <InputTextCustom labelId="WriteReceivedCode" error={styleError} caption={messageError} value={receivedCode}  onChange={(e:any) => setReceivedCode(e.target.value)} className="input" placeholder=""/>
            
        }
        </Modal>

        <Modal visible={visibilityCancelModal} setVisible={setVisibilityCancelModal} header={intl.formatMessage({ id: 'CancelYourRecovery' })} footerButtonLeftText={intl.formatMessage({ id: 'YesCancel'})} footerButtonRightText={intl.formatMessage({ id: 'ContinueWithRecovery' })} onClickRightBtn={handleCancel} pathLeftBtn={"/"}>
            {intl.formatMessage({ id: 'CancelYourRecoveryMessage' })}
        </Modal>
                        
    </div>
  )
}
