
import { RadioButton } from 'primereact/radiobutton';
import { useContext, useEffect, useState } from 'react';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';
import { useIntl } from 'react-intl';
import "./PersonalDataForm.scss"
import InputTextCustom from '../../Inputs/InputText/InputTextCustom';
import { Calendar } from 'primereact/calendar';
import InputPhone from '../../Inputs/InputPhone/InputPhone';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import Combobox from '../../Combobox/Combobox';
import { getAllCities } from '../../../services/citiesService';
import { langContext } from '../../Context/langContext';
import InputDate from '../../Inputs/InputDate/InputDate';
import { isError } from '@jest/expect-utils';

export default function PersonalDataForm({setStep, user, setUser, setDisplayRegisterCancel}:any){
    const [validInputs, setValidInputs] = useState(false);
    const [cities, setCities] = useState();
    const [city, setCity]:any = useState(null);
    const [inputErrors, setInputErrors] = useState({
        firstname: {caption: "", isValid: true},
        lastname: {caption: "", isValid: true},
        birthdate: {caption: "", isValid: true},
        document: {caption: "", isValid: true},
        documentType: {caption: "", isValid: true},
        gender: {caption: "", isValid: true},
        mobilephone: {caption: "", isValid: true},
        address: {caption: "", isValid:true}
    })

    const {languageId}:any = useContext(langContext);

    const navigate = useNavigate();
    const intl = useIntl();
    const context:any=useContext(langContext);

    useEffect(()=>{
        getAllCities("",languageId).then(data=>{
            setCities(data);           
        })
    },[languageId]);

    useEffect(()=>{
        if(cities != undefined) {
            setUser({...user, city: cities[238]});
        }
           
    },[cities]);

    function onChangeRemoveError(field:any){
        let _inputErrors:any = {...inputErrors}
        _inputErrors[field].isValid = true
        _inputErrors[field].caption = ""
        setInputErrors(_inputErrors)
    }

    function validateData(){
        let valid = true;
        let _inputErrors:any = {...inputErrors}
        
        for(const ie in _inputErrors){
         
                if(!user[ie]){
                    _inputErrors[ie].caption = intl.formatMessage({id: "ThisFieldIsRequired"});
                    _inputErrors[ie].isValid = valid = false;
                }
        }

        if(user.mobilephone.area === "" || user.mobilephone.number === ""){
            _inputErrors.mobilephone.caption = intl.formatMessage({id: "ThisFieldIsRequired"});
            _inputErrors.mobilephone.isValid = valid = false;
        } //por ahora queda asi

        setInputErrors(_inputErrors);

        return valid
    }
    

    const documentOptions = [
        {label: intl.formatMessage({id: "ID"}), value: 1},
        {label: intl.formatMessage({id: "Foreign"}), value: 2}
    ]

    const genderOptions = [
        {label: intl.formatMessage({id: "Female"}), value:  "F"},
        {label: intl.formatMessage({id: "Male"}), value: "M"}
    ]

    return (
        <div className='flexible--column'>
            <RadioButtonGroup options={documentOptions} setValue={(docType:any)=>{
                setUser({...user, documentType: docType})
                onChangeRemoveError("documentType")
            }} labelId="DocumentType" value={user.documentType} className="radioGroup" orientation={"row"} error={!inputErrors.documentType.isValid} caption={inputErrors.documentType.caption}/>
         
            <InputTextCustom value={user.document} onChange={(e:any) => {
                setUser({...user, document: e.target.value})
                onChangeRemoveError("document")
                }} labelId="DocumentNumber" error={!inputErrors.document.isValid} caption={inputErrors.document.caption}/>

            <InputTextCustom value={user.firstname} onChange={(e:any) => {
                setUser({...user, firstname: e.target.value})
                onChangeRemoveError("firstname")
                }} labelId="Name" error={!inputErrors.firstname.isValid} caption={inputErrors.firstname.caption} />

            <InputTextCustom value={user.lastname} onChange={(e:any) => {
                setUser({...user, lastname: e.target.value})
                onChangeRemoveError("lastname")
                }} labelId="Lastname" error={!inputErrors.lastname.isValid} caption={inputErrors.lastname.caption}/>

            <RadioButtonGroup options={genderOptions} setValue={(gender:any)=>{
                setUser({...user, gender: gender})
                onChangeRemoveError("gender")
            }} labelId="Gender" value={user.gender} className="radioGroup" orientation={"row"} error={!inputErrors.gender.isValid} caption={inputErrors.gender.caption}/>

            <InputDate  value={user.birthdate} label={intl.formatMessage({id: "BirthDate"})} onChange={(e:any) => {
                setUser({...user, birthdate: e.value})
                onChangeRemoveError("birthdate")
            }} showIcon dateFormat="dd/mm/yy" maxDate={new Date()}  placeholder='dd/mm/aaaa' caption={inputErrors.birthdate.caption} error={!inputErrors.birthdate.isValid}/>

            <InputPhone labelId="Phone" value={user.mobilephone} setValue={(val:any, valField:any)=>{
                let _user = {...user}
                _user.mobilephone[valField] = val;
                setUser(_user);
                onChangeRemoveError("mobilephone")
            }} error={!inputErrors.mobilephone.isValid} caption={inputErrors.mobilephone.caption} />


            <InputTextCustom value={user.address} onChange={(e:any) => setUser({...user, address: e.target.value})} labelId="Address" error={!inputErrors.address.isValid} caption={inputErrors.address.caption} />

            <Combobox items={cities} label={intl.formatMessage({id:"City"})} optionLabel="location" value={user.city} placeholder={user.city?.description}  setValue={(c:any)=>{
                setUser({...user, city: c});
            }}/>

            <div className='flexible--row flex-end buttonContainer'>
                <Button label={intl.formatMessage({id: "Cancel"})} className='buttonMain3' onClick={()=>{setDisplayRegisterCancel(true)}}/>
                <Button icon="pi pi-angle-right" iconPos='right' label={intl.formatMessage({id: "Follow"})} onClick={()=>{
                    if (validateData()){
                        navigate("/register/2")
                    }}} className='buttonMain' />
            </div>
            
        </div>
    );
}