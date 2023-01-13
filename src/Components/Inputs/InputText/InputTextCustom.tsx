import { useIntl } from "react-intl";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";



export default function InputTextCustom({value, onChange, labelId, className, password, placeholder, onKeyDown}:any){

    const intl = useIntl();

    return (
        <div className={`flexible--column inputContainer ${className}`}>
                {labelId && <p>{intl.formatMessage({id: labelId})}</p>}
                { !password &&  <InputText value={value} onChange={onChange} className="input" placeholder={placeholder} onKeyDown={onKeyDown}/>}
                { password && <Password value={value} onChange={onChange} toggleMask={true} placeholder={placeholder} onKeyDown={onKeyDown}/>}
                
        </div>
    );
}