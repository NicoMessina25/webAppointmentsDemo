import { Icon } from '@iconify/react';
import { Button } from 'primereact/button';
import React, { useState } from 'react'
import { useIntl } from 'react-intl';
import { getAppointments, getBuildings, getProfessionals, getSpecialities } from '../../../services/appointmentsService';
import Combobox from '../../Combobox/Combobox';
import InputDate from '../../Inputs/InputDate/InputDate';
import AppointmentModal from '../../Modal/CustomModal/AppointmentModal'
import OptionsPanel from '../../Panels/OptionesPanel/OptionsPanel';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';
import './NewAppointments.scss'

export default function NewAppointments() {

  const [appointmentModalVisibility,setAppointmentModalVisibility]=useState(false);
  const intl = useIntl();
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
    
    // console.log(appointmentDate)
    //valida campos
    if(!speciality || !professional || !appointmentDate || !timeZone1 || Object.keys(timeZone1).length === 0
       || Object.keys(speciality).length === 0 && Object.keys(professional).length === 0 || appointmentDate==="")
      return 

    let params={
      language:1,
      medicalspeciality:speciality.medicalspeciality,
      professional:professional.professional,
      videocall:appointmentType===2 ? true : false,
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

  const modalityOptions = [
    { label: intl.formatMessage({id:"Office"}), value: 1 },
    { label: intl.formatMessage({id:"Telemedicine"}), value: 2 }
  ];

  let [appointmentType,setAppointmentType]:any=useState(1);

  const optionsPanelHeader = () => {
    return <div className='flexible--rowWrap space-between'>
            <RadioButtonGroup className="radioButtonGroup littleMargin " orientation="row" options={modalityOptions} value={appointmentType} setValue={setAppointmentType} label={intl.formatMessage({ id: 'Type' })} />

            <Combobox  getItems={getBuildings} params={buildingsParams()} label={"Sede"} value={location} optionLabel={"buildingname"} setValue={(e:any) =>
              {                 
                setLocation(e);
              }} placeholder={intl.formatMessage({id: "Select"})} className="combobox" reLoadItemsValue={professional}/>
          </div>

  }

  return (
    <div className='newAppointmentsContainer'>
     
      <OptionsPanel buttonLabel={"Buscar turno"} header={optionsPanelHeader} className={"newAppointmentsOptionPanel"} onClickBtn={searchAppointments}>

        
        <Combobox  getItems={getSpecialities} params={params2} label={"Especialidad D:"} value={speciality} 
              //reLoadItemsValue={professional}
            optionLabel={"name"} setValue={(e:any) =>
              {                 
                setSpeciality(e);
              }} placeholder={intl.formatMessage({id: "Select"})} className="combobox"  />

            <Combobox  getItems={getProfessionals} params={params} label={"Profesional :D"} value={professional} optionLabel={"prefixAndFullName"} setValue={(e:any)=>
              {                 
                setProfessional(e);
              }} placeholder={intl.formatMessage({id: "Select"})} className="combobox" reLoadItemsValue={speciality}  />
              
          <InputDate value={setSpeciality} className='inputdate '  label={"Turnos desde"} onChange={(e:any)=>{setAppointmentDate(e.value)}} showIcon dateFormat="dd/mm/yy" minDate={new Date()} placeholder='dd/mm/aaaa'/>

          <Combobox  list={timeZone} params={null} label={"Franja horaria D:"} value={timeZone1} optionLabel={"name"} setValue={(e:any) =>
              {                 
                setTimeZone1(e);
              }} placeholder={intl.formatMessage({id: "Select"})} className=" combobox"  />
              
      </OptionsPanel>

    </div>
  )
}
