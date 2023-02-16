import { Icon } from '@iconify/react'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast';
import React, { useContext, useRef, useState } from 'react'
import { useIntl } from 'react-intl';
import { appContext } from '../../Context/appContext';
import ProfileForm from '../../Forms/ProfileForm/ProfileForm';
import './MyProfile.scss'

export default function MyProfile() {

  const intl = useIntl();
  const [isEditing, setEditing]:any = useState(false);
  const formRef:any=useRef(null);
  const toast:any = useRef(null);
  const {user, validateData}:any = useContext(appContext);
  const [profile,setProfile]=useState({...user,mobilephone : {...user.mobilephone}});

  let inputFields = ["firstname", "lastname", "email", "birthdate", "gender", "mobilephone", "address", "hasMedicalCoverage"];


  function handleSaveClick(){
    if(profile.hasMedicalCoverage){
      inputFields.push("isMedCoverageThroughJob", "medicalCoverage", "plan", "affiliateNo")
    }
    if(validateData(inputFields, profile)){
      formRef.current.saveChanges()
      setEditing(!isEditing);
      toast.current?.show({ severity: 'success', summary: intl.formatMessage({id:"Success"}) + "!", detail: intl.formatMessage({ id: "ChangesSavedSuccessfully" }) })
    } else {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: intl.formatMessage({ id: "ChangesCouldNotBeSaved" }) });
    }
    
    
  }

  function handleEditCancelClick(){
    
    if(isEditing){
      formRef.current.cancelEdit();
    }
    
    setEditing(!isEditing);

    
  
}

  return (
    <div className='flexible--column my-profile-container'>
      {/* HEADER */}
      <div className='flexible--row header-view-2'>
        <div className='flexible--row header-container'>
          <Icon icon="vaadin:user"></Icon>
          <div className='infoText textBold header-title'>{intl.formatMessage({id:"ProfileData"})}</div>
        </div>
        <Button className='buttonMain2 buttonWidth--maxContent' onClick={handleEditCancelClick} label={isEditing ? intl.formatMessage({id:"Cancel"}): intl.formatMessage({id:"Edit"}) } ></Button>
        {isEditing && <Button className={"buttonMain buttonWidth--maxContent"} onClick={handleSaveClick} label={intl.formatMessage({id:"SaveChanges"})} ></Button>}

      </div>
    {/* HEADER */}
    <ProfileForm profile={profile} setProfile={setProfile} disable={!isEditing} ref={formRef}></ProfileForm>
    <Toast ref={toast} />

    </div>
  )
}
