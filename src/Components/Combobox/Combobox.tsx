import { Dropdown } from 'primereact/dropdown'
import React, { useEffect, useRef, useState, useContext } from 'react';
import { appContext } from '../Context/appContext';
import Loader from '../Loader/Loader';

function Combobox({label, getItems, value, setValue, className, optionLabel, placeholder, scrollHeight, error, caption, reLoadItemsValue, width}:any) {
  const [items, setItems]:any = useState([]);
  const [isMoreData, setIsMoreData] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);

  const dropdown:any = useRef(null);
  let filterTimeout:any = useRef(null)
  let pageSize = 50, itemSize = 46;
  scrollHeight = scrollHeight || 200
  const {languageId}:any = useContext(appContext);


  useEffect(()=>{
    loadItems(false)
  },[page, filterValue]);

  useEffect(()=>{
    console.log(label,reLoadItemsValue);
    if(reLoadItemsValue){
      if (page !== 0)
        setPage(0)
      else {
        loadItems(true)
      }
    }
    

  },[reLoadItemsValue])
  

  const loadingTemplate = () =>{
    return <Loader size={itemSize*2} strokeWidth={6} className={"primarySpinner"} />
  }

  function loadItems(reset:boolean){
    let _items;

    setIsLoadingData(true)
    getItems && getItems(filterValue,page*pageSize, pageSize, languageId).then((data:any)=>{
      
      setIsMoreData(data.length === pageSize);
      
      
      _items = [...data];

      if(!reset){
        if(value){
                let element = _items.find((i)=>i[optionLabel] === value[optionLabel])

                if(element){
                  console.log(element);
                  
                  _items.splice(_items.indexOf(element), 1)
                }
              }
                

              if(page !== 0){
                _items = [...items, ..._items];
              }
      }

      
  
      if(!reset && value && !_items.find((i)=>i[optionLabel] === value[optionLabel])){
        
        
        setItems([value, ..._items]);
      } else {
        
        setItems(_items);
      }

      
      setIsLoadingData(false);
    }) 
  }

  function onScroll(e:any){  
    
    
    if(e.target.scrollHeight-e.target.scrollTop - scrollHeight <= 0 && isMoreData){
        setPage(page + 1);
    }

  }
  
  function onFilter(e:any){
    setFilterValue(e.filter);
    clearTimeout(filterTimeout.current);
    filterTimeout.current =  setTimeout(()=>{
      setPage(0)
    }, 500)
    
  }

  return (
    <div className={`inputContainer flexible--column ${className}`} style={{width:`${width}%`}}>
        <p className='label inputLabel'>{label}</p>
        <Dropdown 
          ref={dropdown} 
          value={value} 
          onChange={(e) => setValue(e.value)} 
          scrollHeight={`${scrollHeight}px`}  
          placeholder={placeholder} 
          filter 
          resetFilterOnHide
          onFilter={onFilter} 
          optionLabel={optionLabel} 
          options={items} 
          className={error && "p-invalid"} 
          virtualScrollerOptions={{ lazy: false, 
            itemSize:itemSize, 
            onScroll: onScroll,
            loading: isLoadingData,
            loadingTemplate: loadingTemplate}}/>
        {caption && <p className={error? "caption-invalid":"caption"}>{caption}</p>}
        {/* <AutoComplete value={value} suggestions={filteredItems} completeMethod={searchItem} field={optionLabel} dropdown forceSelection onChange={(e) => setValue(e.value)} aria-label="Countries" dropdownAriaLabel="Select Country" /> */}
    </div>
    
  )
}

export default Combobox