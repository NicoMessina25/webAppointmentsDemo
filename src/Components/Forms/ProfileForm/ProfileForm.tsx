import { InputText } from 'primereact/inputtext'
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
import { useLocation } from 'react-router-dom';
import {PhoneNumberFormat, PhoneNumberUtil}  from  'google-libphonenumber';

const ProfileForm=forwardRef( (props:any,ref) => {

  const {user}:any = useContext(appContext);
  const {setUser}:any = useContext(appContext);
  const {getDefaultPatient}:any = useContext(appContext);
  const {returnValidPatientDTO}:any = useContext(appContext);

  let settings=localStorage.getItem("settings");
  
  const intl = useIntl();
  const [name,setName]=useState("");
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

const sendOptions = [
  { value: "Email", label: "Email" },
  { value: "SMS", label: "SMS" }
];

const [sendOption,setSendOption]=useState("");



function onChangeRemoveError(field:any){
  let _inputErrors:any = {...inputErrors}
  _inputErrors[field].isValid = true
  _inputErrors[field].caption = ""
  setInputErrors(_inputErrors)
}

const [inputErrors, setInputErrors] = useState({
  hasMedicalCoverage: {caption: "", isValid: true},
  isMedCoverageThroughJob: {caption: "", isValid:true},
  medicalCoverage: {caption: "", isValid: true},
  plan: {caption: "", isValid: true},
  memberNumber: {caption: "", isValid: true},
})

const [inputErrors2, setInputErrors2] = useState({
  firstname: { caption: "", isValid: true },
  lastname: { caption: "", isValid: true },
  birthdate: { caption: "", isValid: true },
  document: { caption: "", isValid: true },
  documentType: { caption: "", isValid: true },
  gender: { caption: "", isValid: true },
  mobilephone: { caption: "", isValid: true },
  address: { caption: "", isValid: true }
})


const [patient,setPatient]=useState({...user,mobilephone : {...user.mobilephone}});

const [errorModalVisibility,setErrorModalVisibility]=useState(false)


useImperativeHandle(ref,()=>({
  cancelEdit(){
    setPatient({...user,mobilephone : {...user.mobilephone}});
  }
  ,
  saveChanges(){
    
    let mobileString=user.mobilephone.prefix+user.mobilephone.area+user.mobilephone.number;
    savePatientInfo(patient,returnValidPatientDTO,mobileString).then(res=>{
      if(res.status===200 && res.data===true){
        setUser(patient);
      }
      else{
        setErrorModalVisibility(true);
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
    firstname:patient.firstname,
    lastname:patient.lastname,
    gender:patient.gender,
    birthdate:patient.birthdate,
    documenttype:patient.documentType,
    document:patient.document,
    healthpatientcoverage:{
      hasMedicalCoverage:patient.hasMedicalCoverage,
      voluntary:patient.isMedCoverageThroughJob,
      healthentity:patient.medicalCoverage,
      healthentityplan:patient.plan,
      affiliateNo:patient.memberNumber,
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
  if (props.edit){
    setPatient({...user,mobilephone : {...user.mobilephone}})
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
          <InputTextCustom className='width-50' disable={!props.isEditButtonClicked} value={patient.firstname} label={intl.formatMessage({ id: "Name" })} onChange={(e:any)=>{setPatient({ ...patient, firstname: e.target.value })}} placeholder=""/>
            
          <InputTextCustom className='width-50' value={patient.lastname} label={intl.formatMessage({ id: "Lastname" })} onChange={(e:any)=>{setPatient({ ...patient, lastname: e.target.value })}} placeholder="" disable={!props.isEditButtonClicked}/>
        </div>

        <div className="flexible--row space-between">
          <RadioButtonGroup options={genderOptions} setValue={(gender: any) => {
                          setPatient({...patient, gender: gender})
                      }} label={intl.formatMessage({ id: "Gender" })} value={patient.gender} className="radioGroup width-50" orientation={"row"} 
                      disable={!props.isEditButtonClicked}/>
        
          
        <InputDate value={patient.birthdate} className='width-50' label={intl.formatMessage({id:"BirthDate"})} onChange={(e:any)=>{setPatient({...patient,birthdate:e.value})}}  disable={!props.isEditButtonClicked} showIcon dateFormat="dd/mm/yy" maxDate={new Date()} placeholder='dd/mm/aaaa'/>

        </div>

        <div className="flexible--row space-between">
          <RadioButtonGroup options={documentOptions} setValue={(docType: any) => {
                              setPatient({ ...patient, documentType: docType })
                          }} label={intl.formatMessage({ id: "DocumentType" })} value={patient.documentType} className="radioGroup width-50" orientation={"row"} error={!inputErrors2.documentType.isValid} caption={inputErrors2.documentType.caption} disable={!props.isEditButtonClicked}/>
            <InputTextCustom  className='width-50' value={patient.document} disable={!props.isEditButtonClicked} label="Document" onChange={(e:any)=>{
              setPatient({ ...patient, document: e.target.value })
            }} placeholder=""/>
        </div>
           
        <div className="flexible--row space-between">
          {props.address && 
            <InputTextCustom className='width-50' value={patient.address} disable={!props.isEditButtonClicked} label="Address" onChange={(e:any)=>{setPatient({...patient,address:e.target.value})}} placeholder=""/>
          }
          {props.city && 
            <Combobox className='width-50' getItems={getCities} label={intl.formatMessage({ id: "City" })} optionLabel="location" value={patient.city} placeholder={patient.     city?.  description} setValue={(c: any) => {
                        setPatient({ ...patient, city: c });
                    }} disable={!props.isEditButtonClicked}/>
                  }
          </div>

        <div className="flexible--row space-between">
          {props.mobilePhone && 
            <InputPhone className='width-50' label={intl.formatMessage({ id: "Phone" })} value={patient.mobilephone} setValue={(val: any, valField: any) => {
                          let _patient = { ...patient }
                          _patient.mobilephone[valField] = val;
                          setPatient(_patient);
                      }} 
                      disable={!props.isEditButtonClicked}/>
          }
          {props.email && 
            <InputTextCustom className='width-50' value={patient.email} label={intl.formatMessage({ id: "Email" })} onChange={(e:any)=>{setPatient({...patient,email:e.target.value})}} placeholder="" disable={!props.isEditButtonClicked}/>
          }
        </div>
        
        <div className='flexible--column'>
            <div className='title textBold margin-bottom-1'>
                {intl.formatMessage({id:"MedicalCoverage"})}
            </div>

            <div className='flexible--row'>
              
              <div className="width-20">
              <RadioButtonGroup id={1} className='radioGroup margin-right-rbg' options={yesNo} value={patient.hasMedicalCoverage} setValue={(value:any)=>{
                setPatient({...patient, hasMedicalCoverage: value})
                //onChangeRemoveError("hasMedicalCoverage")
                }} label={intl.formatMessage({id: "DoYouHaveMedicalCoverage?"})} orientation="row" error={!inputErrors.hasMedicalCoverage.isValid} caption={inputErrors.hasMedicalCoverage.caption} disable={!props.isEditButtonClicked}/>
              </div>
              {patient.hasMedicalCoverage &&
                  <div className="width-20">
                  <RadioButtonGroup id={2} className='radioGroup' options={yesNo} value={patient.isMedCoverageThroughJob} setValue={(value:any)=>{
                      setPatient({...patient, isMedCoverageThroughJob: value})
                      //onChangeRemoveError("isMedCoverageThroughJob")
                  }} label={intl.formatMessage({id: "IsThroughYourJob?"})} orientation="row" error={!inputErrors.isMedCoverageThroughJob.isValid} caption={inputErrors.isMedCoverageThroughJob.caption} disable={!props.isEditButtonClicked}/>
                </div>
            }
            </div>
            { 
              patient.hasMedicalCoverage &&
              <div className='flexible--row number-container space-between'>

              <Combobox label={intl.formatMessage({id: "PrepaidHealthInsurance"})} placeholder={patient.medicalCoverage?.name || intl.formatMessage({id: "Select"})} className="combobox" getItems={getMedicalCoverages} value={patient.medicalCoverage} setValue={(p:any)=>{
                      setPatient({...patient, medicalCoverage: p});
                      //onChangeRemoveError("medicalCoverage")
                      
                  }} optionLabel="name" error={!inputErrors.medicalCoverage.isValid} caption={inputErrors.medicalCoverage.caption}disable={!props.isEditButtonClicked} />

                <Combobox label={intl.formatMessage({id:"Plan"})} className="combobox" placeholder={intl.formatMessage({id: "Select"})} getItems={(inputText:any, offSet:any, pageSize:any)=>{
                                    return getPlans(inputText, offSet, pageSize, patient.medicalCoverage?.entityid)
                                }} value={patient.plan} setValue={(p:any)=>{
                                    setPatient({...patient, plan: p})
                                    //onChangeRemoveError("plan");
                                }} optionLabel="name" reLoadItemsValue={patient.medicalCoverage} error={!inputErrors.plan.isValid} caption={inputErrors.plan.caption} disable={!props.isEditButtonClicked}/>
              
              <InputTextCustom label={intl.formatMessage({ id: "NumberOfMember" })}  value={patient.memberNumber} onChange={(e:any)=>{
                      setPatient({...patient, memberNumber: e.target.value})
                      //onChangeRemoveError("memberNumber");
                  }} error={!inputErrors.memberNumber.isValid} caption={inputErrors.memberNumber.caption} disable={!props.isEditButtonClicked}/>
              
              </div>
            }
          </div>
          
          <ErrorModal visible={errorModalVisibility} setVisible={setErrorModalVisibility}></ErrorModal>
          
          {
            props.addButton && 
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