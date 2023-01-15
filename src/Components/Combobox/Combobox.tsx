import { Dropdown } from 'primereact/dropdown'
import React from 'react'

function Combobox({label, items, className}:any) {
  return (
    <div className={`flexible--column ${className}`}>
        <p className='label'>{label}</p>
        <Dropdown />
    </div>
    
  )
}

export default Combobox