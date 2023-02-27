
import React, {useContext} from 'react'
import "./HomeAppointmentsPanel.scss"
import AppointmentCard from './AppointmentCard/AppointmentCard';
import { useIntl } from 'react-intl';

export default function HomeAppointmentsPanel({data}:any) {

  const intl = useIntl();

  return (
    <div className='homeAppointmentsPanel'>
        <h2 className='infoText'> {intl.formatMessage({id:"MyAppointments"})} </h2>
        <div className='flexible--column'>
          {data.map((ap:any, ind:any)=>{
            return <AppointmentCard key={ind} appointment={ap}/>
          })}
        </div>
        
        {/* <DataTable 
            value={requests} 
            scrollable
            responsiveLayout="scroll"
            >
            <Column field="type" header={<p>Tipo <Icon icon="vaadin:folder-o" /></p>}></Column>
            <Column field="date" header={<p>Fecha <Icon icon="vaadin:calendar" /></p>}></Column>
            <Column field="professional" header={<p>Profesional <Icon icon="vaadin:stethoscope" /></p>}></Column>
            <Column field="state" header=""></Column>
        </DataTable> */}
    </div>
  )
}
