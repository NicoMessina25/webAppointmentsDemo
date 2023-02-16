import { classNames } from 'primereact/utils'
import React from 'react'
import InputTextCustom from '../InputText/InputTextCustom'

export default function InputNumber({label, labelClassName, className, placeholder, value, onChange, error, caption,disable,onEnter}:any) {
    function onKeyDownHandler(evt:any){
        (evt.keyCode >= 48 && evt.keyCode <= 57 && !evt.shiftKey) || evt.keyCode === 8 || evt.keyCode === 37 || evt.keyCode === 39 || evt.preventDefault();
    }

    return (
        <InputTextCustom label={label} labelClassName={labelClassName} placeholder={placeholder} value={value} onChange={onChange} className={className} onKeyDown={onKeyDownHandler} error={error} disable={disable} caption={caption} onEnter={onEnter}/>
    )
}
