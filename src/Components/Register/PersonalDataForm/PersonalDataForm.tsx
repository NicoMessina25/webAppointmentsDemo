import { RadioButton } from 'primereact/radiobutton';
import { useState } from 'react';


export default function PersonalDataForm(){
    const [documentType, setDocumentType] = useState("DNI");

    return (
        <div className='flexible--column'>
            <div className="field-radiobutton">
                    <RadioButton inputId="city1" name="city" value="Chicago" onChange={(e) => setDocumentType(e.value)} checked={documentType === 'Chicago'} />
                    <label htmlFor="city1">Chicago</label>
            </div>
        </div>
    );
}