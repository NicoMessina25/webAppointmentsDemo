import { useIntl } from "react-intl";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import "./InputTextCustom.scss"



<<<<<<< Updated upstream
export default function InputTextCustom({value, onChange, labelId, className, password, feedback, placeholder, caption, onKeyDown}:any){
=======
export default function InputTextCustom({value, onChange, labelId, className, password,feedback, placeholder, caption, onKeyDown,error}:any){
>>>>>>> Stashed changes

    const intl = useIntl();
    //{`${ error && 'inputError' }`}
    return (
        <div className={`flexible--column inputContainer ${className}`}>
                {labelId && <p>{intl.formatMessage({id: labelId})}</p>}
<<<<<<< Updated upstream
                { password? <Password value={value} onChange={onChange} toggleMask={true} feedback={feedback} placeholder={placeholder} onKeyDown={onKeyDown}/>: <InputText value={value} onChange={onChange} className="input" placeholder={placeholder} onKeyDown={onKeyDown}/>}
                {caption && <p className="caption">{`(${caption})`}</p>}
=======
                { !password &&  <InputText value={value} onChange={onChange} className={error &&  'p-invalid'} placeholder={placeholder} onKeyDown={onKeyDown}/>}
                { password && <Password value={value} className={error &&  'p-invalid'} feedback={feedback} onChange={onChange} toggleMask={true} placeholder={placeholder} onKeyDown={onKeyDown}/>}
                {caption && <p className="caption">{`${caption}`}</p>}
>>>>>>> Stashed changes
                
        </div>
    );
}