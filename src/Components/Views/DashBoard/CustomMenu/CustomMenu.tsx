import { Icon } from '@iconify/react';
import { PanelMenu } from 'primereact/panelmenu'
import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import MenuItem from '../TreeMenu/MenuItem/MenuItem';

export default function CustomMenu({activeIndex, setActiveIndex, bigMenu, settingsJson, items,setItems}:any) {


    const [urlPathName, setUrlPathName] = useState(new URL(window.location.href).pathname);
    const [expandedMenuItems, setExpandedMenuItems]:any = useState({});

    const navigate = useNavigate();

    
    useEffect(buildMenuComponent, [bigMenu, activeIndex])

    useEffect(()=>{
        console.log(urlPathName)
        if(urlPathName){
           navigate(urlPathName); 
        } else navigate("/home");
        
    },[urlPathName])

    function buildMenuComponent() {
        console.log(settingsJson)
        let menu:any = [];

        let item;
        let subItems:any;

        console.log(settingsJson.menu)
        settingsJson.menu.forEach((element:any,index:any)=> {
            item = {
                template: (item:any, options:any)=>{

                    return <MenuItem options={options} active={index===activeIndex} element={element} onClick={(e:any)=>{
                        options.onClick(e); 
                        
                        setUrlPathName(element.route?element.route:urlPathName);           
                        
                        if (element.items.length === 0) {
                            //navigate("/" + element.route)
                            setActiveIndex(index);
                        } else {
                            setExpandedMenuItems({name: element.caption})
                        }
                            
                        
                    }} />
                } 
            }

            //si tiene items dentro
            if (element.items.length > 0) {
                subItems = [];
                element.items.forEach((subItem:any, subInd:any)=>{
                    subItems.push({
                        template: ()=>{
                            return <Link to={"#"} className={"subItem" + (!urlPathName.localeCompare(subItem.route)? " activeMenu":"")} onClick={
                                (e:any)=>{
                                    setUrlPathName(subItem.route?subItem.route:urlPathName); 
                                    
                            }} ><Icon icon={subItem.icon} />{subItem.caption}</Link>
                        }

                    })
                }) 
                item = { ...item, items: subItems };

            }
            menu.push(item)
        }) 
        setItems(menu);
        //console.log(menu);
    }

    


    return (
        <PanelMenu className="" model={items} multiple/>
    )
}
