import { Icon } from '@iconify/react';
import { Button } from 'primereact/button';
import React, { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl';
import { getAppointments} from '../../../../services/sAppointmentsService';
import {getProfessionals, getSpecialities, getBuildings } from '../../../../services/sGeneralService';
import Combobox from '../../../Combobox/Combobox';
import { appContext } from '../../../Context/appContext';
import InputDate from '../../../Inputs/InputDate/InputDate';
import Loader from '../../../Loader/Loader';
import AppointmentModal from '../../../Modal/AppointmentModal/AppointmentModal';
import OptionsPanel from '../../../Panels/OptionesPanel/OptionsPanel';
import RadioButtonGroup from '../../../RadioButtonGroup/RadioButtonGroup';
import DayAppointmentCard from '../DayAppointmentCard/DayAppointmentCard';
import './NewAppointments.scss'

export default function NewAppointments() {


  const [activeDayIndex,setActiveDayIndex]=useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const intl = useIntl();
  const [appointmentData,setAppointmentData]:any=useState({
    professional:null,
    speciality:null,
    date:new Date(),
    type:1,
    timeZone1:null,
    location:null,
  });
  const [appointments,setAppointments]:any=useState([]);
  const [isLoadingAppointments,setIsLoadingAppointments]=useState(false);
  const [displayAppointmentModal,setDisplayAppointmentModal]=useState(false);

  const {user}:any = useContext(appContext);
 

  let [page,setPage]=useState(0);
  

  let params={
    facetoface:appointmentData.type===1,
    medicalspeciality:appointmentData.speciality?.medicalspeciality,
    building:appointmentData.location?.buildingid,
  }

  let params2={
    professional:appointmentData.professional?.professional
  }

  let timeZone=[{name:intl.formatMessage({id:"Morning"})},{name:intl.formatMessage({id:"Afternoon"})+'-'+intl.formatMessage({id:"Night"})}]
  
  

  function buildingsParams2(){

    if(!appointmentData.speciality || !appointmentData.professional || Object.keys(appointmentData.speciality).length === 0 && Object.keys(appointmentData.professional).length === 0)
    return {
      speciality:-1,
      professional:-1
    }
    return {
      speciality:appointmentData.speciality.medicalspeciality,
      professional:appointmentData.professional.professional
    }
  }

  const modalityOptions = [
    { label: intl.formatMessage({id:"Office"}), value: 1 },
    { label: intl.formatMessage({id:"Telemedicine"}), value: 2 }
  ];


  const optionsPanelHeader = () => {
    return <div className='flexible--rowWrap space-between'>
            <RadioButtonGroup className="radioButtonGroup littleMargin " orientation="row" options={modalityOptions} value={appointmentData.type} setValue={(value:any, fieldId:string)=>{
              setAppointmentData({...appointmentData,type:value});
            }} label={intl.formatMessage({ id: 'Type' })} />

            <Combobox  getItems={getBuildings} params={buildingsParams2()} label={"Sede"} value={appointmentData.location} optionLabel={"buildingname"} setValue={(e:any) =>
              {                 
                setAppointmentData({...appointmentData,location:e});
              }} placeholder={intl.formatMessage({id: "All"})} showClear className="combobox"/>
          </div>

  }

  

  function searchAppointments(){

    setIsLoadingAppointments(true);
    //valida campos
    /* if(!speciality || !professional || !appointmentDate || !timeZone1 || Object.keys(timeZone1).length === 0
       || Object.keys(speciality).length === 0 && Object.keys(professional).length === 0)
      return  */

    let params={
      language:1,
      medicalspeciality:appointmentData.speciality?.medicalspeciality,
      professional:appointmentData.professional?.professional,
      videocall:appointmentData.type===2,
      building:appointmentData.location?.buildingid,
      hour:"",
      time:appointmentData.timeZone1?.name,
      date:appointmentData.date
    }
    
    getAppointments(page*10,10,1,params).then(res=>{

      
      
      for(let i=0;i<res.length;i++){
        res[i].jsonappointments=JSON.parse(res[i].jsonappointments);
      }
      if(page===0){
        setAppointments(res);
      } else {
        setAppointments([...appointments,...res]);
      }
      
      setIsLoadingAppointments(false);

    });

  }


  useEffect(()=>{    
    searchAppointments();
  },[page]);

  

  return (
    <div className='newAppointmentsContainer'>
      <h2 className='infoText textBold'> <Icon icon="vaadin:stethoscope" /> {intl.formatMessage({id:"SeacrhAppointment"})}</h2>
      <OptionsPanel buttonLabel={"Buscar turno"} header={optionsPanelHeader} className={"newAppointmentsOptionPanel"} onClickBtn={()=>{page !== 0? setPage(0):searchAppointments()}}>

              <Combobox  getItems={getSpecialities} params={params2} label={"Especialidad D:"} value={appointmentData.speciality} 
          
            optionLabel={"name"} setValue={(e:any) =>
              {                 
                setAppointmentData({...appointmentData,speciality:e});
              }} placeholder={intl.formatMessage({id: "All"})} showClear className="combobox"  />

            <Combobox  getItems={getProfessionals} params={params} label={"Profesional :D"} value={appointmentData.professional} optionLabel={"prefixAndFullName"} setValue={(e:any)=>
              {                                  
                setAppointmentData({...appointmentData,professional:e});
              }} placeholder={intl.formatMessage({id: "All"})} showClear className="combobox" reLoadItemsValue={{speciality: appointmentData.speciality, location:appointmentData.location}}  />
              
          <InputDate value={appointmentData.date} className='inputdate '  label={"Turnos desde"} onChange={(e:any)=>{setAppointmentData({...appointmentData, date:e.value})}} showIcon dateFormat="dd/mm/yy" minDate={new Date()} placeholder='dd/mm/aaaa'/>

          <Combobox  list={timeZone} params={null} label={"Franja horaria D:"} value={appointmentData.timeZone1} optionLabel={"name"} setValue={(e:any) =>
              {                 
                setAppointmentData({...appointmentData,timeZone1:e});
              }} placeholder={intl.formatMessage({id: "All"})} showClear className=" combobox"  />    
      </OptionsPanel>

      
      
      { 
        isLoadingAppointments? <Loader size={32} strokeWidth={6} className="primarySpinner"/> : (appointments.length > 0) ? 
          <div>
            <p className='infoText appointmentsResultsHeader'> <span className='infoText textBold'>Turnos disponibles</span> - Resultados de tu búsqueda </p>
            {appointments.map((obj:any,index:any)=> {
              
                return <DayAppointmentCard key={index} index={index} activeDayIndex={activeDayIndex} activeIndex={activeIndex} setActiveDayIndex={setActiveDayIndex} setActiveIndex={setActiveIndex} appointments={obj} onClickSchedule={()=>{setDisplayAppointmentModal(true)}}></DayAppointmentCard>
            
            
            })}
          </div>:<h2 className='infoText textBold noAppointmentsFound'>No se encontraron turnos disponibles</h2>
        
      }

      <AppointmentModal visible={displayAppointmentModal} setVisible={setDisplayAppointmentModal} patient={user} appointment={appointmentData} />

    </div>

    
  )
}

