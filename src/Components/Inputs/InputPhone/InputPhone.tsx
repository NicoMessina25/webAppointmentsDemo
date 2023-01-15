import { useIntl } from "react-intl";
import InputTextCustom from "../InputText/InputTextCustom";
import {Dropdown } from "primereact/dropdown"
import "./InputPhone.scss";

export default function InputPhone({value, setValue, labelId, className, password, placeholder}:any){
    const intl = useIntl();

    function onKeyDownHandler(evt:any){
        (evt.keyCode >= 48 && evt.keyCode <= 57 && !evt.shiftKey) || evt.keyCode === 8 || evt.preventDefault();
    }

    return(
        <div className={`flexible--column inputContainer ${className}`}>
            {labelId && <p>{intl.formatMessage({id: labelId})}</p>}
            <div className="flexible--row phoneFieldsContainer">
                <Dropdown className="comboboxPhone"/>
                <InputTextCustom placeholder={intl.formatMessage({id:"Area"})} className="areaInputPhone" onKeyDown={onKeyDownHandler}/>
                <InputTextCustom placeholder={intl.formatMessage({id:"Number"})} className="numberInputPhone" onKeyDown={onKeyDownHandler}/>
            </div>
        </div>
    );
}