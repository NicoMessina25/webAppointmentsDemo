import { Icon } from '@iconify/react'
import { Button } from 'primereact/button'
import React, { useContext } from 'react'
import './DayAppointmentCard.scss'
import {langContext} from '../../../Context/langContext';

export default function DayAppointmentCard({appointments}:any) {

  const {localeintl}:any = useContext(langContext);

    function formatearFecha(fecha: string): string {
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDate();
        const nombreMes = fechaObj.toLocaleDateString(localeintl, { month: 'long' });
        const nombreDiaSemana = fechaObj.toLocaleDateString(localeintl, { weekday: 'long' });
        return `${dia} de ${nombreMes} ${nombreDiaSemana}`;
    }

    console.log(appointments[0])

  return (
    <div className='flexible--row appointment-card-container'>
        {/* Parte izquierda */}
        <div className='flexible--column'>
            <div className='lightPaletteText-info-background'>
                <p className='padding-8'>{appointments[0].professionalnames.replace(/^(Dra\.|Dr\.)/, '').trim()}</p>
            </div>
            <div className='flexible--column day'>
                <Icon icon='vaadin:calendar'></Icon>
                <div>{formatearFecha(appointments[0].appointmentdatetime)}</div>
            </div>
        </div>

        {/*Parte del medio y derecha */}
        <div className='flexible--column width-100'>
            {/* Especialidad medica y consultorio */}
            <div className='flexible--row width-100 space-between'>
                <p className='speciality width-70'>{appointments[0].specialityname}</p>
                <p className='building  width-30'>{appointments[0].locationsname}</p>
            </div>

            {/* Horarios disponibles para turnos y boton agendar */}
            <div className='flexible--row width-100 space-between'>
                <div className='flexible--column  width-100 appointment-buttons-container '>
                    <p className='textBold'>Elegir horario</p>
                    {/* Buttons */}
                    <div className=''>
                        {appointments.map( (objeto:any,index:any) => (
                        <Button
                            key={index}
                            label={objeto.initialhour}
                            className='buttonMain2'
                        />
                        ))}

                    </div>
                </div>
                <div className='flexible--column button'>
                    <Button className='buttonMain' label="Agendar"/>
                </div>
            </div>

        </div>

    </div>
  )
}
