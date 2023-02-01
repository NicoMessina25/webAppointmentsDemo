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

const Menu = React.forwardRef((props:any,ref) => {

    const intl = useIntl();
    
    const [bigMenu, setBigmenu] = useState(true);
    let iconbutton=<Icon icon="material-symbols:menu-rounded" />


    const [items,setItems]:any=useState([]);

    const {settings}:any = useContext(appContext);

    useEffect(buildMenuComponent,[])

    function buildMenuComponent(){

        let menu =[];

        let item;
        let subItems;

        for (let i = 0; i < settings.menu.length; i++) {
            item={
                label: settings.menu[i].caption.toUpperCase(),
                icon: <Icon icon={settings.menu[i].icon} />,
                subItems:[],
            }
            
            //si tiene items dentro
            if(settings.menu[i].items.length>0){
                subItems = [];
                for (let j = 0; j < settings.menu[i].items.length; j++) {
                    let subitem={
                        label: settings.menu[i].items[j].caption,
                        //icon: <Icon icon={settings.menu[i].items[j].icon} />,
                    }
                    subItems.push(subitem)
                }
                item={...item,items:subItems};
                
            }
            menu.push(item)
        }
        setItems(menu);

    }

    function addTextToItems(){
        
        let completeItems=[...items];

        completeItems=settings.menu.map((element:any)=>{
            return {...element,label:element.caption.toUpperCase()}
        })
        
       setItems(completeItems)
        
       

        //    iconsItems=settings.menu.map((element:any)=>{
        //     return {...element,label:element.caption.toUpperCase()}})
       



        // for (let i = 0; i < settings.menu.length; i++) {
        //     item={
        //         label: settings.menu[i].caption.toUpperCase(),
        //     }
            
        //     //si tiene items dentro
        //     if(settings.menu[i].items.length>0){
        //         subItems = [];
        //         for (let j = 0; j < settings.menu[i].items.length; j++) {
        //             let subitem={
        //                 label: settings.menu[i].items[j].caption,
        //                 //icon: <Icon icon={settings.menu[i].items[j].icon} />,
        //             }
        //             subItems.push(subitem)
        //         }
        //         item={...item,items:subItems};
                
        //     }
        //     menu.push(item)
        // }
        // setItems(menu);
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
                <h2 className="header-title">{settings.siteName}</h2>
               
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
