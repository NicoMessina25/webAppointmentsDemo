import { Icon } from '@iconify/react';
import { Button } from 'primereact/button';
import React, { useState } from 'react'
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


  const optionsPanelHeader = () => {
    return <div className='flexible--rowWrap space-between'>
            <RadioButtonGroup className="radioButtonGroup littleMargin " orientation="row" options={modalityOptions} value={appointmentType} setValue={setAppointmentType} label={intl.formatMessage({ id: 'Type' })} />

            <Combobox  getItems={getBuildings} params={buildingsParams()} label={"Sede"} value={location} optionLabel={"buildingname"} setValue={(e:any) =>
              {                 
                setLocation(e);
              }} placeholder={intl.formatMessage({id: "Select"})} className="combobox" reLoadItemsValue={professional}/>
          </div>

  }

  let [appointmentType,setAppointmentType]:any=useState(1);
  let [appointments,setAppointments]:any=useState({});
  let [fragmentedAppointments,setFragmentedAppointments]:any=useState([]);

  function searchAppointments(){
    let turnos;
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
    getAppointments('',0,50,1,params).then(res=>{
      console.log(res);
      appointmentsOfDay(res);
      setAppointments(res);});
  }

  function appointmentsOfDay(appointmentsParam:any){
    let index=0;
    
    let allAppointments:any=[];
    
    let appointmentsListOfDay:any=[];
    
    let previousAppointment:any="";

    if(appointmentsParam.length==1){
      appointmentsListOfDay.push(appointmentsParam[0])
      allAppointments.push(appointmentsListOfDay);
    }else{
      const firstDate = new Date(appointmentsParam[0].appointmentdatetime);
      const firstDay = firstDate.getDate();
      const lastDate = new Date(appointmentsParam[appointmentsParam.length-1].appointmentdatetime);
      const lastDay = lastDate.getDate();
      
      if(firstDate==lastDate){
        allAppointments.push(appointmentsParam);
      }else{
        for (const app of appointmentsParam) {


          const fechaObj = new Date(app.appointmentdatetime);
          const day = fechaObj.getDate();
    
          if(previousAppointment!=""){
            const previousObj = new Date(previousAppointment.appointmentdatetime);
            const previousday = previousObj.getDate();
            if(day==previousday){
              appointmentsListOfDay.push(app)
              if(index+1==appointmentsParam.length){
                allAppointments.push(appointmentsListOfDay);
              }
            }else{
              allAppointments.push(appointmentsListOfDay);
              appointmentsListOfDay=[];
              appointmentsListOfDay.push(app)
            }
          }else{
            appointmentsListOfDay.push(app)
          }
          previousAppointment=app;
          index++;
        }
      }
    }
    setFragmentedAppointments(allAppointments)
  }

  return (
    <div className='newAppointmentsContainer'>
      <h2 className='infoText textBold'> <Icon icon="vaadin:stethoscope" /> {intl.formatMessage({id:"SeacrhAppointment"})}</h2>
      <OptionsPanel buttonLabel={intl.formatMessage({id:"SeacrhAppointment"})} header={optionsPanelHeader} className={"newAppointmentsOptionPanel"} onClickBtn={searchAppointments}>

        
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

      <p className='infoText appointmentsResultsHeader'> <span className='infoText textBold'>Turnos disponibles</span> - Resultados de tu búsqueda </p>
      {fragmentedAppointments.length>=0 && 
        fragmentedAppointments.map((obj:any,index:any)=>(
          <DayAppointmentCard key={index} appointments={obj}></DayAppointmentCard>
        ))
        
      }
      

    </div>
  )
}

