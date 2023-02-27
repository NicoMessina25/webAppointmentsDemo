import { Icon } from '@iconify/react';
import React, {useState} from 'react'
import { Link } from 'react-router-dom';

export default function MenuItem({element, onClick}:any) {


    return (
        <div className={"itemCaption flexible--row"} onClick={onClick} > <div className="flexible--row menuIcon"><Icon icon={element.icon} /></div> <span>{element.caption.toUpperCase()}</span>  </div> 
    )
}
