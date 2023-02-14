import { Button } from 'primereact/button'
import React, { useState } from 'react'

import {useIntl} from 'react-intl'
import InputTextCustom from '../../Inputs/InputText/InputTextCustom'
import Modal from '../Modal';
import './ChangePasswordModal.scss'


export default function ChangePasswordModal({visible,setVisible}:any) {
    const intl=useIntl(); 
    const textWithFormat=<div><span className='' >{intl.formatMessage({id:"Enter"})}</span> <span className='infoText'>{intl.formatMessage({id:"CurrentPassword"})}</span></div>

    const [currentPassword,setCurrentPassword]=useState("")

    const [newPassword,setNewPassword]=useState("")

    const [repeatNewPassword,setRepeatNewPassword]=useState("")

    function handleConfirm(){

    }

    function checkFields(){
        if(currentPassword!="" && newPassword!="" && repeatNewPassword!="" && newPassword===repeatNewPassword)
            return true;
        else 
            return false;
    }

    function savePassword(){
        console.log(checkFields())
        setVisible(false)
    }

    function handleClose(){
        setVisible(false)
    }

  return (
        <Modal visible={visible} setVisible={setVisible} header={intl.formatMessage({id:"ChangePassword"})} footerButtonRightText={intl.formatMessage({id:"Confirm"})} footerButtonLeftText={intl.formatMessage({id:"Cancel"})} onClickLeftBtn={handleClose} onClickRightBtn={savePassword} >
            <div className='infoText indication-container grey-background'>{intl.formatMessage({id:"ChangePasswordIndication" })}</div>
            <InputTextCustom value={currentPassword} password feedback={false} label={textWithFormat}></InputTextCustom>
            <InputTextCustom password value={newPassword} label={intl.formatMessage({id:"NewPassword"})} labelClassName="lightPrimaryText"></InputTextCustom>
            <InputTextCustom password value={repeatNewPassword} label={intl.formatMessage({id:"RepeatNewPassword"})} labelClassName="lightPrimaryText"></InputTextCustom>
            {/* <div className='flexible--row button-container'>
                <Button label={intl.formatMessage({id:"Confirm"})} className='buttonMain' onClick={handleClose}></Button>
            </div> */}
        </Modal>
  )
}
