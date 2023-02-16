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



  const {user, setUser, returnValidPatientDTO, inputErrors, onChangeRemoveError}:any = useContext(appContext);


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
  }
  ,
  saveChanges(){    
    let mobileString=profile.mobilephone.prefix+profile.mobilephone.area+profile.mobilephone.number;

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

        <div className="flexible--row space-between">  
          <InputTextCustom className='width-50' disable={disable} value={profile.firstname} label={intl.formatMessage({ id: "Name" })} onChange={(e:any)=>{setProfile({ ...profile, firstname: e.target.value })}} placeholder=""/>
            
          <InputTextCustom className='width-50' value={profile.lastname} label={intl.formatMessage({ id: "Lastname" })} onChange={(e:any)=>{setProfile({ ...profile, lastname: e.target.value })}} placeholder="" disable={disable}/>
        </div>

        <div className="flexible--row space-between">
          <RadioButtonGroup options={genderOptions} setValue={(gender: any) => {
                          setProfile({...profile, gender: gender})
                      }} label={intl.formatMessage({ id: "Gender" })} value={profile.gender} className="radioGroup width-50" orientation={"row"} 
                      disable={disable}/>
        
          
        <InputDate value={profile.birthdate} className='width-50' label={intl.formatMessage({id:"BirthDate"})} onChange={(e:any)=>{setProfile({...profile,birthdate:e.value})}}  disable={disable} showIcon dateFormat="dd/mm/yy" maxDate={new Date()} placeholder='dd/mm/aaaa'/>

        </div>

        {/* <div className="flexible--row space-between">
          <RadioButtonGroup options={documentOptions} setValue={(docType: any) => {
                              setProfile({ ...profile, documentType: docType })
                          }} label={intl.formatMessage({ id: "DocumentType" })} value={profile.documentType} className="radioGroup width-50" orientation={"row"} error={!inputErrors.documentType.isValid} caption={inputErrors.documentType.caption} disable={!props.isEditButtonClicked}/>
            <InputTextCustom  className='width-50' value={profile.document} disable={!props.isEditButtonClicked} label="Document" onChange={(e:any)=>{
              setProfile({ ...profile, document: e.target.value })
            }} placeholder=""/>
        </div> */}
           
        <div className="flexible--row space-between">
          {!isNew && <InputTextCustom className='width-50' value={profile.address} disable={disable} label="Address" onChange={(e:any)=>{setProfile({...profile,address:e.target.value})}} placeholder=""/>}
          
          {!isNew && <Combobox className='width-50' getItems={getCities} label={intl.formatMessage({ id: "City" })} optionLabel="location" value={profile.city} placeholder={profile.city?.description} setValue={(c: any) => {
                        setProfile({ ...profile, city: c });
                    }} disable={disable}/>}
        </div>

        <div className="flexible--row space-between">
          {!isNew && <InputPhone className='width-50' label={intl.formatMessage({ id: "Phone" })} value={profile.mobilephone} setValue={(val: any, valField: any) => {
                          let _profile = { ...profile }
                          _profile.mobilephone[valField] = val;
                          setProfile(_profile);
                      }} 
                      disable={disable}/>}
            
          {!isNew && <InputTextCustom className='width-50' value={profile.email} label={intl.formatMessage({ id: "Email" })} onChange={(e:any)=>{setProfile({...profile,email:e.target.value})}} placeholder="" disable={disable}/>}
        </div>
        
        <div className='flexible--column'>
            <div className='title textBold margin-bottom-1'>
                {intl.formatMessage({id:"MedicalCoverage"})}
            </div>

            <div className='flexible--row'>
              
              <div className="width-20">
              <RadioButtonGroup id={1} className='radioGroup margin-right-rbg' options={yesNo} value={profile.hasMedicalCoverage} setValue={(value:any)=>{
                setProfile({...profile, hasMedicalCoverage: value})
                onChangeRemoveError("hasMedicalCoverage")
                }} label={intl.formatMessage({id: "DoYouHaveMedicalCoverage?"})} orientation="row" error={!inputErrors.hasMedicalCoverage.isValid} caption={inputErrors.hasMedicalCoverage.caption} disable={disable}/>
              </div>
              {profile.hasMedicalCoverage &&
                  <div className="width-20">
                  <RadioButtonGroup id={2} className='radioGroup' options={yesNo} value={profile.isMedCoverageThroughJob} setValue={(value:any)=>{
                      setProfile({...profile, isMedCoverageThroughJob: value})
                      onChangeRemoveError("isMedCoverageThroughJob")
                  }} label={intl.formatMessage({id: "IsThroughYourJob?"})} orientation="row" error={!inputErrors.isMedCoverageThroughJob.isValid} caption={inputErrors.isMedCoverageThroughJob.caption} disable={disable}/>
                </div>
            }
            </div>
            { 
              profile.hasMedicalCoverage &&
              <div className='flexible--row number-container space-between'>

              <Combobox label={intl.formatMessage({id: "PrepaidHealthInsurance"})} placeholder={profile.medicalCoverage?.name || intl.formatMessage({id: "Select"})} className="combobox" getItems={getMedicalCoverages} value={profile.medicalCoverage} setValue={(p:any)=>{
                      setProfile({...profile, medicalCoverage: p});
                      onChangeRemoveError("medicalCoverage")
                      
                  }} optionLabel="name" error={!inputErrors.medicalCoverage.isValid} caption={inputErrors.medicalCoverage.caption}disable={disable} />

                <Combobox label={intl.formatMessage({id:"Plan"})} className="combobox" placeholder={intl.formatMessage({id: "Select"})} getItems={(inputText:any, offSet:any, pageSize:any)=>{
                                    return getPlans(inputText, offSet, pageSize, profile.medicalCoverage?.entityid)
                                }} value={profile.plan} setValue={(p:any)=>{
                                    setProfile({...profile, plan: p})
                                    onChangeRemoveError("plan");
                                }} optionLabel="name" reLoadItemsValue={profile.medicalCoverage} error={!inputErrors.plan.isValid} caption={inputErrors.plan.caption} disable={disable}/>
              
              <InputTextCustom label={intl.formatMessage({ id: "NumberOfMember" })}  value={profile.affiliateNo} onChange={(e:any)=>{
                      setProfile({...profile, affiliateNo: e.target.value})
                      onChangeRemoveError("memberNumber");
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