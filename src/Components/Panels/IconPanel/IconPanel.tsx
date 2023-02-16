import { Icon } from '@iconify/react'
import React from 'react'
import './IconPanel.scss'

export default function IconPanel({label,iconName,className,onClick}:any) {
  return (
    <div className={`flexible--column icon-panel label ${className}`} onClick={onClick}>
        <div>
            <Icon className='icon-panel-icon' icon={iconName}/>
        </div>
        <div className='label'>
            {label}
        </div>
    </div>
  )
}
