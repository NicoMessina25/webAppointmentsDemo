import { useIntl } from "react-intl";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import "./InputTextCustom.scss"



export default function InputTextCustom({value, onChange, labelId, className, password,feedback, placeholder, caption, onKeyDown,error}:any){

    const intl = useIntl();
    //{`${ error && 'inputError' }`}
    return (
        <div className={`flexible--column inputContainer ${className}`}>
                {labelId && <p className="label">{intl.formatMessage({id: labelId})}</p>}
                { password? <Password value={value} className={error &&  'p-invalid'} feedback={feedback} onChange={onChange} toggleMask={true} placeholder={placeholder} onKeyDown={onKeyDown}/> :<InputText value={value} onChange={onChange} className={error &&  'p-invalid'} placeholder={placeholder} onKeyDown={onKeyDown}/>}
                {caption && <p className={error? "caption-invalid":"caption"}>{caption}</p>}
                
        </div>
    );
}