import React from "react";
import { useImperativeHandle, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { PanelMenu } from 'primereact/panelmenu';
import { simulateBuildMenu } from "../../services/menuService";
import { Button } from "primereact/button";

const Menu = React.forwardRef((props:any,ref) => {

    const intl = useIntl();
    
    const [visible, setVisible] = useState(false);

    const menu = useRef(null);

    useImperativeHandle(ref, () => ({

        toggleMenu(e:any) {
          setVisible(!visible)
        }
      }));

    let menuJSON: any=simulateBuildMenu();

    const [items,setItems]=useState([]);

    function buildMenuComponent(){

        for (let i = 0; i < menuJSON.menuBuilder.length; i++) {
            // console.log(menuJSON.menuBuilder[i].name);
            // if (menuJSON.menuBuilder[i].name )
            // }
        }
    }

    
    return (
        <div>
            <h1>asd</h1>
            <Button onClick={buildMenuComponent}/>
        </div>
    )
});

export default Menu;
