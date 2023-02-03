
import { Icon } from '@iconify/react'
import React from 'react'
import './NextAppointment.scss'


export default function NextAppointment({className}:any) {
  return (
    <div className={`flexible--column next-appointment ${className} textWhite`}>
        <div className='next-appointment-header'> <Icon icon="vaadin:bell-o"/> Proximo turno</div>
        <div className='next-appointment-date'> 10 OCTUBRE</div>
        <div className='next-appointment-professional'> Dr pinna - medico clinico</div>
        <div className='next-appointment-location'> Consultorio clionica san luis 2143</div>
    </div>
  )
}
