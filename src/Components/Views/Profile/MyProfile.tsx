import { Icon } from '@iconify/react'
import { Button } from 'primereact/button'
import React, { useRef, useState } from 'react'
import { useIntl } from 'react-intl';
import ProfileForm from '../../Forms/ProfileForm/ProfileForm';
import './MyProfile.scss'

export default function MyProfile() {

  const intl = useIntl();
  const [isEditButtonVisible, setEditButtonVisibility]:any = useState(false);
  const [isCancelButtonVisibility, setCancelButtonVisibility] = useState(false);
  const formRef:any=useRef(null);

  const [buttonClassname,setButtonClassname]=useState("buttonMain2 buttonSave")

  function handleEditClick(){
    setEditButtonVisibility(!isEditButtonVisible);
    setCancelButtonVisibility(!isCancelButtonVisibility)

    if(isEditButtonVisible==true && isCancelButtonVisibility==true){
      setButtonClassname("buttonMain2 buttonSave");
      formRef.current.saveChanges();
    }else{
      setButtonClassname("buttonMain buttonSave");
    }
  }

  function handleCancelClick(){
    if(isCancelButtonVisibility==true){
      setButtonClassname("buttonMain2 buttonSave");
    }
    setEditButtonVisibility(!isEditButtonVisible);
    setCancelButtonVisibility(!isCancelButtonVisibility)
    
  formRef.current.cancelEdit();
}

  return (
    <div className='flexible--column my-profile-container'>
      {/* HEADER */}
      <div className='flexible--row my-profile-header'>
        <div className='flexible--row my-profile-header-container'>
          <Icon icon="vaadin:user"></Icon>
          <div className='infoText textBold my-profile-header-title'>Datos de perfil</div>
        </div>
        <Button className='buttonMain2 buttonSave' visible={isEditButtonVisible} onClick={handleCancelClick} label={intl.formatMessage({id:"Cancel"})} ></Button>
        <Button className={`${buttonClassname}`} onClick={handleEditClick} label={!isEditButtonVisible ? intl.formatMessage({id:"Edit"}) : intl.formatMessage({id:"SaveChanges"})} ></Button>

      </div>
    {/* HEADER */}
    <ProfileForm isEditButtonClicked={isEditButtonVisible}  ref={formRef}></ProfileForm>


    </div>
  )
}
