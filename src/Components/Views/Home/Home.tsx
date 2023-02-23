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
import RequestsStatePanel from '../../Panels/RequestsStatePanel/RequestsStatePanel';
import { amilogged } from '../../../services/loginService';
import { getAppointments, getBuildings, getProfessionals, getSpecialities } from '../../../services/appointmentsService';
import InputDate from '../../Inputs/InputDate/InputDate';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';

export default function Home() {

  const numbers: number[] = [1, 2, 3, 4, 5, 6];
  const intl = useIntl();


  const [country, setCountry] = useState({name: "Argentina",
    dial_code: "+54",
    code: "AR"});

  const receivedPrescriptions = [
    {doctor: "Dr. Fecceti", medicationDesc: "Agua 3 mg x 5 cajas", date: new Date(2021, 5, 25), status:"ready"},
    {doctor: "Dr. Pinna", medicationDesc: "Letrozole 2,5 mg x 3 cajas", date: new Date(2020, 3, 14), status:"observed"},
    {doctor: "Dr. Pinna", medicationDesc: "Letrozole 2,5 mg x 3 cajas", date: new Date(2020, 3, 14), status:"inCourse"}
  ]

  

  const requests = [
    {type:"Laboratorio Químico", date: new Date(2002, 3, 31).toLocaleDateString(), professional: "Dr. Pinna", state: "inCourse"},
    {type:"Laboratorio Químico", date: new Date(2022, 5, 21).toLocaleDateString(), professional: "Dr. Pinna", state: "ready"},
    {type:"Laboratorio Químico", date: new Date(2002, 3, 31).toLocaleDateString(), professional: "Dr. Pinna", state: "observed"},
    {type:"Laboratorio Químico", date: new Date(2002, 3, 31).toLocaleDateString(), professional: "Dr. Pinna", state: "inCourse"},
    {type:"Laboratorio Químico", date: new Date(2002, 3, 31).toLocaleDateString(), professional: "Dr. Pinna", state: "ready"}
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
        
        <div className='flexible--rowWrap'>
          <NextAppointment/>
          <div className='flexible--rowWrap homeOptions'>
            <IconPanel className="icons" iconName="vaadin:pills" label="usuario" ></IconPanel>
            <IconPanel className="icons" iconName="vaadin:paperclip" label="usuario"></IconPanel>
            <IconPanel className="icons" iconName="vaadin:pills" label="usuario"></IconPanel>
          </div>
          
        </div>
        
        <div className='flexible--row'>
          <HomePrescriptionsPanel receivedPrescriptions={receivedPrescriptions} />
          <RequestsStatePanel data={requests}/>
        </div>
        
        
    
    
    </div>
  )
}
