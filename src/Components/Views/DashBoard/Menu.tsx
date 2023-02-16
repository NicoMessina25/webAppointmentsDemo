import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useIntl } from "react-intl";
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from "primereact/button";
import { Icon } from '@iconify/react';
import './Menu.scss'


import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import PrivateComponent from "../../PrivateComponent/PrivateComponent";
import NewAppointments from "../Appointments/NewAppointments";
import MyAppointments from "../Appointments/MyAppointments";
import HistoricAppointments from "../Appointments/HistoricAppointments";
import NewRp from "../Prescriptions/NewRp";
import MyPrescriptions from "../Prescriptions/MyPrescriptions";
import SendStudyResults from "../ClinicHistory/SendStudyResults";
import ClinicRequest from "../ClinicHistory/ClinicRequest";
import MyProfile from "../Profile/MyProfile";
import FamilyGroup from "../FamilyGroup/FamilyGroup";
import Home from "../Home/Home";
import CustomMenu from "./CustomMenu/CustomMenu";
import TreeMenu from "./TreeMenu/TreeMenu";
import MenuItem from "./TreeMenu/MenuItem/MenuItem";

import { appContext } from '../../Context/appContext';
import { logout } from "../../../services/siteService";
import ChangePassword from "../Profile/ChangePassword/ChangePassword";
import ChangePasswordModal from "../../Modal/ChangePasswordModal/ChangePasswordModal";
import Combobox from "../../Combobox/Combobox";

const Menu = React.forwardRef((props: any, ref) => {

    
    const [bigMenu, setBigmenu] = useState(true);
    const [selectedItemKey, setSelectedItemKey] = useState(0);
    const [items, setItems]: any = useState([]);
    const intl = useIntl();
    const {restorePatientDefault}:any = useContext(appContext);
   
  const {getStorage}:any = useContext(appContext);
    let iconbutton = <Icon icon="material-symbols:menu-rounded" />
    let settingsString: any = getStorage().getItem("settings");
    let settingsJson: any;
    
    settingsJson = settingsString && JSON.parse(settingsString)

    const navigate = useNavigate();

    const [visibilityChangePasswordModal,setVisibilityChangePasswordModal]=useState(false);

    useEffect(buildMenuComponent,[]);

    function handleDisplayMenu() {
        setBigmenu(!bigMenu);
    }



    function buildMenuComponent() {
        let menu:any = [];

        let item;
        let subItems:any;

        let key = 0;
        settingsJson.menu.forEach((element:any,index:any)=> {
            item = {
                key:key.toString(),
                caption: element.caption,
                icon: element.icon,
                route: element.route
            }
            
            subItems = [];
            
            //si tiene items dentro
            if (element.items.length > 0) {
                let subKey = 0;
                element.items.forEach((subItem:any, subInd:any)=>{
                    let item2:any;
                    item2={
                        key:key + "-" + subKey,
                        caption: subItem.caption,
                        icon: subItem.icon,
                        className: "subItemContainer",
                        id:subItem.menuItem,
                        route: subItem.route
                    }
                    if(item2.id===2114){
                        delete item2.route;
                        
                    }
                    subItems.push(item2)
                    subKey++;
                })    
            }
            item = { ...item, children: subItems };
            menu.push(item)
            key++;
        }) 
        console.log(menu)
        setItems(menu);
    }

   
    function handleSignOut() {
        localStorage.clear();
        sessionStorage.clear()
        restorePatientDefault();
        logout();
        navigate('/login')
    }


    function onSelect(e:any){
        if(e.node.id===2114){
            setVisibilityChangePasswordModal(true)
        }
    }

    return (
        <div className="container">
            <div className="flexible--row header">
                {/* Header */}
                <div className="flexible--row left-div">
                    <Button className="p-button-rounded buttonMain buttonHeader " icon={iconbutton} onClick={handleDisplayMenu}></Button>
                    <h2 className="header-title">{settingsJson.siteName}</h2>
                </div>
                <Combobox className='header-combo-box '></Combobox>
            </div>

            <div className="flexible--row maxwidth menuBody" >
            
            <div className={`menu-container flexible--column ${!bigMenu?'hideLeft':""}`}>
                    <TreeMenu items={items} onSelectCustom={onSelect}  selectedItemKey={selectedItemKey} onSelectionChange={(e:any) => setSelectedItemKey(e.value)} />
                   {/* <CustomMenu activeIndex={activeIndex} setActiveIndex={setActiveIndex} bigMenu={bigMenu} settingsJson={settingsJson} items={items} setItems={setItems} /> */}
                    
                    
                    <div>

                        <div className="menuOption background-red flexible--row">
                            <Icon className="consent-medicine" icon="material-symbols:edit-document-outline-sharp" />
                            <div className="consent-medicine">{intl.formatMessage({ id: 'TelemedicineConsent' })}</div>
                        </div>
                        <div className="menuOption flexible--row" onClick={handleSignOut}>
                            <Icon className="consent-medicine" icon="vaadin:sign-out" />
                            <div className="text-secondary"> {intl.formatMessage({ id: 'SignOut' })}</div>
                        </div>
                    </div>
                    
            </div>
            
            <div className="inside-component">
                <Routes>
                    <Route element={<PrivateComponent />}>
                        <Route path='/home' element={<Home />} />
                        <Route path='/newAppointment' element={<NewAppointments />} />
                        <Route path='/myAppointments' element={<MyAppointments />} />
                        <Route path='/historicAppointments' element={<HistoricAppointments />} />
                        <Route path='/newRp' element={<NewRp />} />
                        <Route path='/myPrescriptions' element={<MyPrescriptions />} />
                        <Route path='/sendStudyResults' element={<SendStudyResults />} />
                        <Route path='/request' element={<ClinicRequest />} />
                        <Route path='/myData' element={<MyProfile />} />
                        <Route path='/familyGroup' element={<FamilyGroup />} />
                    </Route>
                </Routes>
            </div>
            </div>
            <ChangePasswordModal visible={visibilityChangePasswordModal} setVisible={setVisibilityChangePasswordModal}></ChangePasswordModal>
            
        </div>
    )
});

export default Menu;