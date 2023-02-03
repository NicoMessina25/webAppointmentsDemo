import React, { useState } from 'react'
import Combobox from '../../Combobox/Combobox';
import OptionsPanel from '../../OptionesPanel/OptionsPanel'
import './Home.scss'

export default function Home() {

  const numbers: number[] = [1, 2, 3, 4, 5, 6];
  
  function createComponents(){
    
    let componentes:any=[];
    
    let component={
      id:1,
      label:'roberto',
      component:<div>soy un fake combobox</div>
    }

    let component2={
      id:1,
      label:'roberto',
      component:<div>soy un componente raro</div>
    }

    componentes.push(component)
    componentes.push(component2)

    return componentes;
  
  }

  return (
    <div className='Home-container'>
        <OptionsPanel tittle="Este es un titulo" options={createComponents()}></OptionsPanel>
        <div>soy un componente de home</div>
    </div>
  )
}
