import { Icon } from '@iconify/react';
import { Button } from 'primereact/button';
import React, { useContext, useState } from 'react'
import {useIntl} from 'react-intl'
import InputTextCustom from '../../../Inputs/InputText/InputTextCustom';
import ChangePasswordModal from '../../../Modal/ChangePasswordModal/ChangePasswordModal';
import './ChangePassword.scss'

import { appContext } from '../../../Context/appContext';

export default function ChangePassword() {
    const intl=useIntl(); 

    const [visibilityModal,setVisibilityModal]=useState(false);

    let settingsString: any = localStorage.getItem("settings");
    let settingsJson;
    
    if (settingsString)
        settingsJson = JSON.parse(settingsString)

    const {user}:any = useContext(appContext);
    
  return (
    <div className='flexible--column change-password-container '>
        <div className='flexible--row header-view-3'>
          <Icon icon="vaadin:user"></Icon>
          <h1 className='infoText textBold header-title'>{intl.formatMessage({id:"ChangePassword"})}</h1>
        </div>
        <div className='form-style flexible--column'>
            <p className=' textBold line-bottom title-color'>{user.firstname + " " + user.lastname}</p>
            <p>{intl.formatMessage({id:"User"})+": " + user.username}</p>
            <p>{intl.formatMessage({id:"Email"})+": " + user.email}</p>
            <p>{intl.formatMessage({id:"Mobile"})+": " + user.mobilephone.prefix+user.mobilephone.area+user.mobilephone.number}</p>
            
        </div>

            <div className='flexible--row '>
                <Button label={intl.formatMessage({id:"CreateNewPassword"})} className='buttonMain' onClick={()=>setVisibilityModal(true)} ></Button>
            </div>
            <ChangePasswordModal visible={visibilityModal} setVisible={setVisibilityModal}></ChangePasswordModal>
    </div>

    
  )
}
