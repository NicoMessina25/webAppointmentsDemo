import { Icon } from '@iconify/react';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl';
import { getAppointments, getBuildings, getProfessionals, getSpecialities } from '../../../../services/appointmentsService';
import Combobox from '../../../Combobox/Combobox';
import InputDate from '../../../Inputs/InputDate/InputDate';
import AppointmentModal from '../../../Modal/CustomModal/AppointmentModal'
import OptionsPanel from '../../../Panels/OptionesPanel/OptionsPanel';
import RadioButtonGroup from '../../../RadioButtonGroup/RadioButtonGroup';
import DayAppointmentCard from '../DayAppointmentCard/DayAppointmentCard';
import './NewAppointments.scss'

export default function NewAppointments() {

  const [appointmentModalVisibility,setAppointmentModalVisibility]=useState(false);
  const intl = useIntl();
  const [professional,setProfessional]:any=useState({});
  const [speciality,setSpeciality]:any=useState({medicalspeciality:-1});
  const [appointmentDate,setAppointmentDate]=useState(new Date());
  

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
  

  function buildingsParams2(){

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


  const optionsPanelHeader = () => {
    return <div className='flexible--rowWrap space-between'>
            <RadioButtonGroup className="radioButtonGroup littleMargin " orientation="row" options={modalityOptions} value={appointmentType} setValue={setAppointmentType} label={intl.formatMessage({ id: 'Type' })} />

            <Combobox  getItems={getBuildings} params={buildingsParams2()} label={"Sede"} value={location} optionLabel={"buildingname"} setValue={(e:any) =>
              {                 
                setLocation(e);
              }} placeholder={intl.formatMessage({id: "Select"})} className="combobox" reLoadItemsValue={professional}/>
          </div>

  }

  let [appointmentType,setAppointmentType]:any=useState(1);
  let [fragmentedAppointments,setFragmentedAppointments]:any=useState([]);
  const [appointments,setAppointments]:any=useState([]);
  let [appointmentsOfDay,setAppointmentsOfDay]:any=useState({});

  let [page,setPage]=useState(-1);

  function searchAppointments(){


    let turnos;
    //valida campos
    if(!speciality || !professional || !appointmentDate || !timeZone1 || Object.keys(timeZone1).length === 0
       || Object.keys(speciality).length === 0 && Object.keys(professional).length === 0)
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
    
    getAppointments(page*10,10,1,params).then(res=>{
      
      for(let i=0;i<res.length;i++){
        res[i].jsonappointments=JSON.parse(res[i].jsonappointments);
      }
      setAppointments([...appointments,...res]);
    });
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

  const options = [
    { label: "Presencial!", value: 1 },
    { label: "Virtual!", value: 2 }
  ];


  useEffect(()=>{
    searchAppointments();
  },[page])

  return (
    <div>
    
      <OptionsPanel buttonLabel={"Buscar turno"} onClickBtn={()=>{setPage(page+1)}}>

      <div className='flexible--row width-100'>
              <RadioButtonGroup className="width-50 radioButtonGroup littleMargin " orientation="row" options={options} value={appointmentType} setValue={setAppointmentType} label={intl.formatMessage({ id: 'Type' })} />

              <Combobox  getItems={getBuildings} params={buildingsParams()} label={"Sede"} value={location} optionLabel={"buildingname"} setValue={(e:any) =>
              {                 
                setLocation(e);
              }} placeholder={intl.formatMessage({id: "Select"})} className="combobox"  />

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
              
          <InputDate value={appointmentDate} className='inputdate '  label={"Turnos desde"} onChange={(e:any)=>{setAppointmentDate(e.value)}} showIcon dateFormat="dd/mm/yy" minDate={new Date()} placeholder='dd/mm/aaaa'/>

          <Combobox  list={timeZone} params={null} label={"Franja horaria D:"} value={timeZone1} optionLabel={"name"} setValue={(e:any) =>
              {                 
                setTimeZone1(e);
              }} placeholder={intl.formatMessage({id: "Select"})} className=" combobox"  />
         </div>     
      </OptionsPanel>

      { 
        appointments.length>=0 && 
          appointments.map((obj:any,index:any)=> {
            return <DayAppointmentCard key={index} appointments={obj}></DayAppointmentCard>
          })
      }

      
    </div>
  )
}

