import { Dropdown } from 'primereact/dropdown'
import React from 'react'

function Combobox({label, items, value, setValue, className, optionLabel, placeholder}:any) {
  return (
    <div className={`inputContainer flexible--column ${className}`}>
        <p className='label'>{label}</p>
        <Dropdown value={value} onChange={(e) => setValue(e.value)} placeholder={placeholder} filter optionLabel={optionLabel} options={items}/>
    </div>
    
  )
}

export default Combobox