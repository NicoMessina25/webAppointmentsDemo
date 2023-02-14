import { classNames } from 'primereact/utils'
import React from 'react'
import InputTextCustom from '../InputText/InputTextCustom'

export default function InputNumber({label, className, placeholder, value, onChange, error,disable}:any) {
    function onKeyDownHandler(evt:any){
        (evt.keyCode >= 48 && evt.keyCode <= 57 && !evt.shiftKey) || evt.keyCode === 8 || evt.preventDefault();
    }

    return (
        <InputTextCustom label={label} placeholder={placeholder} value={value} onChange={onChange} className={className} onKeyDown={onKeyDownHandler} error={error} disable={disable}/>
    )
}
