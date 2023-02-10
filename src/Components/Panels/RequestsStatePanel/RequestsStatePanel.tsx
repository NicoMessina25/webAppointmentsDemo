
import React, {useContext} from 'react'
import "./RequestsStatePanel.scss"
import {DataTable} from "primereact/datatable";
import { Column } from 'primereact/column';
import { Icon } from '@iconify/react';
import { Button } from 'primereact/button';
import { appContext } from '../../Context/appContext';

export default function RequestsStatePanel({data}:any) {
    let requests;
    const {renderState}:any = useContext(appContext);

    

    requests = data.map((i:any)=>{
        return {...i, state: renderState(i.state, "buttonMain")};
    })


  return (
    <div className='requestsStatePanel'>
        <h2 className='infoText'>Estado de Solicitudes</h2>
        <DataTable 
                value={requests} 
                scrollable
                responsiveLayout="scroll"
                >
                <Column field="type" header={<p>Tipo <Icon icon="vaadin:folder-o" /></p>}></Column>
                <Column field="date" header={<p>Fecha <Icon icon="vaadin:calendar" /></p>}></Column>
                <Column field="professional" header={<p>Profesional <Icon icon="vaadin:stethoscope" /></p>}></Column>
                <Column field="state" header=""></Column>
            </DataTable>
    </div>
  )
}
