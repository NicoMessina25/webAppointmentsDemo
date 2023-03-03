
import { Icon } from '@iconify/react'
import React from 'react'
import "./InfoCard.scss"

export default function InfoCard({iconClassName, icon, label, text, textClassName}:any) {
  return (
    <div className='infoCardContainer'>
        <div className={iconClassName}>
            <Icon icon={icon}/>
        </div>
        <div className='flexible--column'>
            <p className='label'>{label}</p>
            <h3 className={textClassName}>{text}</h3>
        </div>
    </div>
  )
}

