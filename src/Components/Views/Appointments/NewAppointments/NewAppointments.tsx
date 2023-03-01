import { Icon } from '@iconify/react';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl';
import { getAppointments} from '../../../../services/sAppointmentsService';
import {getProfessionals, getSpecialities, getBuildings } from '../../../../services/sGeneralService';
import Combobox from '../../../Combobox/Combobox';
import InputDate from '../../../Inputs/InputDate/InputDate';
import AppointmentModal from '../../../Modal/CustomModal/AppointmentModal'
import OptionsPanel from '../../../Panels/OptionesPanel/OptionsPanel';
import RadioButtonGroup from '../../../RadioButtonGroup/RadioButtonGroup';
import DayAppointmentCard from '../DayAppointmentCard/DayAppointmentCard';
import './NewAppointments.scss'

export default function NewAppointments() {

  const [appointmentModalVisibility,setAppointmentModalVisibility]=useState(false);
  const [activeDayIndex,setActiveDayIndex]=useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
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
  
  const [appointments,setAppointments]:any=useState([]);
 

  let [page,setPage]=useState(0);

  function searchAppointments(){


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


  useEffect(()=>{
    searchAppointments();
  },[page])

  /* useEffect(()=>{
    appointments.length > 0 && buildBooleansArray();
    
  },[appointments]) */



  const [booleansArray,setBooleansArray]:any=useState([]);

  /* function buildBooleansArray(){
    let _booleansArray:any = [];

    appointments.map((ap:any, index:any)=>{
      let booleansElement = {day: false, appointments: new Array(ap.jsonappointments.length)};
      booleansElement.appointments.fill(false);
      _booleansArray[index] = booleansElement;
    });



    /* let subBooleanArrayCopy=[];
    let webAppointments=appointments; 

    
    //console.log(booleanArrayCopy)
    //setBooleansArray(_booleansCopy);
    
    setBooleansArray(_booleansArray);

  } */

  //declare a new array and fill it with false values
/*   function resetBooleansArray(){
    let booleanArrayCopy=[...booleansArray];
    booleanArrayCopy.map((arr:any,index:any)=>{
      booleanArrayCopy[index].day=false;
      booleanArrayCopy[index].appointments.fill(false);
    })
    setBooleansArray(booleanArrayCopy);
  } */





  /* function disableAll(){
    let buttonsArrayCopy=[...booleansArray];
    buttonsArrayCopy.map((arr:any,index:any)=>{
      buttonsArrayCopy[index].fill(false)
    })
    setBooleansArray(buttonsArrayCopy);
  } */

  

  return (
    <div className='newAppointmentsContainer'>
      <h2 className='infoText textBold'> <Icon icon="vaadin:stethoscope" /> {intl.formatMessage({id:"SeacrhAppointment"})}</h2>
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
              
          <InputDate value={appointmentDate} className='inputdate '  label={"Turnos desde"} onChange={(e:any)=>{setAppointmentDate(e.value)}} showIcon dateFormat="dd/mm/yy" minDate={new Date()} placeholder='dd/mm/aaaa'/>

          <Combobox  list={timeZone} params={null} label={"Franja horaria D:"} value={timeZone1} optionLabel={"name"} setValue={(e:any) =>
              {                 
                setTimeZone1(e);
              }} placeholder={intl.formatMessage({id: "Select"})} className=" combobox"  />    
      </OptionsPanel>

      
      <p className='infoText appointmentsResultsHeader'> <span className='infoText textBold'>Turnos disponibles</span> - Resultados de tu búsqueda </p>
      { 
        appointments.length > 0 && 
          appointments.map((obj:any,index:any)=> {
            
            return <DayAppointmentCard key={index} index={index} activeDayIndex={activeDayIndex} activeIndex={activeIndex} setActiveDayIndex={setActiveDayIndex} setActiveIndex={setActiveIndex} appointments={obj}></DayAppointmentCard>
          })
        
      }
    </div>
  )
}

