import { useIntl } from "react-intl";
import InputTextCustom from "../InputText/InputTextCustom";
import {Dropdown } from "primereact/dropdown"
import "./InputPhone.scss";
import { useEffect, useState } from "react";
import Combobox from "../../Combobox/Combobox";
import getPhonePrefixes from "../../../services/phonePrefixes";

export default function InputPhone({value, setValue, labelId, className, error, caption}:any){
    const intl = useIntl();
    
    const [countries, setCountries]:any= useState([]);
    const [country, setCountry] = useState({name: "Argentina",
    dial_code: "+54",
    code: "AR"});
    const [filteredCountries, setFilteredCountries] = useState(null);

    /* useEffect(() => {
        setCountries(getPhonePrefixes());
       
        
        //setCountry(countries[0]);
    }, []) */

    /* useEffect(() => {
        let prefix = value.prefix || "+54";
        setCountry(countries.find((c:any)=>c.dial_code === prefix));
        setFilteredCountries(countries);
        
    }, [countries]) */
    

    function onKeyDownHandler(evt:any){
        (evt.keyCode >= 48 && evt.keyCode <= 57 && !evt.shiftKey) || evt.keyCode === 8 || evt.preventDefault();
    }

    return(
        <div className={`flexible--column inputContainer ${className}`}>
            {labelId && <p className="label inputLabel">{intl.formatMessage({id: labelId})}</p>}
            <div className="flexible--row phoneFieldsContainer">
                <Combobox value={country} setValue={(e:any)=>{                    
                    setValue(e.dial_code, "prefix");
                    setCountry(e);
                    }} className="comboboxPhone" getItems={getPhonePrefixes} optionLabel={"dial_code"}/>
               
                <InputTextCustom placeholder={intl.formatMessage({id:"Area"}).toLowerCase()} value={value.area} onChange={(e:any)=>{
                    setValue(e.target.value, "area");
                }} className="areaInputPhone" onKeyDown={onKeyDownHandler} error={error}/>
                <InputTextCustom placeholder={intl.formatMessage({id:"Number"}).toLowerCase()} value={value.number} onChange={(e:any)=>{
                    setValue(e.target.value, "number")
                }} className="numberInputPhone" onKeyDown={onKeyDownHandler} error={error}/>
            </div>
            {caption && <p className={error? "caption-invalid":"caption"}>{caption}</p>}
        </div>
    );
}