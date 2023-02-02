import React, { useEffect } from "react";
import {  useState } from "react";
import { useIntl } from "react-intl";
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from "primereact/button";
import { Icon } from '@iconify/react';
import './Menu.scss'


import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import PrivateComponent from "../../PrivateComponent/PrivateComponent";
import ForgotPasswordStepOne from "../../ForgotPassword/ForgotPassword";
import NewAppointments from "../Appointments/NewAppointments";
import MyAppointments from "../Appointments/MyAppointments";
import HistoricAppointments from "../Appointments/HistoricAppointments";
import NewRp from "../Prescriptions/NewRp";
import MyPrescriptions from "../Prescriptions/MyPrescriptions";
import SendStudyResults from "../ClinicHistory/SendStudyResults";
import ClinicRequest from "../ClinicHistory/ClinicRequest";
import MyProfile from "../Profile/MyProfile";
import FamilyGroup from "../FamilyGroup/FamilyGroup";
import Home from "../Home";

const Menu = React.forwardRef((props:any,ref) => {

    let settingsString:any = localStorage.getItem("settings");
    const [bigMenu, setBigmenu] = useState(true);
    const intl = useIntl();
    const [items,setItems]:any=useState([]);
    let iconbutton=<Icon icon="material-symbols:menu-rounded" />
    let settingsJson:any;
    if(settingsString)
            settingsJson=JSON.parse(settingsString)
    
    let navigate = useNavigate();

    useEffect(buildMenuComponent,[])
  
    function buildMenuComponent(){
       
        let menu =[];

        let item;
        let subItems;

        console.log(settingsJson.menu)
        for (let i = 0; i < settingsJson.menu.length; i++) {
            item={
                label: settingsJson.menu[i].caption.toUpperCase(),
                icon: <Icon icon={settingsJson.menu[i].icon} />,
                subItems:[],
                command:()=> {return settingsJson.menu[i].items.length>0  ? "" : navigate('/'+settingsJson.menu[i].route)}
            }
            
            //si tiene items dentro
            if(settingsJson.menu[i].items.length>0){
                subItems = [];
                for (let j = 0; j < settingsJson.menu[i].items.length; j++) {
                    let subitem={
                        label: settingsJson.menu[i].items[j].caption,
                        icon: <Icon icon={settingsJson.menu[i].items[j].icon} />,
                        command:()=> {navigate('./'+settingsJson.menu[i].items[j].route)}
                        
                    }
                    subItems.push(subitem)
                }
                item={...item,items:subItems};
                
            }
            menu.push(item)
        }
        setItems(menu);

    }

    function handleDisplayMenu(){
        
        setBigmenu(!bigMenu);

        let iconsItems=[...items];

        if(!bigMenu){
            buildMenuComponent()
         }else{
            iconsItems=items.map((element:any)=>{
                 return {...element,label:''}
            })
            setItems(iconsItems)
         }

    }
    
    return (
        <div className="flexible--column container">
            <div className="flexible--row header">
                {/* Header */}
                <Button className="p-button-rounded buttonHeader" icon={iconbutton} onClick={handleDisplayMenu}></Button>
                <h2 className="header-title">{settingsJson.siteName}</h2>
               
            </div>
            
            <div className="menu-container">
                <PanelMenu className="" model={items} />
                <div>
                    <div className="background-red">
                        <a className="consent-medicine"><Icon icon="material-symbols:edit-document-outline-sharp" />Consentimiento telemedicina</a>
                    </div>
                    <div>
                        <p className="text-secondary"><Icon className="consent-medicine" icon="vaadin:sign-out"  /> cerrar sesion</p>
                    </div>
                </div>
            </div>
        
            <Routes>
                <Route element={<PrivateComponent/>}>
                    <Route path='/home' element={<Home/>  }/>
                    <Route path='/forgotPassword' element={<ForgotPasswordStepOne/>  }/>
                    <Route path='/newAppointment' element={<NewAppointments/>  }/>
                    <Route path='/myAppointments' element={<MyAppointments/>  }/>
                    <Route path='/historicAppointments' element={<HistoricAppointments/>  }/>
                    <Route path='/newRp' element={<NewRp/>  }/>
                    <Route path='/myPrescriptions' element={<MyPrescriptions/>  }/>
                    <Route path='/sendStudyResults' element={<SendStudyResults/>  }/>
                    <Route path='/request' element={<ClinicRequest/>  }/>
                    <Route path='/myProfile' element={<MyProfile/>  }/>
                    <Route path='/familyGroup' element={<FamilyGroup/>  }/>
                </Route>
            </Routes>
        
        
        </div>
    )
});

export default Menu;
