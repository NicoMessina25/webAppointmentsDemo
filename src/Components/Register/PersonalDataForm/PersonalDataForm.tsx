import { RadioButton } from 'primereact/radiobutton';
import { useState } from 'react';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';
import "./PersonalDataForm.scss"


export default function PersonalDataForm(){
    const [documentType, setDocumentType] = useState("DNI");

    const options = [
        {label: "DNI"},
        {label: "Extranjero"}
    ]

    return (
        <div className='flexible--column'>
            <RadioButtonGroup options={options} setValue={setDocumentType} label={"Tipo de documento"} value={documentType} className="radioGroup" orientation={"row"}/>
        </div>
    );
}