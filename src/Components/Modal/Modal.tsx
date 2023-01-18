import React, { Dispatch, SetStateAction, useState } from "react";
import {Dialog} from "primereact/dialog"
import "../../scss/styles.scss"
import "./Modal.scss"
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default function Modal({visible, setVisible, header, footerButtonRightText, footerButtonLeftText, onClickLeftBtn, onClickRightBtn, pathRightBtn, pathLeftBtn, children}:any){

    const onHide = () => {
        setVisible(false);
    }

    const renderFooter = () =>{
        let flexEnd = footerButtonLeftText? "":"flexEnd";

        return (
            <div className={`modalFooter flexible--row ${flexEnd}`}>
                {footerButtonLeftText && <Link to={pathLeftBtn || "#"} className="left"><Button className="buttonMain3" onClick={onClickLeftBtn} label={footerButtonLeftText}/></Link>} 
                <Link to={pathRightBtn || "#"}> <Button  className="buttonMain" onClick={onClickRightBtn} label={footerButtonRightText}/></Link>
            </div>
        );
    }

    return(
        <Dialog visible={visible} header={header} onHide={onHide} footer={renderFooter} className="modal">
            <div className="textDark">{children}</div>
        </Dialog>
    );
}