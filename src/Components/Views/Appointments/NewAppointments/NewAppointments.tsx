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

export default function NewAppointments() {

  const [appointmentModalVisibility,setAppointmentModalVisibility]=useState(false);
  const intl = useIntl();
  function createComponentsModal(){
    
    let components:any=[];
    
    let component={
      icon: <Icon icon="vaadin:user" ></Icon>,
      label: "Paciente",
      description:"Juan Domingo Pérez",
      background:"grey-background",
      footer: <div>
        <p>Mail: Roberto@advenio.com.ar</p>
        <p>cel:224 540 7663</p>
        <p>Obra social: swift medical</p>
      </div>
    }
    components.push(component)
    component={
      icon: <Icon icon="vaadin:doctor" ></Icon>,
      label: "Profesional",
      background:"",
      description:"Dr. Diego Pinna",
      footer: <div>
      </div>
    }
    components.push(component)
    component={
      icon: <Icon icon="vaadin:stethoscope" ></Icon>,
      label: "Especialidad",
      background:"",
      description:"Clínica médica",
      footer: <div>
      </div>
    }
    components.push(component)

    component={
      icon: <Icon icon="vaadin:calendar" ></Icon>,
      label: "Fecha y hora",
      background:"",
      description:"Martes 28 06 2022 16:00",
      footer: <div>
      </div>
    }
    components.push(component)

    
    component={
      icon: <Icon icon="vaadin:map-marker" ></Icon>,
      label: "Modalidad y lugar",
      background:"",
      description:"Consultorio clinica san luis 2143",
      footer: <div>
      </div>
    }


    components.push(component)

    return components;
  
  }

  function createModalFooter(){
    let footer:any=[];
    
    footer={
      description:<div>
          <p>Texto informativo que cada centro de </p>
          <p>salud quiera poner en este campo.</p>
        </div>,
      background:"orange-background"
    }
    return footer
  }

  function createButtons(){
    let components:any=[];
    
    let buttons:any=[];

    buttons.push(<Button key={1} className='buttonMain2' label="09:00 am"></Button>)
    buttons.push(<Button key={2} className='buttonMain2' label="10:00 am"></Button>)
    // buttons.push(<Button className='buttonMain2' label="18:00 am"></Button>)
    buttons.push(<Button key={3} className='buttonMain2' label="19:00 am"></Button>)
    buttons.push(<Button key={4} className='buttonMain2' label="20:00 am"></Button>)
    
    buttons.push(<Button key={5} className='buttonMain2' label="20:00 am"></Button>)
    
    buttons.push(<Button key={6} className='buttonMain2' label="20:00 am"></Button>)

    let component={
      icon: <Icon icon="vaadin:clock" ></Icon>,
      description:"Elegir horario",
      component:buttons
    }


    components.push(component)
    return components
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
    getAppointments('',0,50,1,params).then(res=>{appointmentsOfDay(res);setAppointments(res);});
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

  let [appointmentType,setAppointmentType]:any=useState(1);

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
    <div>
     
      <OptionsPanel buttonLabel={"Buscar turno"} onClickBtn={searchAppointments}>

      <div className='flexible--row width-100'>
              <RadioButtonGroup className="width-50 radioButtonGroup littleMargin " orientation="row" options={options} value={appointmentType} setValue={setAppointmentType} label={intl.formatMessage({ id: 'Type' })} />

            <Combobox  getItems={getBuildings} params={buildingsParams()} label={"Sede"} value={location} optionLabel={"buildingname"} setValue={(e:any) =>
              {                 
                setLocation(e);
              }} placeholder={intl.formatMessage({id: "Select"})} className="width-50 combobox" reLoadItemsValue={professional}/>
      </div>

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

      {fragmentedAppointments.length>=0 && 
        fragmentedAppointments.map((obj:any,index:any)=>(
          <DayAppointmentCard key={index} appointments={obj}></DayAppointmentCard>
        ))
      }


      <AppointmentModal visible={appointmentModalVisibility} setVisible={setAppointmentModalVisibility} header={intl.formatMessage({ id: 'CancelYourRecovery' })} footerButtonLeftText={intl.formatMessage({ id: 'Cancel' })} footerButtonRightText={intl.formatMessage({ id: 'Confirm' })} 
        onClickRightBtn={()=>{console.log("press")}}
        pathRightBtn={"#"} 
        detailsList={createComponentsModal()}
        modalfooter={createModalFooter()}
        components={createButtons()}
        ></AppointmentModal>
    </div>
  )
}
