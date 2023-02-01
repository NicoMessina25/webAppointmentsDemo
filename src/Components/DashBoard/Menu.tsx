import React, { useContext, useEffect } from "react";
import { useImperativeHandle, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from "primereact/button";
import  { FaStethoscope } from 'react-icons/fa';
import { Icon } from '@iconify/react';
import './Menu.scss'
import { appContext } from "../Context/appContext";
import Combobox from "../Combobox/Combobox";


import { Link, Navigate, useNavigate } from 'react-router-dom';

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

        
        for (let i = 0; i < settingsJson.menu.length; i++) {
            console.log(settingsJson.menu)
            item={
                label: settingsJson.menu[i].caption.toUpperCase(),
                icon: <Icon icon={settingsJson.menu[i].icon} />,
                subItems:[],
                command:()=> {return settingsJson.menu[i].items.length>0 ? "" : navigate('/'+settingsJson.menu[i].route)}
            }
            
            //si tiene items dentro
            if(settingsJson.menu[i].items.length>0){
                subItems = [];
                for (let j = 0; j < settingsJson.menu[i].items.length; j++) {
                    let subitem={
                        label: settingsJson.menu[i].items[j].caption,
                        icon: <Icon icon={settingsJson.menu[i].items[j].icon} />,
                        command:()=> {navigate('/'+settingsJson.menu[i].items[j].route)}
                        
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
        </div>
    )
});

export default Menu;
