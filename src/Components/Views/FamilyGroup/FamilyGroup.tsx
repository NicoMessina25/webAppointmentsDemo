import { Icon } from '@iconify/react'
import { Button } from 'primereact/button'
import React, { useContext, useRef, useState } from 'react'
import ProfileForm from '../../Forms/ProfileForm/ProfileForm'
import intl, { useIntl } from "react-intl"
import { appContext } from '../../Context/appContext'

export default function FamilyGroup() {
  const intl=useIntl();
  const [visibility,setVisibility]=useState(true);
  const formRef:any=useRef(null);
  const {user}:any = useContext(appContext);
  const [profile,setProfile]=useState({mobilephone:{}});

  return (
    <div className='flexible--column my-profile-container'>
      {/* HEADER */}
      <div className='flexible--row header-view-2'>
        <div className='flexible--row header-container'>
          <Icon icon="vaadin:user"></Icon>
          <div className='infoText textBold header-title'>{intl.formatMessage({id:"AddRelative"})}</div>
        </div>
        

      </div>
    {/* HEADER */}
    <ProfileForm isNew addButton cancelButton isEditButtonClicked={visibility} ref={formRef} profile={profile} setProfile={setProfile} ></ProfileForm>


    </div>
  )
}
