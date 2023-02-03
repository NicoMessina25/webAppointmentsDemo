import React, { useState } from 'react'
import Combobox from '../../Combobox/Combobox';
import IconPanel from '../../Panels/IconPanel/IconPanel';
import InputTextCustom from '../../Inputs/InputText/InputTextCustom';
import OptionsPanel from '../../Panels/OptionesPanel/OptionsPanel'
import './Home.scss'
import NextAppointment from '../../Panels/NextAppointment/NextAppointment';

export default function Home() {

  const numbers: number[] = [1, 2, 3, 4, 5, 6];
  
  function createComponents(){
    
    let componentes:any=[];
    
    let component={
      id:1,
      label:'roberto',
      component:<InputTextCustom></InputTextCustom>,
      footer:"Acepto solo numeros"
    }

    let component2={
      id:1,
      label:'roberto',
      component:<InputTextCustom></InputTextCustom>,
      footer:"asd"
    }

    componentes.push(component)
    componentes.push(component2)

    return componentes;
  
  }

  return (
    <div className='Home-container'>
        <OptionsPanel tittle="Este es un titulo" options={createComponents()}></OptionsPanel>
        <div>soy un componente de home</div>
        
        <div className='flexible--row'>
          <IconPanel className="icons" iconName="vaadin:pills" label="usuario"></IconPanel>
          <IconPanel className="icons" iconName="vaadin:paperclip" label="usuario"></IconPanel>
          <IconPanel className="icons" iconName="vaadin:pills" label="usuario"></IconPanel>
        </div>
        <NextAppointment></NextAppointment>
    </div>
  )
}
