import { Dropdown } from 'primereact/dropdown'
import React, { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';

function Combobox({label, items,  value, setValue, className, optionLabel, placeholder}:any) {
  const [filteredItems, setFilteredItems] = useState(items)

  const searchItem = (e: {query:string}) => {
    

    setTimeout(()=>{
      let _items

      if(!e.query.trim().length){
        _items = [...items]
      } else {
        _items = items.filter((i:any) => {return i[optionLabel].toLowerCase().includes(e.query.trim().toLowerCase())})
      }

      if(_items.length){
        setFilteredItems(_items);
      } else{
        setValue(items.find((i:any)=>i[optionLabel] === "+54"))
      }
      
    },750);

    return 
  }

  return (
    <div className={`inputContainer flexible--column ${className}`}>
        <p className='label'>{label}</p>
        <Dropdown value={value} onChange={(e) => setValue(e.value)} placeholder={placeholder} filter onFilter={(e)=>{console.log(e);
        }} optionLabel={optionLabel} options={items}/>
        {/* <AutoComplete value={value} suggestions={filteredItems} completeMethod={searchItem} field={optionLabel} dropdown forceSelection onChange={(e) => setValue(e.value)} aria-label="Countries" dropdownAriaLabel="Select Country" /> */}
    </div>
    
  )
}

export default Combobox