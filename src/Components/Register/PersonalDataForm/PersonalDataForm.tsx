
import { RadioButton } from 'primereact/radiobutton';
import { useEffect, useState } from 'react';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';
import { useIntl } from 'react-intl';
import "./PersonalDataForm.scss"
import InputTextCustom from '../../Inputs/InputText/InputTextCustom';
import { Calendar } from 'primereact/calendar';
import InputPhone from '../../Inputs/InputPhone/InputPhone';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import Combobox from '../../Combobox/Combobox';
import { getAllCities } from '../../../services/citiesService';

import { useContext } from "react";
import { langContext } from '../../Context/langContext';

export default function PersonalDataForm({setStep, user, setUser, setDisplayRegisterCancel}:any){
    const [validInputs, setValidInputs] = useState(false);
    const [cities, setCities] = useState();
    const [city, setCity]:any = useState(null);
    

    const intl = useIntl();
    const context:any=useContext(langContext);

    useEffect(()=>{
        getAllCities('mar del plata',context.languageId).then(data=>{
            setCities(data);           
        })
    },[]);

    useEffect(()=>{
        if(cities != undefined) {
            setCity(cities[0]);
        }
           
    },[cities])
    

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
            }} labelId="DocumentType" value={user.documentType} className="radioGroup" orientation={"row"}/>
         
            <InputTextCustom value={user.documentNumber} onChange={(e:any) => setUser({...user, documentNumber: e.target.value})} labelId="DocumentNumber"/>

            <InputTextCustom value={user.name} onChange={(e:any) => setUser({...user, name: e.target.value})} labelId="Name"/>

            <InputTextCustom value={user.lastname} onChange={(e:any) => setUser({...user, lastname: e.target.value})} labelId="Lastname"/>

            <RadioButtonGroup options={genderOptions} setValue={(gender:any)=>{
                setUser({...user, gender: gender})
            }} labelId="Gender" value={user.gender} className="radioGroup" orientation={"row"}/>

            <Calendar value={user.date} onChange={(e:any) => {
                setUser({...user, date: e.value})
            
            }} showIcon dateFormat="dd/mm/yy" placeholder='dd/mm/aaaa'/>

            <InputPhone labelId="Phone" value={user.phone} setValue={(val:any, valField:any)=>{
                let _user = {...user}
                _user.phone[valField] = val;
                setUser(_user);
            }} />

            <InputTextCustom value={user.address} onChange={(e:any) => setUser({...user, address: e.target.value})} labelId="Address"/>

            <Combobox items={cities} label={intl.formatMessage({id:"City"})} optionLabel="description" value={city} placeholder={city?.description}  setValue={setCity}/>

            <div className='flexible--row flex-end buttonContainer'>
                <Button label={intl.formatMessage({id: "Cancel"})} className='buttonMain3' onClick={()=>{setDisplayRegisterCancel(true)}}/>
                <Link to="/register/2" className='linkReactRouter'><Button icon="pi pi-angle-right" iconPos='right' label={intl.formatMessage({id: "Follow"})} className='buttonMain' /></Link>
            </div>
            
        </div>
    );
}