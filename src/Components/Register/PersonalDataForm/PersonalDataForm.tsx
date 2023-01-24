
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

export default function PersonalDataForm({setStep, user, setUser, setDisplayRegisterCancel}:any){
    const [validInputs, setValidInputs] = useState(false);
    const [cities, setCities] = useState();
    const [city, setCity]:any = useState(null);
    const [inputErrors, setInputError] = useState({
        firstname: {caption: "", isErr: false}
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
           
    },[cities])

    function validateData(){
        return user.documentType != 0 && user.document.trim() !== "" && user.firstname.trim() !== "" && user.lastname.trim() !== "" && user.mobilephone.area.trim() !== "" && user.mobilephone.number.trim() !== "" && user.birthdate != null && user.gender !== "" && user.address.trim() !== ""
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
            }} labelId="DocumentType" value={user.documentType} className="radioGroup" orientation={"row"}/>
         
            <InputTextCustom value={user.document} onChange={(e:any) => setUser({...user, document: e.target.value})} labelId="DocumentNumber"/>

            <InputTextCustom value={user.firstname} onChange={(e:any) => setUser({...user, firstname: e.target.value})} labelId="Name"/>

            <InputTextCustom value={user.lastname} onChange={(e:any) => setUser({...user, lastname: e.target.value})} labelId="Lastname"/>

            <RadioButtonGroup options={genderOptions} setValue={(gender:any)=>{
                setUser({...user, gender: gender})
            }} labelId="Gender" value={user.gender} className="radioGroup" orientation={"row"}/>

            <Calendar value={user.birthdate} onChange={(e:any) => {
                setUser({...user, birthdate: e.value})
            
            }} showIcon dateFormat="dd/mm/yy" placeholder='dd/mm/aaaa'/>

            <InputPhone labelId="Phone" value={user.mobilephone} setValue={(val:any, valField:any)=>{
                let _user = {...user}
                _user.mobilephone[valField] = val;
                setUser(_user);
            }} />

            <InputTextCustom value={user.address} onChange={(e:any) => setUser({...user, address: e.target.value})} labelId="Address"/>

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