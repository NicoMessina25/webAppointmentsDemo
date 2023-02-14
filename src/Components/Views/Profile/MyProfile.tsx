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

  const [buttonClassname,setButtonClassname]=useState("buttonMain2 buttonSave margin-0")

  function handleEditClick(){
    setEditButtonVisibility(!isEditButtonVisible);
    setCancelButtonVisibility(!isCancelButtonVisibility)

    if(isEditButtonVisible==true && isCancelButtonVisibility==true){
      setButtonClassname("buttonMain2 buttonSave margin-0");
      formRef.current.saveChanges();
    }else{
      setButtonClassname("buttonMain buttonSave margin-0");
    }
  }

  function handleCancelClick(){
    if(isCancelButtonVisibility==true){
      setButtonClassname("buttonMain2 buttonSave margin-0");
    }
    setEditButtonVisibility(!isEditButtonVisible);
    setCancelButtonVisibility(!isCancelButtonVisibility)
    
  formRef.current.cancelEdit();
}

  return (
    <div className='flexible--column my-profile-container'>
      {/* HEADER */}
      <div className='flexible--row header-view-2'>
        <div className='flexible--row header-container'>
          <Icon icon="vaadin:user"></Icon>
          <div className='infoText textBold header-title'>{intl.formatMessage({id:"ProfileData"})}</div>
        </div>
        <Button className='buttonMain2 buttonSave' visible={isEditButtonVisible} onClick={handleCancelClick} label={intl.formatMessage({id:"Cancel"})} ></Button>
        <Button className={`${buttonClassname}`} onClick={handleEditClick} label={!isEditButtonVisible ? intl.formatMessage({id:"Edit"}) : intl.formatMessage({id:"SaveChanges"})} ></Button>

      </div>
    {/* HEADER */}
    <ProfileForm email address city mobilePhone isEditButtonClicked={isEditButtonVisible}  ref={formRef}></ProfileForm>


    </div>
  )
}
