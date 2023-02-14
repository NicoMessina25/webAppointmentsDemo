import { Icon } from '@iconify/react'
import { Button } from 'primereact/button'
import React, { useRef, useState } from 'react'
import ProfileForm from '../../Forms/ProfileForm/ProfileForm'
import intl, { useIntl } from "react-intl"

export default function FamilyGroup() {
  const intl=useIntl();
  const [visibility,setVisibility]=useState(true);
  const formRef:any=useRef(null);

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
    <ProfileForm new addButton cancelButton isEditButtonClicked={visibility} ref={formRef}></ProfileForm>


    </div>
  )
}
