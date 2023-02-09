import { Icon } from '@iconify/react';
import { Button } from 'primereact/button';
import React, { useState } from 'react'
import { useIntl } from 'react-intl';
import AppointmentModal from '../../Modal/CustomModal/AppointmentModal'

export default function NewAppointments() {

  const [appointmentModalVisibility,setAppointmentModalVisibility]=useState(true);
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

  return (
    <div>
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
