import { InputText } from 'primereact/inputtext'
import React, { useContext, useState } from 'react'
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

export default function ProfileForm({isButtonClicked}:any) {

  const {user}:any = useContext(appContext);
  const {setUser}:any = useContext(appContext);

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

const [loadMoreFields, setLoadMoreFields] = useState(user.firstname !== "");


  return (
    <div className='flexible--column profile-form-container'>
        <div className='personal-data'>
            <div className='title textBold'>
            {intl.formatMessage({id:"PersonalData"})}
            </div>
        </div >

        <div className="flexible--row space-between">  
          <InputTextCustom className='width-50' disable={!isButtonClicked} value={user.firstname} labelId="Name" onChange={(e:any)=>{setName(e.target.value)}} placeholder=""/>
            
          <InputTextCustom className='width-50' value={user.lastname} labelId="Lastname" onChange={(e:any)=>{}} placeholder="" disable={!isButtonClicked}/>
        </div>

        <div className="flexible--row space-between">
          <RadioButtonGroup options={genderOptions} setValue={(gender: any) => {
                          setUser({ ...user, gender: gender })
                          onChangeRemoveError("gender")
                      }} label={intl.formatMessage({ id: "Gender" })} value={user.gender} className="radioGroup width-50" orientation={"row"} error={!inputErrors2.gender.isValid} caption={inputErrors2.gender.caption} disable={!isButtonClicked}/>
        
          
        <InputDate value={user.birthdate} className='width-50' label={intl.formatMessage({id:"BirthDate"})} onChange={(e:any)=>{}} placeholder="" disable={!isButtonClicked}/>

        </div>

        <div className="flexible--row space-between">
          <RadioButtonGroup options={documentOptions} setValue={(docType: any) => {
                              setUser({ ...user, documentType: docType })
                              onChangeRemoveError("documentType")
                              setLoadMoreFields(false)
                          }} label={intl.formatMessage({ id: "DocumentType" })} value={user.documentType} className="radioGroup width-50" orientation={"row"} error={!inputErrors2.documentType.isValid} caption={inputErrors2.documentType.caption} disable={!isButtonClicked}/>
            <InputTextCustom  className='width-50' value={user.document} disable={!isButtonClicked} labelId="Document" onChange={(e:any)=>{}} placeholder=""/>
        </div>

        <div className="flexible--row space-between">
          <InputTextCustom className='width-50' value={user.address} disable={!isButtonClicked} labelId="Address" onChange={(e:any)=>{}} placeholder=""/>
          <InputTextCustom className='width-50' value={user.city.location} labelId="City" onChange={(e:any)=>{}} placeholder="" disable={!isButtonClicked}/>
        </div>

        <div className="flexible--row space-between">
          <InputPhone className='width-50' labelId="Phone" value={user.mobilephone} setValue={(val: any, valField: any) => {
                          let _user = { ...user }
                          _user.mobilephone[valField] = val;
                          setUser(_user);
                          onChangeRemoveError("mobilephone")
                      }} error={!inputErrors2.mobilephone.isValid} caption={inputErrors2.mobilephone.caption} disable={!isButtonClicked}/>
                  
          <InputTextCustom className='width-50' value={user.email} labelId="Email" onChange={(e:any)=>{}} placeholder="" disable={!isButtonClicked}/>
        </div>
        
        <div className='flexible--column'>
            <div className='title textBold'>
                {intl.formatMessage({id:"MedicalCoverage"})}
            </div>

            <div className='flexible--row'>
              
              <div className="width-20">
              <RadioButtonGroup id={1} className='radioGroup ' options={yesNo} value={user.hasMedicalCoverage} setValue={(value:any)=>{
                setUser({...user, hasMedicalCoverage: value})
                onChangeRemoveError("hasMedicalCoverage")
                }} label={intl.formatMessage({id: "DoYouHaveMedicalCoverage?"})} orientation="row" error={!inputErrors.hasMedicalCoverage.isValid} caption={inputErrors.hasMedicalCoverage.caption} disable={!isButtonClicked}/>
              </div>
              <div className="width-20">
              <RadioButtonGroup id={2} className='radioGroup' options={yesNo} value={user.isMedCoverageThroughJob} setValue={(value:any)=>{
                  setUser({...user, isMedCoverageThroughJob: value})
                  onChangeRemoveError("isMedCoverageThroughJob")
              }} label={intl.formatMessage({id: "IsThroughYourJob?"})} orientation="row" error={!inputErrors.isMedCoverageThroughJob.isValid} caption={inputErrors.isMedCoverageThroughJob.caption} disable={!isButtonClicked}/>
            </div>
            </div>
            <div className='flexible--row number-container space-between'>

            <Combobox label={intl.formatMessage({id: "PrepaidHealthInsurance"})} placeholder={user.medicalCoverage?.name || intl.formatMessage({id: "Select"})} className="combobox" getItems={getMedicalCoverages} value={user.medicalCoverage} setValue={(p:any)=>{
                    setUser({...user, medicalCoverage: p});
                    onChangeRemoveError("medicalCoverage")
                    
                }} optionLabel="name" error={!inputErrors.medicalCoverage.isValid} caption={inputErrors.medicalCoverage.caption}disable={!isButtonClicked} />

              <Combobox label={intl.formatMessage({id:"Plan"})} className="combobox" placeholder={intl.formatMessage({id: "Select"})} getItems={(inputText:any, offSet:any, pageSize:any)=>{
                                  return getPlans(inputText, offSet, pageSize, user.medicalCoverage?.entityid)
                              }} value={user.plan} setValue={(p:any)=>{
                                  setUser({...user, plan: p})
                                  onChangeRemoveError("plan");
                              }} optionLabel="name" reLoadItemsValue={user.medicalCoverage} error={!inputErrors.plan.isValid} caption={inputErrors.plan.caption} disable={!isButtonClicked}/>
            
            <InputTextCustom labelId="NumberOfMember"  value={user.memberNumber} onChange={(e:any)=>{
                    setUser({...user, memberNumber: e.target.value})
                    onChangeRemoveError("memberNumber");
                }} error={!inputErrors.memberNumber.isValid} caption={inputErrors.memberNumber.caption} disable={!isButtonClicked}/>
            
            </div>
            
          </div>

          <div className='flexible--column'>
            <div className='title textBold'>
                {intl.formatMessage({id:"Security"})}
            </div>
            <div className='flexible--row'>
              {intl.formatMessage({id:"SecurityMessage"})}
            </div>
            
            <div className='flexible--row width-100'>
              
              {/* <div className='flexible--row width-50-centered'> */}
              <RadioButtonGroup className='width-25' id={3} options={sendOptions} value={user.hasMedicalCoverage} setValue={(value:any)=>{
                setUser({...user, hasMedicalCoverage: value})
              }} orientation="row" />
              {/* </div> */}
         
            <Button icon="pi pi-check" label="Cambiar contraseña" className='buttonMain3'></Button>

            </div>
          </div>
    </div>
  )
}
