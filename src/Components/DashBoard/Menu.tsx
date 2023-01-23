import React, { useEffect } from "react";
import { useImperativeHandle, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { PanelMenu } from 'primereact/panelmenu';
import { simulateBuildMenu } from "../../services/menuService";
import { Button } from "primereact/button";
import  { FaStethoscope } from 'react-icons/fa';
import { Icon } from '@iconify/react';
import './Menu.scss'


const Menu = React.forwardRef((props:any,ref) => {

    const intl = useIntl();
    
    const [bigMenu, setBigmenu] = useState(false);
    let iconbutton=<Icon icon="material-symbols:menu-rounded" />

    let menuJSON: any=simulateBuildMenu();

    const [items,setItems]:any=useState([]);

    let icon=[ 
        <Icon icon="vaadin:home" />,
        <Icon icon="vaadin:pills" />,
        <Icon icon="vaadin:stethoscope" />,
        <Icon icon="vaadin:folder-o" />,
        <Icon icon="vaadin:user" />,
        <Icon icon="vaadin:family" />,
    ]

    useEffect(buildMenuComponent,[])
    

    function buildMenuComponent(){
        let itemsBuilder=[]; 

        for (let i = 0; i < menuJSON.menuBuilder.items.length; i++) {
            let item={
                icon:icon[i]
            }
            itemsBuilder.push(item)
        }
        setItems(itemsBuilder);
    }

    function handleDisplayMenu(){
        setBigmenu(!bigMenu);
        let fakeItems=[...items];
        if(!bigMenu){
           fakeItems=items.map((element:any)=>{
                return {...element,label:'anda?'}
           })
           setItems(fakeItems)
        }else{
            fakeItems=items.map((element:any)=>{
                return {...element,label:''}
           })
           setItems(fakeItems)
        }
    }
    
    return (
        <div>
            <Button className="button8" icon={iconbutton} onClick={handleDisplayMenu}></Button>
            <PanelMenu model={items} />
        </div>
    )
});

export default Menu;
