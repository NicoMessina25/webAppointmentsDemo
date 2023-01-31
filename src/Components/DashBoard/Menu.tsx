import React, { useContext, useEffect } from "react";
import { useImperativeHandle, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { PanelMenu } from 'primereact/panelmenu';
import { buildMenu, simulateBuildMenu } from "../../services/menuService";
import { Button } from "primereact/button";
import  { FaStethoscope } from 'react-icons/fa';
import { Icon } from '@iconify/react';
import './Menu.scss'
import { appContext } from "../Context/appContext";

const Menu = React.forwardRef((props:any,ref) => {

    const intl = useIntl();
    
    const [bigMenu, setBigmenu] = useState(true);
    let iconbutton=<Icon icon="material-symbols:menu-rounded" />

    let menuJSON: any=buildMenu();

    const [items,setItems]:any=useState([]);

    const {settings}:any = useContext(appContext);

    useEffect(buildMenuComponent,[])

    function buildMenuComponent(){
        
        let menu =[];

        console.log(settings.menu)

        for (let i = 0; i < settings.menu.length; i++) {
            let item={
                icon: <Icon icon={settings.menu[i].icon} />,
                label: settings.menu[i].caption,
            }
            menu.push(item)
            
        }
        setItems(menu);

    }

    function handleDisplayMenu(){
        //setBigmenu(!bigMenu);

        //let fakeItems=[...items];

        // if(!bigMenu){
        //     fakeItems=items.map((element:any)=>{
        //          return {...element,label:element.label}
        //     })
        //     setItems(fakeItems)
        //  }else{
        //      fakeItems=items.map((element:any)=>{
        //          return {...element,label:''}
        //     })
        //     setItems(fakeItems)
        //  }
 
         //setItems(fakeItems)


    }
    
    return (
        <div>
            <Button className="button8" icon={iconbutton} onClick={handleDisplayMenu}></Button>
            <PanelMenu model={items} />
        </div>
    )
});

export default Menu;
