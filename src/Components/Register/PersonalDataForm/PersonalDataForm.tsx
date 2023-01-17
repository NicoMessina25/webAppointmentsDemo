
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


export default function PersonalDataForm({setStep, user, setUser, setDisplayRegisterCancel}:any){
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
            <RadioButtonGroup options={documentOptions} setValue={(docType:any)=>{
                setUser({...user, documentType: docType})
            }} labelId="DocumentType" value={user.documentType} className="radioGroup" orientation={"row"}/>
         
            <InputTextCustom value={user.documentNumber} onChange={(e:any) => setUser({...user, documentNumber: e.target.value})} labelId="DocumentNumber"/>

            <InputTextCustom value={user.name} onChange={(e:any) => setUser({...user, name: e.target.value})} labelId="Name"/>

            <InputTextCustom value={user.lastname} onChange={(e:any) => setUser({...user, lastname: e.target.value})} labelId="Lastname"/>

            <RadioButtonGroup options={genderOptions} setValue={(gender:any)=>{
                setUser({...user, gender: gender})
            }} labelId="Gender" value={user.gender} className="radioGroup" orientation={"row"}/>

            <Calendar value={date} onChange={(e:any) => {setDate(e.value)
            console.log(e);
            
            }} showIcon dateFormat="dd/mm/yy" placeholder='dd/mm/aaaa'/>

            <InputPhone labelId="Phone" value={user} setValue={(val:any, valField:any)=>{
                let _user = {...user}
                _user.phone[valField] = val;
                setUser(_user);
            }} />

            <InputTextCustom value={user.address} onChange={(e:any) => setUser({...user, address: e.target.value})} labelId="Address"/>

            <InputTextCustom value={user.city} onChange={(e:any) => setUser({...user, city: e.target.value})}  labelId="City"/>

            <div className='flexible--row flex-end buttonContainer'>
                <Button label={intl.formatMessage({id: "Cancel"})} className='buttonMain3' onClick={()=>{setDisplayRegisterCancel(true)}}/>
                <Link to="/register/2" className='linkReactRouter'><Button icon="pi pi-angle-right" iconPos='right' label={intl.formatMessage({id: "Follow"})} className='buttonMain'/></Link>
            </div>
            
        </div>
    );
}