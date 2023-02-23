import { Icon } from '@iconify/react';
import React from 'react'
import { useIntl } from 'react-intl';
import './AppointmentCard.scss';


export default function AppointmentCard({appointment}:any) {

    const {date, speciality, telemedicine, professional} = appointment;
    const intl = useIntl();

    let weekday = intl.formatDate(date, {weekday: 'long'});

    return (
        <div className='flexible--row space-between appointmentCard'>
            <div className='flexible--row appointmentInfo'>
                <div className='flexible--column highlight date'>
                    <p className='dayMonth'>{intl.formatDate(date, {day:'2-digit', month: '2-digit'})}</p>
                    <p className='weekday'>{weekday[0].toUpperCase() + weekday.slice(1)}</p>
                </div>
                <div className='flexible--column professionalAndHour'>
                    <p className='hour'>{intl.formatDate(date, {hour:'2-digit', minute: '2-digit'})} HS</p>
                    <p className='textDark' >{professional} - {speciality}</p>
                    {telemedicine && <p className='caption'>*Recuerde estar conectado 5 minutos antes de su turno</p>}
                </div>
            </div>
            
            <div className='telemedicine flexible--column' >
                <Icon icon={telemedicine? "fa6-solid:video" : "ion:home"}/>
                <p>{telemedicine?"Telemedicina":"Consultorio"}</p>
                
            </div>
        </div>
  )
}
