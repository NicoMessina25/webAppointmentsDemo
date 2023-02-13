import { useIntl } from "react-intl";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from 'primereact/divider';
import "./InputTextCustom.scss"



export default function InputTextCustom({value, onChange, label,labelClassName, className, password,feedback, placeholder, caption, onKeyDown,error,onEnter, disable}:any){

    const intl = useIntl();
    //{`${ error && 'inputError' }`}

    const passwordFooter = (
        <div className="passwordFooter">
            <p className="text">{intl.formatMessage({id:"PasswordSuggestion"})}</p>
            {/* <h4 className="textDark">{intl.formatMessage({id:"Suggestions"})}</h4>
            <ul className="text" style={{ lineHeight: '1.5' }}>
                <li>{intl.formatMessage({id:"AtLeastOneLowercase"})}</li>
                <li>{intl.formatMessage({id:"AtLeastOneUppercase"})}</li>
                <li>{intl.formatMessage({id:"AtLeastOneNumeric"})}</li>
            </ul> */}
        </div>
    );

    return (
        <div className={`flexible--column inputContainer ${className}`}>
                {label && <p className={`label inputLabel ${labelClassName}`}>{label}</p>}
                { password? <Password 
                                value={value} 
                                disabled={disable}
                                className={error &&  'p-invalid'} 
                                feedback={feedback} 
                                onChange={onChange} 
                                toggleMask={true} 
                                placeholder={placeholder} 
                                onKeyDown={(e:any)=>{ onKeyDown && onKeyDown(e);onEnter && e.key==="Enter" && onEnter()}} 
                                footer={passwordFooter} /> 
                            :
                            <InputText 
                                value={value}
                                disabled={disable} 
                                onChange={onChange} 
                                className={error &&  'p-invalid'} 
                                placeholder={placeholder} 
                                onKeyDown={(e:any)=>{ onKeyDown && onKeyDown(e);onEnter && e.key==="Enter" && onEnter()}}/>}

                {caption && <p className={error? "caption-invalid":"caption"}>{caption}</p>}
                
        </div>
    );
}