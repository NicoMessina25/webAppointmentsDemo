import { useIntl } from "react-intl";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";



export default function InputTextCustom({value, onChange, labelId, className, password}:any){

    const intl = useIntl();

    return (
        <div className={`flexible--column inputContainer ${className}`}>
                <p>{intl.formatMessage({id: labelId})}</p>
                { !password &&  <InputText value={value} onChange={onChange} className="input"/>}
                { password && <Password value={value} onChange={onChange} toggleMask={true} />}
                
        </div>
    );
}