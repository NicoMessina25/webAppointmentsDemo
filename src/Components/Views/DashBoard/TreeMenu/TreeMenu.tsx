import React, {useState} from 'react';
import { Tree } from 'primereact/tree';
import MenuItem from './MenuItem/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './TreeMenu.scss'

export default function TreeMenu({items, selectedItemKey, onSelectionChange}:any) {

    const navigate:any = useNavigate();
    const [expandedKeys, setExpandedKeys]:any = useState({});

    const itemTemplate = (item:any) => {

        if(!item.key.includes("-"))
            return <MenuItem element={item} />

        return <div /* to={"./" + item.route} */ className={"subItem"} ><Icon icon={item.icon} />{item.caption}</div>
    }

    function onSelect(e:any){
        if(e.node.route){
            navigate("./" + e.node.route);
        } 
        
        toggleNode(e.node, {...expandedKeys});
          
    
            
    }

    const toggleNode = (node:any, _expandedKeys:any) => {
        if (node.children && node.children.length) {
            if(_expandedKeys[node.key]){
                delete _expandedKeys[node.key]
            } else {
                _expandedKeys[node.key] =  true;
            }
        }
        setExpandedKeys(_expandedKeys);
    }

    const collapseNode = (node:any, _expandedKeys:any) => {
        if (node.children && node.children.length) {
            _expandedKeys[node.key] = false;
        }
        setExpandedKeys(_expandedKeys);
    }

    return (
        <Tree value={items} expandedKeys={expandedKeys} selectionMode="single" selectionKeys={selectedItemKey} onSelectionChange={onSelectionChange} onToggle={e => {
            setExpandedKeys(e.value)
        }} nodeTemplate={itemTemplate} /* onSelect={onSelect} */ onNodeClick={onSelect}
        /* onExpand={onExpand} onCollapse={onCollapse}  onUnselect={onUnselect} */ />
    )
}
