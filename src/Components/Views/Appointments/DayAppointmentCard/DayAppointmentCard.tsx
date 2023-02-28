import { Icon } from '@iconify/react'
import { Button } from 'primereact/button'
import React, { useContext, useState } from 'react'
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

    const [buttonStyle,setButtonStyle]=useState('buttonMain color-disabled');
    const [hourButtonStyle,setHourButtonStyle]=useState('buttonMain2');

    const [buttonSelected,setButtonSelected]=useState({});

    let buttons:any=[];
    // function toggleStyle(){
    //     setButtonStyle('buttonMain')

    // }

    // function toggleHourStyle(e:any){
    //     console.log(e)
    //     e.target.className="p-button p-component buttonMain"
        
    // }

    const handleButtonClick = (index: number) => {
        // set the style of the clicked button
        buttons[index]?.classList.add("buttonMain");
    
        // clear the style of other buttons
        buttons.forEach((buttons:any, i:any) => {
          if (i !== index) {
            buttons?.classList.remove("buttonMain");
          }
        });
      };

    function createButtons(){
        let btnRef:any;
        let component:any;
        
        // for(let i=0;i<)
        component=appointments.jsonappointments.map( (objeto:any,index:any) => (
                        
            <Button
                ref={btnRef}
                key={index}
                label={objeto.time}
                className={hourButtonStyle}
                // onClick={}
            />
            ))
        return component;
    }

  return (
    <div className='flexible--row appointment-card-container'>
        {/* Parte izquierda */}
        <div className='flexible--column dayAndProfessional'>
            <div className='lightPaletteText-info-background'>
                <p className='padding-8'>{appointments.professionalnames.replace(/^(Dra\.|Dr\.)/, '').trim()}</p>
            </div>
            <div className='flexible--column day'>
                <Icon icon='vaadin:calendar'></Icon>
                <div>{formatearFecha(appointments.day)}</div>
            </div>
        </div>

        {/*Parte del medio y derecha */}
        <div className='flexible--column width-100'>
            {/* Especialidad medica y consultorio */}
            <div className='flexible--row width-100 space-between'>
                <p className='speciality'>{appointments.specialityname}</p>
                <p className='building'>{appointments.locationsname}</p>
            </div>

            {/* Horarios disponibles para turnos y boton agendar */}
            <div className='flexible--row width-100 space-between'>
                <div className='flexible--column  width-100 appointment-buttons-container '>
                    <p className='textBold'>Elegir horario</p>
                    {/* Buttons */}
                    <div className=''>
                        {
                            createButtons()
                        }
                    </div>
                </div>
                <div className='flexible--column button'>
                    <Button className={buttonStyle}  label="Agendar"/>
                </div>
            </div>

        </div>

    </div>
  )
}
