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

  const [professional,setProfessional]:any=useState({});
  const [speciality,setSpeciality]:any=useState({medicalspeciality:-1});
  const [appointmentDate,setAppointmentDate]=useState("");
  

  let params={
    facetoface:true,
    allowsdigitalrp:null,
    medicalspeciality:speciality.medicalspeciality
  }

  let params2={
    professional:professional.professional
  }

  let timeZone=[{name:intl.formatMessage({id:"Morning"})},{name:intl.formatMessage({id:"Afternoon"})+'-'+intl.formatMessage({id:"Night"})}]
  let [timeZone1,setTimeZone1]:any=useState({});
  let [location,setLocation]:any=useState({});


  function searchAppointments(){
    console.log(speciality.medicalspeciality)
    
    // console.log(appointmentDate)
    //valida campos
    if(!speciality || !professional || !appointmentDate || !timeZone1 || Object.keys(timeZone1).length === 0
       || Object.keys(speciality).length === 0 && Object.keys(professional).length === 0 || appointmentDate==="")
      return 

    let params={
      language:1,
      medicalspeciality:speciality.medicalspeciality,
      professional:professional.professional,
      videocall:false,
      building:3,
      hour:"",
      time:timeZone1.name,
      date:appointmentDate
    }
    console.log(getAppointments('',0,20,1,params).then(res=>res))
  }
  

  function buildingsParams(){

    if(!speciality || !professional || Object.keys(speciality).length === 0 && Object.keys(professional).length === 0)
    return {
      speciality:-1,
      professional:-1
    }
    return {
      speciality:speciality.medicalspeciality,
      professional:professional.professional
    }
  }

  return (
    <div className='Home-container'>
        <OptionsPanel buttonLabel={"Buscar turno"} onClickBtn={searchAppointments}>
        
        <Combobox  getItems={getSpecialities} params={params2} label={"Especialidad D:"} value={speciality} 
            //reLoadItemsValue={professional}
           optionLabel={"name"} setValue={(e:any) =>
            {                 
              setSpeciality(e);
            }} placeholder={intl.formatMessage({id: "Select"})} className="width-50 combobox"  />

          <Combobox  getItems={getProfessionals} params={params} label={"Profesional :D"} value={professional} optionLabel={"prefixAndFullName"} setValue={(e:any)=>
            {                 
              setProfessional(e);
            }} placeholder={intl.formatMessage({id: "Select"})} className="width-50 combobox" reLoadItemsValue={speciality}  />

          

            
        <InputDate value={setSpeciality} className='inputdate width-50'  label={"Turnos desde"} onChange={(e:any)=>{setAppointmentDate(e.value)}} showIcon dateFormat="dd/mm/yy" minDate={new Date()} placeholder='dd/mm/aaaa'/>

        <Combobox  list={timeZone} params={null} label={"Franja horaria D:"} value={timeZone1} optionLabel={"name"} setValue={(e:any) =>
            {                 
              setTimeZone1(e);
            }} placeholder={intl.formatMessage({id: "Select"})} className="width-50 combobox"  />

        { Object.keys(speciality).length > 0 && Object.keys(professional).length > 0 &&
          <Combobox  getItems={getBuildings} params={buildingsParams()} label={"Sede"} value={location} optionLabel={"buildingname"} setValue={(e:any) =>
            {                 
              setLocation(e);
            }} placeholder={intl.formatMessage({id: "Select"})} className="width-50 combobox" reLoadItemsValue={professional} />}
        </OptionsPanel>

        
        
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
