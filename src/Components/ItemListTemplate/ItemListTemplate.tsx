import { Icon } from '@iconify/react'
import { Button } from 'primereact/button'
import React from 'react'
import "./ItemListTemplate.scss"

export default function ItemListTemplate({header, desc, state, date}:any) {

  function renderStatus(){
    switch(state){
      case "ready": return <Button icon="pi pi-download" className='buttonMain3' />
      case "inCourse": return <p className='warningText statusText' >en curso <Icon icon="mdi:clock-time-five-outline" /> </p>
      case "observed": return <p className='errorText observedStatusText'>observado</p>
    }
  }

  return (
    <div className='itemListTemplate'>
        <p className='date'>{date.toLocaleDateString()}</p>
        <div className='flexible--row dataContainer'>
          <div>
            <p className='label'>{header}</p>
            <p>{desc}</p>
          </div>
          {renderStatus()}
        </div>
      </div>
  )
}
