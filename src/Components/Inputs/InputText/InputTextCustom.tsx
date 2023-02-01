import { useIntl } from "react-intl";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from 'primereact/divider';
import "./InputTextCustom.scss"



export default function InputTextCustom({value, onChange, labelId, className, password,feedback, placeholder, caption, onKeyDown,error,onEnter}:any){

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
                {labelId && <p className="label inputLabel">{intl.formatMessage({id: labelId})}</p>}
                { password? <Password 
                                value={value} 
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
                                onChange={onChange} 
                                className={error &&  'p-invalid'} 
                                placeholder={placeholder} 
                                onKeyDown={(e:any)=>{ onKeyDown && onKeyDown(e);onEnter && e.key==="Enter" && onEnter()}}/>}

                {caption && <p className={error? "caption-invalid":"caption"}>{caption}</p>}
                
        </div>
    );
}