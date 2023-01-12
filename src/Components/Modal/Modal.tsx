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
                {footerButtonLeftText && <Link to={pathLeftBtn} ><Button className="buttonMain3" onClick={onClickLeftBtn}>{footerButtonLeftText}</Button></Link>} 
                <Link to={pathRightBtn}> <Button  className="buttonMain" onClick={onClickRightBtn}>{footerButtonRightText}</Button></Link>
            </div>
        );
    }

    return(
        <Dialog visible={visible} header={header} onHide={onHide} breakpoints={{'960px': '75vw', '640px': '100vw'}} footer={renderFooter} className="modal">
            <p className="textDark">{children}</p>
        </Dialog>
    );
}