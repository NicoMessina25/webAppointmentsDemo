
import { Icon } from '@iconify/react'
import React from 'react'
import { useIntl } from 'react-intl'
import './NextAppointment.scss'


export default function NextAppointment({className}:any) {
  const intl = useIntl();

  return (
    <div className={`flexible--column next-appointment ${className} textWhite`}>
        <div className='next-appointment-header'> <Icon icon="vaadin:bell-o"/> {intl.formatMessage({id:"NextAppointment"})} </div>
        <div className='next-appointment-date'> 10 OCTUBRE</div>
        <div className='next-appointment-professional'> Dr pinna - medico clinico</div>
        <div className='next-appointment-location'> Consultorio clínica San Luis 2143</div>
    </div>
  )
}
