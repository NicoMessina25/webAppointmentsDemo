import { Button } from 'primereact/button'
import React, { useContext, useState } from 'react'

import {useIntl} from 'react-intl'
import { changePassword } from '../../../services/UserService';
import { appContext } from '../../Context/appContext';
import InputTextCustom from '../../Inputs/InputText/InputTextCustom'
import ErrorModal from '../ErrorModal/ErrorModal';
import Modal from '../Modal';
import SuccesModal from '../SuccessModal/SuccessModal';
import './ChangePasswordModal.scss'


export default function ChangePasswordModal({visible,setVisible}:any) {
    const intl=useIntl(); 
    const textWithFormat=<span><span className='' >{intl.formatMessage({id:"Enter"})}</span> <span className='infoText'>{intl.formatMessage({id:"CurrentPassword"})}</span></span>

    const [currentPassword,setCurrentPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [repeatNewPassword,setRepeatNewPassword]=useState("")
    const {getStorage}:any = useContext(appContext);
    let settingsString: any = getStorage().getItem("settings");
    let settingsJson: any;
    settingsJson = settingsString && JSON.parse(settingsString);

    const [visibilityErrorModal,setVisibilityErrorModal]=useState(false);
    
    const [visibilitySuccessModal,setVisibilitySuccessModal]=useState(false);

    const [errorCurrentPassword,setErrorCurrentPassword]=useState(false);
    const [errorNewPassword,setErrorNewPassword]=useState(false);
    const [errorRepeatNewPassword,setErrorRepeatNewPassword]=useState(false);
    const [errorMessageCurrentPassword,setErrorMessageCurrentPassword]=useState("");
    let atLeast8=intl.formatMessage({id:"AtLeast8Characters"});
    const [errorMessageNewPassword,setErrorMessageNewPassword]=useState(atLeast8);
    const [errorMessageRepeatNewPassword,setErrorMessageRepeatNewPassword]=useState(atLeast8);
    

    let errorMessage=intl.formatMessage({id:"ThisFieldIsRequired"});



    function checkFields(){

        if(currentPassword===""){
            setErrorCurrentPassword(true);
            setErrorMessageCurrentPassword(errorMessage);
        }

        if(newPassword==="" || newPassword.length<8){
            setErrorNewPassword(true);
            setErrorMessageNewPassword(atLeast8);
        }

        if(repeatNewPassword==="" || repeatNewPassword.length<8){
            setErrorRepeatNewPassword(true);
            setErrorMessageRepeatNewPassword(atLeast8);
        }

        if(currentPassword!="" && newPassword!="" && repeatNewPassword!="" && newPassword===repeatNewPassword)
            return true;
        else 
            return false;
    }

    function savePassword(){
    
        if(checkFields()){
            setVisible(false);
            let dto={
                userId:settingsJson.userId,
                oldPassword:currentPassword,
                newPassword:newPassword,
                repeatNewPassword:repeatNewPassword
            }
            changePassword(dto).then(res => {
                if(res.data===false)
                    setVisibilityErrorModal(true);
                else{
                    setVisibilitySuccessModal(true)
                }
            }).catch(error =>{
                handleClose();
                setVisibilityErrorModal(true);
            })
        }
        
        
    }

    function handleClose(){
        setCurrentPassword("");
        setNewPassword("");
        setRepeatNewPassword("")
        setErrorMessageCurrentPassword("")
        setErrorMessageNewPassword(atLeast8)
        setErrorMessageRepeatNewPassword(atLeast8)
        setErrorCurrentPassword(false);
        setErrorNewPassword(false);
        setErrorRepeatNewPassword(false);
        setVisible(false);
    }

  return (
    <div>
        <Modal visible={visible} setVisible={setVisible} header={intl.formatMessage({id:"ChangePassword"})} footerButtonRightText={intl.formatMessage({id:"Confirm"})} footerButtonLeftText={intl.formatMessage({id:"Cancel"})} onClickLeftBtn={handleClose} onHideCustom={handleClose} onClickRightBtn={savePassword} >
            <div className='infoText indication-container grey-background'>{intl.formatMessage({id:"ChangePasswordIndication" })}</div>
            <InputTextCustom value={currentPassword} onChange={(e:any) => {
                setErrorCurrentPassword(false)
                setErrorMessageCurrentPassword("")
                setCurrentPassword(e.target.value)
                }} password feedback={false} label={textWithFormat} caption={errorMessageCurrentPassword} error={errorCurrentPassword}></InputTextCustom>
            <InputTextCustom password value={newPassword} onChange={(e:any) => {
                setErrorNewPassword(false);
                setNewPassword(e.target.value);
                }} label={intl.formatMessage({id:"NewPassword"})} labelClassName="lightPrimaryText" caption={errorMessageNewPassword} error={errorNewPassword}></InputTextCustom>
            <InputTextCustom password value={repeatNewPassword} onChange={(e:any) => {
                setErrorRepeatNewPassword(false)
                setRepeatNewPassword(e.target.value)
                }} label={intl.formatMessage({id:"RepeatNewPassword"})} labelClassName="lightPrimaryText" caption={errorMessageRepeatNewPassword} error={errorRepeatNewPassword}></InputTextCustom>
        </Modal>
        <ErrorModal visible={visibilityErrorModal} setVisible={setVisibilityErrorModal} ></ErrorModal>
        <SuccesModal header={intl.formatMessage({id:"ChangesSavedSuccessfully"})} visible={visibilitySuccessModal} setVisible={setVisibilitySuccessModal}></SuccesModal>
    </div>
  )
}
