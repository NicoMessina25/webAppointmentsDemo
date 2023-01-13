
import { RadioButton } from 'primereact/radiobutton';
import { useState } from 'react';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';
import { useIntl } from 'react-intl';
import "./PersonalDataForm.scss"
import InputTextCustom from '../../Inputs/InputText/InputTextCustom';


export default function PersonalDataForm(){
    const [documentType, setDocumentType] = useState("DNI");
    const [user, setUser] = useState({
        documentNumber:"",
        name: "",
        lastname: "",
        gender: "",
        date: {},
        phone: "",
        address: "",
        city: ""
    });


    const options = [
        {label: "DNI"},
        {label: "Extranjero"}
    ]

    const intl = useIntl();

    return (
        <div className='flexible--column'>
            <RadioButtonGroup options={options} setValue={setDocumentType} labelId="DocumentType" value={documentType} className="radioGroup" orientation={"row"}/>
         
            <InputTextCustom value={user.documentNumber} onChange={(e:any) => setUser({...user, documentNumber: e.target.value})} className="input" labelId="DocumentNumber"/>

            <InputTextCustom value={user.documentNumber} onChange={(e:any) => setUser({...user, documentNumber: e.target.value})} className="input" labelId="Name"/>
            
        </div>
    );
}