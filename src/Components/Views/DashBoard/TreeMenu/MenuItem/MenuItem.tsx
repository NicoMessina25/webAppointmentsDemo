import { Icon } from '@iconify/react';
import React, {useState} from 'react'
import { Link } from 'react-router-dom';

export default function MenuItem({element, onClick}:any) {


    return (
        <div className={"itemCaption flexible--row"} onClick={onClick} ><Icon icon={element.icon} /> <span className="">{element.caption.toUpperCase()}</span>  </div> 
    )
}
