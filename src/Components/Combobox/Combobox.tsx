import { Dropdown } from 'primereact/dropdown'
import React from 'react'

function Combobox({label, items, value, setValue, className}:any) {
  return (
    <div className={`flexible--column ${className}`}>
        <p className='label'>{label}</p>
        <Dropdown value={value} onChange={(e) => setValue(e.value)}/>
    </div>
    
  )
}

export default Combobox