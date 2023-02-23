import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react'
import InputTextCustom from '../../Inputs/InputText/InputTextCustom'
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup'
import './ProfileForm.scss';
import { useIntl } from 'react-intl';
import InputDate from '../../Inputs/InputDate/InputDate';
import InputPhone from '../../Inputs/InputPhone/InputPhone';
import Combobox from '../../Combobox/Combobox';
import { Button } from 'primereact/button';
import { appContext } from '../../Context/appContext';
import { getMedicalCoverages, getPlans } from '../../../services/medicalCoverageService';
import { getCities } from '../../../services/citiesService';
import { addRelativeMedere, savePatientInfo } from '../../../services/UserService';
import ErrorModal from '../../Modal/ErrorModal/ErrorModal';

const ProfileForm=forwardRef( ({profile,setProfile, disable, isNew}:any,ref) => {



  const {user, setUser, returnValidPatientDTO, resetInputErrors, inputErrors, onChangeRemoveError}:any = useContext(appContext);


  const {getStorage}:any = useContext(appContext);

  let settings=getStorage().getItem("settings");
  
  const intl = useIntl();


  const genderOptions = [
      { label: intl.formatMessage({ id: "Female" }), value: "F" },
      { label: intl.formatMessage({ id: "Male" }), value: "M" }
  ]

  const documentOptions = [
    { label: intl.formatMessage({ id: "ID" }), value: 1 },
    { label: intl.formatMessage({ id: "Foreign" }), value: 2 }
  ]


  let yes = intl.formatMessage({id: "Yes"});
  let no = intl.formatMessage({id: "No"});

  const yesNo = [
    {label: yes, value: true},
    {label: no, value: false}
  ]






const [errorModalVisibility,setErrorModalVisibility]=useState(false)


useImperativeHandle(ref,()=>({
  cancelEdit(){
    setProfile({...user,mobilephone : {...user.mobilephone}});

    

    resetInputErrors();


  }
  ,
  saveChanges(){    
    let mobileString=profile.mobilephone.prefix+profile.mobilephone.number;

    savePatientInfo(profile,returnValidPatientDTO,mobileString).then(res=>{
      if(res.status===200 && res.data===true){
        setUser(profile);
        console.log(profile);
        return true
      }
      else{
        setErrorModalVisibility(true);
        return false
      }
      })
  },

  saveNewRelative(){

  }
}))

function addRelative(){
  let relative:any;
  relative={
    parentUserId:user._user,
    firstname:profile.firstname,
    lastname:profile.lastname,
    gender:profile.gender,
    birthdate:profile.birthdate,
    documenttype:profile.documentType,
    document:profile.document,
    healthpatientcoverage:{
      hasMedicalCoverage:profile.hasMedicalCoverage,
      voluntary:profile.isMedCoverageThroughJob,
      healthentity:profile.medicalCoverage,
      healthentityplan:profile.plan,
      affiliateNo:profile.memberNumber,
      noCredential:"",
      healthPatientCoverage:""
    }
  }
  
  console.log(relative)
  addRelativeMedere(relative).then(res=>{
    if(res.status!=200 || res.data===false){
      console.log("algo ha salido mal")
    }else{
      console.log("paciente guardado")
    }
  })
}

useEffect(() => {
  if (!isNew){
   setProfile({...user,mobilephone : {...user.mobilephone}})
  }

  
},[user])

  return (
    <div className='flexible--column profile-form-container'>
        {/* <div className='personal-data'> */}
            <div className='title textBold line-bottom title-color'>
            {intl.formatMessage({id:"PersonalData"})}
            </div>
        {/* </div > */}

        <div className="flexible--rowWrap space-between">  
          <InputTextCustom className=' profileFormInput' disable={disable} value={profile.firstname} label={intl.formatMessage({ id: "Name" })} onChange={(e:any)=>{
            setProfile({ ...profile, firstname: e.target.value })
            onChangeRemoveError("firstname")
            
            }} placeholder="" error={!inputErrors.firstname.isValid} caption={inputErrors.firstname.caption} />
            
          <InputTextCustom className=' profileFormInput' value={profile.lastname} label={intl.formatMessage({ id: "Lastname" })} onChange={(e:any)=>{
            setProfile({ ...profile, lastname: e.target.value })
            onChangeRemoveError("lastname")
            }} placeholder="" disable={disable} error={!inputErrors.lastname.isValid} caption={inputErrors.lastname.caption} />
        </div>

        <div className="flexible--rowWrap space-between">
          <RadioButtonGroup options={genderOptions} setValue={(gender: any) => {
                          setProfile({...profile, gender: gender})
                          onChangeRemoveError("gender")
                      }} label={intl.formatMessage({ id: "Gender" })} value={profile.gender} className="radioGroup  profileFormInput" orientation={"row"} 
                      disable={disable} error={!inputErrors.gender.isValid} caption={inputErrors.gender.caption} />
        
          
        <InputDate value={profile.birthdate} className=' profileFormInput' label={intl.formatMessage({id:"BirthDate"})} onChange={(e:any)=>{
          setProfile({...profile,birthdate:e.value})
          onChangeRemoveError("birthdate");
          }}  disable={disable} showIcon dateFormat="dd/mm/yy" maxDate={new Date()} placeholder='dd/mm/aaaa' error={!inputErrors.birthdate.isValid} caption={inputErrors.birthdate.caption} />

        </div>

        {/* <div className="flexible--row space-between">
          <RadioButtonGroup options={documentOptions} setValue={(docType: any) => {
                              setProfile({ ...profile, documentType: docType })
                          }} label={intl.formatMessage({ id: "DocumentType" })} value={profile.documentType} className="radioGroup  profileFormInput" orientation={"row"} error={!inputErrors.documentType.isValid} caption={inputErrors.documentType.caption} disable={!props.isEditButtonClicked}/>
            <InputTextCustom  className=' profileFormInput' value={profile.document} disable={!props.isEditButtonClicked} label="Document" onChange={(e:any)=>{
              setProfile({ ...profile, document: e.target.value })
            }} placeholder=""/>
        </div> */}
           
        <div className="flexible--rowWrap space-between">
          {!isNew && <InputTextCustom className=' profileFormInput' value={profile.address} disable={disable} label="Address" onChange={(e:any)=>{
            setProfile({...profile,address:e.target.value})
            onChangeRemoveError("address")
            }} placeholder="" error={!inputErrors.address.isValid} caption={inputErrors.address.caption} />}
          
          {!isNew && <Combobox className=' profileFormInput' getItems={getCities} label={intl.formatMessage({ id: "City" })} optionLabel="location" value={profile.city} placeholder={profile.city?.description} setValue={(c: any) => {
                        setProfile({ ...profile, city: c });
                        
                    }} disable={disable}  />}
        </div>

        <div className="flexible--rowWrap space-between">
          {!isNew && <InputPhone className=' profileFormInput' label={intl.formatMessage({ id: "Phone" })} value={profile.mobilephone} setValue={(val: any, valField: any) => {
                          let _profile = { ...profile }
                          _profile.mobilephone[valField] = val;
                          setProfile(_profile);
                          onChangeRemoveError("mobilephone")
                      }} 
                      disable={disable} error={!inputErrors.mobilephone.isValid} caption={inputErrors.mobilephone.caption} />}
            
          {!isNew && <InputTextCustom className=' profileFormInput' value={profile.email} label={intl.formatMessage({ id: "Email" })} onChange={(e:any)=>{
            setProfile({...profile,email:e.target.value})
            onChangeRemoveError("email")
            }} placeholder="" disable={disable} error={!inputErrors.email.isValid} caption={inputErrors.email.caption}/>}
        </div>
        
        <div className='flexible--column medicalCoverageDiv'>
            <div className='title textBold line-bottom title-color'>
            {intl.formatMessage({id:"MedicalCoverage"})}
            </div>

            <div className='flexible--rowWrap'>
              
              
              <RadioButtonGroup id={1} className='radioGroup profileFormInput' options={yesNo} value={profile.hasMedicalCoverage} setValue={(value:any)=>{
                setProfile({...profile, hasMedicalCoverage: value})
                onChangeRemoveError("hasMedicalCoverage")
                }} label={intl.formatMessage({id: "DoYouHaveMedicalCoverage?"})} orientation="row" error={!inputErrors.hasMedicalCoverage.isValid} caption={inputErrors.hasMedicalCoverage.caption} disable={disable}/>
      
              {profile.hasMedicalCoverage &&
                 
                  <RadioButtonGroup id={2} className='radioGroup profileFormInput' options={yesNo} value={profile.isMedCoverageThroughJob} setValue={(value:any)=>{
                      setProfile({...profile, isMedCoverageThroughJob: value})
                      onChangeRemoveError("isMedCoverageThroughJob")
                  }} label={intl.formatMessage({id: "IsThroughYourJob?"})} orientation="row" error={!inputErrors.isMedCoverageThroughJob.isValid} caption={inputErrors.isMedCoverageThroughJob.caption} disable={disable}/>
                
            }
            </div>
            { 
              profile.hasMedicalCoverage &&
              <div className='flexible--rowWrap number-container space-between'>

              <Combobox label={intl.formatMessage({id: "PrepaidHealthInsurance"})} className="profileFormInput" placeholder={profile.medicalCoverage?.name || intl.formatMessage({id: "Select"})} getItems={getMedicalCoverages} value={profile.medicalCoverage} setValue={(p:any)=>{
                      setProfile({...profile, medicalCoverage: p});
                      onChangeRemoveError("medicalCoverage")
                      
                  }} optionLabel="name" error={!inputErrors.medicalCoverage.isValid} caption={inputErrors.medicalCoverage.caption}disable={disable} />

                <Combobox label={intl.formatMessage({id:"Plan"})} className="profileFormInput" placeholder={intl.formatMessage({id: "Select"})} getItems={(inputText:any, offSet:any, pageSize:any)=>{
                                    return getPlans(inputText, offSet, pageSize, profile.medicalCoverage?.entityid)
                                }} value={profile.plan} setValue={(p:any)=>{
                                    setProfile({...profile, plan: p})
                                    onChangeRemoveError("plan");
                                }} optionLabel="name" reLoadItemsValue={profile.medicalCoverage} error={!inputErrors.plan.isValid} caption={inputErrors.plan.caption} disable={disable}/>
              
              <InputTextCustom label={intl.formatMessage({ id: "NumberOfMember" })} className="profileFormInput"  value={profile.affiliateNo} onChange={(e:any)=>{
                      setProfile({...profile, affiliateNo: e.target.value})
                      onChangeRemoveError("affiliateNo");
                  }} error={!inputErrors.affiliateNo.isValid} caption={inputErrors.affiliateNo.caption} disable={disable}/>
              
              </div>
            }
          </div>
          
          <ErrorModal visible={errorModalVisibility} setVisible={setErrorModalVisibility}></ErrorModal>
          
          {
            isNew && 
            <div className='flexible--row CRUDbuttons'>
              <Button icon='pi pi-times' iconPos='left' className='buttonMain3' label={intl.formatMessage({id:"Cancel"})} ></Button>
              <Button className='buttonMain' label={intl.formatMessage({id:"Add"})} onClick={addRelative}></Button>
            </div>
          }
    </div>
  )
}
)

export default ProfileForm;