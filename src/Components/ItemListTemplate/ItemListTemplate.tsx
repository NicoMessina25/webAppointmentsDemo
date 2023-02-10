import { Icon } from '@iconify/react'
import { Button } from 'primereact/button'
import React, {useContext} from 'react'
import { appContext } from '../Context/appContext'
import "./ItemListTemplate.scss"

export default function ItemListTemplate({header, desc, state, date}:any) {

  const {renderState}:any = useContext(appContext);


  return (
    <div className='itemListTemplate'>
        <p className='date'>{date.toLocaleDateString()}</p>
        <div className='flexible--row dataContainer'>
          <div>
            <p className='label'>{header}</p>
            <p>{desc}</p>
          </div>
          {renderState(state, "buttonMain3")}
        </div>
      </div>
  )
}
