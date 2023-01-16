
import { RadioButton } from 'primereact/radiobutton';
import { useState } from 'react';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';
import { useIntl } from 'react-intl';
import "./PersonalDataForm.scss"
import InputTextCustom from '../../Inputs/InputText/InputTextCustom';
import { Calendar } from 'primereact/calendar';
import InputPhone from '../../Inputs/InputPhone/InputPhone';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';


export default function PersonalDataForm({setStep, user, setUser, setDisplayRegisterCancel}:any){
    const [documentType, setDocumentType] = useState("DNI");
    const [gender, setGender] = useState("");
    

    const [date, setDate] = useState<Date | Date[] | undefined>(undefined);

    const intl = useIntl();

    const documentOptions = [
        {label: intl.formatMessage({id: "ID"})},
        {label: intl.formatMessage({id: "Foreign"})}
    ]

    const genderOptions = [
        {label: intl.formatMessage({id: "Female"})},
        {label: intl.formatMessage({id: "Male"})}
    ]

    return (
        <div className='flexible--column'>
            <RadioButtonGroup options={documentOptions} setValue={setDocumentType} labelId="DocumentType" value={documentType} className="radioGroup" orientation={"column"}/>
         
            <InputTextCustom value={user.documentNumber} onChange={(e:any) => setUser({...user, documentNumber: e.target.value})} labelId="DocumentNumber"/>

            <InputTextCustom value={user.name} onChange={(e:any) => setUser({...user, name: e.target.value})} labelId="Name"/>

            <InputTextCustom value={user.lastname} onChange={(e:any) => setUser({...user, lastname: e.target.value})} labelId="Lastname"/>

            <RadioButtonGroup options={genderOptions} setValue={setGender} labelId="Gender" value={gender} className="radioGroup" orientation={"row"}/>

            <Calendar value={date} onChange={(e:any) => setDate(e.value)} showIcon dateFormat="dd/mm/yy" placeholder='dd/mm/aaaa'/>

            <InputPhone labelId="Phone" />

            <InputTextCustom value={user.address} onChange={(e:any) => setUser({...user, address: e.target.value})} labelId="Address"/>

            <InputTextCustom value={user.city} onChange={(e:any) => setUser({...user, city: e.target.value})}  labelId="City"/>

            <div className='flexible--row flex-end buttonContainer'>
                <Link to="#"><Button label={intl.formatMessage({id: "Cancel"})} className='buttonMain3' onClick={()=>{setDisplayRegisterCancel(true)}}/></Link>
                <Link to="../step2"><Button icon="pi pi-angle-right" iconPos='right' label={intl.formatMessage({id: "Follow"})} className='buttonMain' onClick={()=>setStep(1)}/></Link>
            </div>
            
        </div>
    );
}