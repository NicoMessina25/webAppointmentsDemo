import React, { useState } from 'react'
import getPhonePrefixes from '../../../services/phonePrefixes';
import Combobox from '../../Combobox/Combobox';
import IconPanel from '../../Panels/IconPanel/IconPanel';
import InputTextCustom from '../../Inputs/InputText/InputTextCustom';
import OptionsPanel from '../../Panels/OptionesPanel/OptionsPanel'
import './Home.scss'
import NextAppointment from '../../Panels/NextAppointment/NextAppointment';
import AppointmentModal from '../../Modal/CustomModal/AppointmentModal';
import { FormattedMessage, useIntl } from 'react-intl';
import { Icon } from '@iconify/react';
import HomePrescriptionsPanel from '../../Panels/HomePrescriptionsPanel/HomePrescriptionsPanel';
import { Button } from 'primereact/button';
import HomeAppointmentsPanel from '../../Panels/HomeAppointmentsPanel/HomeAppointmentsPanel';
import { amilogged } from '../../../services/loginService';
import { getAppointments, getBuildings, getProfessionals, getSpecialities } from '../../../services/appointmentsService';
import InputDate from '../../Inputs/InputDate/InputDate';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';
import WelcomePanel from '../../Panels/WelcomePanel/WelcomePanel';
import {useContext} from "react";
import { appContext } from '../../Context/appContext';

export default function Home() {

  const numbers: number[] = [1, 2, 3, 4, 5, 6];
  const intl = useIntl();
  const {user}:any = useContext(appContext);

  const receivedPrescriptions = [
    {doctor: "Dr. Fecceti", medicationDesc: "Agua 3 mg x 5 cajas", date: new Date(2021, 5, 25), status:"ready"},
    {doctor: "Dr. Pinna", medicationDesc: "Letrozole 2,5 mg x 3 cajas", date: new Date(2020, 3, 14), status:"observed"},
    {doctor: "Dr. Pinna", medicationDesc: "Letrozole 2,5 mg x 3 cajas", date: new Date(2020, 3, 14), status:"inCourse"}
  ]

  

  const appointments = [
    {telemedicine:false, date: new Date(2023, 3, 31, 9, 0), professional: "Dr. Pinna", speciality: "Medicina Clínica"},
    {telemedicine:true, date: new Date(2023, 5, 21, 9, 30), professional: "Dr. Pinna", speciality: "Medicina Clínica"},
    {telemedicine:false, date: new Date(2023, 7, 3, 8, 15), professional: "Dr. Pinna", speciality: "Medicina Clínica"},
    {telemedicine:true, date: new Date(2023, 11, 16, 15, 30), professional: "Dr. Pinna", speciality: "Medicina Clínica"},
    {telemedicine:false, date: new Date(2023, 12, 25, 13, 0), professional: "Dr. Pinna", speciality: "Medicina Clínica"}
  ]
  
  function createComponents(){
    
    let componentes:any=[];
    
    let component={
      id:1,
      label:'roberto',
      component:<InputTextCustom></InputTextCustom>,
      footer:"Acepto solo numeros"
    }

    let component2={
      id:1,
      label:'roberto',
      component:<InputTextCustom></InputTextCustom>,
      footer:"asd"
    }

    componentes.push(component)
    componentes.push(component2)

    return componentes;
  
  }


  return (
    <div className='Home-container'>
        {/* <OptionsPanel buttonLabel={"Buscar turno"} >
        
          {options.map((op, ind)=>{
            return <Combobox key={op.label + ind} getItems={getPhonePrefixes} label={op.label} optionLabel={"dial_code"} setValue={(e:any)=>
            {                 
              setCountry(e);
            }} placeholder={intl.formatMessage({id: "Select"})} className="combobox" width={90/(options.length + 1)} />
          })}
        </OptionsPanel> */}

        <WelcomePanel user={user} />
        
        <div className='flexible--column homeAppointmentsManagement'>
          <p className='textDark textBold'>Gestioná tus turnos o trámites</p>
          <div className='flexible--rowWrap space-between'>
            <div className='flexible--rowWrap homeOptions'>
              <IconPanel className="icons" iconName="vaadin:pills" label="usuario" ></IconPanel>
              <IconPanel className="icons" iconName="vaadin:paperclip" label="usuario"></IconPanel>
              <IconPanel className="icons" iconName="vaadin:pills" label="usuario"></IconPanel>
            </div>
            <NextAppointment/>
          </div>
        </div>
        
        
        <div className='flexible--row space-between'>
          <HomePrescriptionsPanel receivedPrescriptions={receivedPrescriptions} />
          <HomeAppointmentsPanel data={appointments}/>
        </div>
        
        
    
    
    </div>
  )
}
