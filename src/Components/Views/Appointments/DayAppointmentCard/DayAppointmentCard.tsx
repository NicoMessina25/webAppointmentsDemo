import { Icon } from '@iconify/react'
import { Button } from 'primereact/button'
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import './DayAppointmentCard.scss'
import {langContext} from '../../../Context/langContext';

const DayAppointmentCard=forwardRef(({disableAll,booleanArray,setBooleanArray,appointments}:any,ref)=> {

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


    useImperativeHandle(ref,()=>({
        unSelectAll(){
            setButtonStyle('buttonMain2')
            let booleanArrayCopy=[...booleanArray]
            booleanArrayCopy.fill(false);
            setBooleanArray(booleanArrayCopy)
        }
      }))

    function handleButtonClick(index: number){
        disableAll()
        // clear the style of other buttons
        setButtonStyle('buttonMain')
        let booleanArrayCopy=[...booleanArray]
        booleanArrayCopy.fill(false);
        booleanArrayCopy[index]=true;
        setBooleanArray(booleanArrayCopy)
      };
    
    
    useEffect(()=>{
        createButtons()
    },[])

    function createButtons(){
        let btn:any;
        let component:any=[];
        let localBooleanArray=new Array(appointments.jsonappointments.length).fill(false);
        setBooleanArray(localBooleanArray)
    }

    console.log(booleanArray)

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
                           appointments && appointments.jsonappointments.map((obj:any,index:any)=>{
                            return <Button
                                className={booleanArray[index] ? 'buttonMain' : 'buttonMain2'}
                                key={index}
                                label={obj.time}
                                onClick={()=>{handleButtonClick(index)}}
                                />
                            })
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
})

export default DayAppointmentCard;
