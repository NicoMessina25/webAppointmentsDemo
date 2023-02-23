
import React, {useContext} from 'react'
import "./HomeAppointmentsPanel.scss"
import {DataTable} from "primereact/datatable";
import { Column } from 'primereact/column';
import { Icon } from '@iconify/react';
import { Button } from 'primereact/button';
import { appContext } from '../../Context/appContext';
import AppointmentCard from './AppointmentCard/AppointmentCard';

export default function HomeAppointmentsPanel({data}:any) {


  return (
    <div className='homeAppointmentsPanel'>
        <h2 className='infoText'>Mis Turnos</h2>
        <div className='flexible--column'>
          {data.map((ap:any)=>{
            return <AppointmentCard appointment={ap}/>
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
