import React from 'react'

import "./OptionsPanel.scss"

/* 

Options panel recibe un titulo para el panel y un array de opciones

Cada opcion dentro del array debera tener un atributo label y un atributo component
label para el titulo
componente para desplegar el componente


*/


const BoxList: React.FC = (options:any) => {

    let index = 0;
    const boxes = options.map((component:any) => (
        <div key={index++} className='flexible--column option-component'>
          <div className='whiteLabel'>{component.label}</div>
          {component.component}
          <div className='options-panel-footer'>{component.footer}</div>
        </div>
    )
    )
   
  
    return <div className='flexible--row'>{boxes}</div>;
  };



export default function OptionsPanel({tittle,options}:any) {
  return (
    <div className='flexible--column options-panel'>
        {tittle!="" && 
        
        <div className='tittle'>
        
        {tittle}

        </div>

        }

        {BoxList(options)}
        

    </div>
  )
}
