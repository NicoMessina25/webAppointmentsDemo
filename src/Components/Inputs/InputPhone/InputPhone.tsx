import { useIntl } from "react-intl";
import InputTextCustom from "../InputText/InputTextCustom";
import {Dropdown } from "primereact/dropdown"
import "./InputPhone.scss";
import { useEffect, useState } from "react";
import Combobox from "../../Combobox/Combobox";
import getPhonePrefixes from "../../../services/phonePrefixes";
import InputNumber from "../InputNumber/InputNumber";

export default function InputPhone({value, setValue, label, className, error, caption,disable}:any){
    const intl = useIntl();
    
   
    const [country, setCountry] = useState({name: "Argentina",
    dial_code: "+54",
    code: "AR"});


    /* useEffect(() => {
        setCountries(getPhonePrefixes());
       
        
        //setCountry(countries[0]);
    }, []) */

    /* useEffect(() => {
        let prefix = value.prefix || "+54";
        setCountry(countries.find((c:any)=>c.dial_code === prefix));
        setFilteredCountries(countries);
        
    }, [countries]) */
    

    

    return(
        <div className={`flexible--column inputContainer ${className}`}>
            {label && <p className="label inputLabel">{label}</p>}
            <div className="flexible--row phoneFieldsContainer">
                <Combobox value={country} setValue={(e:any)=>{                    
                    setValue(e.dial_code, "prefix");
                    setCountry(e);
                    }} className="comboboxPhone" getItems={getPhonePrefixes} optionLabel={"dial_code"} disable={disable}/>
               
                <InputNumber placeholder={intl.formatMessage({id:"Area"}).toLowerCase()} value={value.area} onChange={(e:any)=>{
                    setValue(e.target.value, "area");
                }} className="areaInputPhone" error={error} disable={disable}/>
                <InputNumber placeholder={intl.formatMessage({id:"Number"}).toLowerCase()} value={value.number} onChange={(e:any)=>{
                    setValue(e.target.value, "number")
                }} className="numberInputPhone" error={error} disable={disable}/>
            </div>
            {caption && <p className={error? "caption-invalid":"caption"}>{caption}</p>}
        </div>
    );
}