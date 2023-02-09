import { RadioButton } from "primereact/radiobutton";
import "./RadioButtonGroup.scss";
import { useIntl } from "react-intl";

export default function RadioButtonGroup({id, options, value, setValue, label, fieldId, className, orientation, itemWidth, error, caption,disable}:any){


    return(
        <div className={`flexible--column radioBtnGContainer ${className}`}>
            {label && <p className="label">{label}:</p>}
            <div className={`flexible--${orientation}Wrap optionsContainer`}>
                {options.map((op:any, ind:number)=>{
                    return <div className={`field-radiobutton${itemWidth || 50} flexible--row`} key={`${op.label}-${ind}`}>
                                
                                {op.captions && <label htmlFor={`${id?id:0}${op.label}${ind}`} className="label">{op.captions}:</label>}

                                <RadioButton  inputId={`${id?id:0}${op.label}${ind}`} name={op.label} value={op.value} onChange={(e) => {
                                    setValue(e.value, fieldId)
                                }} checked={value === op.value } disabled={disable}/>

                                <label htmlFor={`${id?id:0}${op.label}${ind}`}>{op.label}</label>
                            </div>
                })}
            </div>
            {caption && <p className={error? "caption-invalid":"caption"}>{caption}</p>}
        </div>
    );
}