import { Icon } from '@iconify/react'
import { Button } from 'primereact/button'
import React, { useState } from 'react'
import { useIntl } from 'react-intl';
import ProfileForm from '../../Forms/ProfileForm/ProfileForm';
import './MyProfile.scss'

export default function MyProfile() {

  const intl = useIntl();
  const [isEditButtonClicked, setEditButtonClicked] = useState(false);
  const [isCancelButtonClicked, setCancelButtonClicked] = useState(false);


  const [buttonClassname,setButtonClassname]=useState("buttonMain2 buttonSave")

  function handleEditClick(){
    setEditButtonClicked(!isEditButtonClicked);
    isEditButtonClicked ? setButtonClassname("buttonMain2 buttonSave") : setButtonClassname("buttonMain buttonSave");
    
  }

  function handleCancelClick(){
    handleEditClick();
    //dejar campos como estaban
  }

  return (
    <div className='flexible--column my-profile-container'>
      {/* HEADER */}
      <div className='flexible--row my-profile-header'>
        <div className='flexible--row my-profile-header-container'>
          <Icon icon="vaadin:user"></Icon>
          <div className='infoText textBold my-profile-header-title'>Datos de perfil</div>
        </div>
        <Button className='buttonMain2 buttonSave' visible={isEditButtonClicked} onClick={handleCancelClick} label={intl.formatMessage({id:"Cancel"})} ></Button>
        <Button className={`${buttonClassname}`} onClick={handleEditClick} label={!isEditButtonClicked ? intl.formatMessage({id:"Edit"}) : intl.formatMessage({id:"SaveChanges"})} ></Button>

      </div>
    {/* HEADER */}
    <ProfileForm isButtonClicked={isEditButtonClicked} isCancelButtonClicked={isCancelButtonClicked} ></ProfileForm>


    </div>
  )
}
