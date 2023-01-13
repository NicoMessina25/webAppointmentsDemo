import { RadioButton } from "primereact/radiobutton";
import "./RadioButtonGroup.scss";

export default function RadioButtonGroup({options, value, setValue, label, className, orientation}:any){
    return(
        <div className={`flexible--${orientation}Wrap radioBtnGContainer ${className}`}>
            <p>{label}:</p>
            {options.map((op:any, ind:number)=>{
                return <div className="field-radiobutton flexible--row" key={`${op.label}-${ind}`}>
                        <RadioButton  inputId={`docType${ind}`} name="docType" value={op.label} onChange={(e) => setValue(e.value)} checked={value === op.label} />
                        <label htmlFor={`docType${ind}`}>{op.label}</label>
                    </div>
            })}
        </div>
    );
}