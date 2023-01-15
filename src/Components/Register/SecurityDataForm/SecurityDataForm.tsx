import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";

export default function SecurityDataForm({setStep}:any){
    const intl = useIntl();

    useEffect(()=>{
        setStep(2);
    },[])

    return (
        <div className="flexible--column">
            <Button label={intl.formatMessage({ id: 'SignInWithGoogle' })} className="buttonMain2"/>
               <div className="lineContainer flexible--row">
                    <div className="lineGreenBlue"></div>
                    <p>O</p>
                    <div className="lineGreenBlue"></div>
               </div>
        </div>
    );
}