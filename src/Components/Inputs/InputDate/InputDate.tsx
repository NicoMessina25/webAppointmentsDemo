import { Calendar } from 'primereact/calendar'
import React from 'react'

export default function InputDate({value, onChange, className, error, caption, label, dateFormat, placeholder, maxDate, minDate}:any) {
  return (
    <div className={`flexible--column inputContainer ${className}`} >
        {label && <p className="label">{label}</p>}
        <Calendar value={value} onChange={onChange} showIcon dateFormat={dateFormat} maxDate={maxDate} minDate={minDate}  placeholder={placeholder} className={error &&  'p-invalid'} />
        {caption && <p className={error? "caption-invalid":"caption"}>{caption}</p>}
    </div>
  )
}
