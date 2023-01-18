import { render } from "@testing-library/react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import Combobox from "../../Combobox/Combobox";
import InputTextCustom from "../../Inputs/InputText/InputTextCustom";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";
import "./CoverageDataForm.scss"

export default function CoverageDataForm({user, setUser, setStep, setDisplayRegisterCancel}:any){
    const intl = useIntl();
    let yes = intl.formatMessage({id: "Yes"});
    let no = intl.formatMessage({id: "No"});

   

    const yesNo = [
        {label: yes, value: true},
        {label: no, value: false}
    ]

    /* useEffect(()=>{
        setStep(1);
    },[]) */

    return (
        <div className="flexible--column formCoverage">
            <RadioButtonGroup options={yesNo} value={user.medicalCoverage} setValue={(value:any)=>{
                setUser({...user, medicalCoverage: value})
            }} labelId={"DoYouHaveMedicalCoverage?"} orientation="row"/>
        
            {user.medicalCoverage && 
            <div>
                <RadioButtonGroup options={yesNo} value={user.medCoverageThroughJob} setValue={(value:any)=>{
                setUser({...user, medCoverageThroughJob: value})
            }} labelId={"IsThroughYourJob?"} orientation="row"/>
            
                <Combobox label={intl.formatMessage({id: "PrepaidHealthInsurance"})} className="combobox"/>

                <Combobox label={intl.formatMessage({id:"Plan"})} className="combobox"/>

                <InputTextCustom labelId="NumberOfMember"  value={user.memberNumber} onChange={(e:any)=>{
                    setUser({...user, memberNumber: e.target.value})
                }}/>
            </div>
            }

            <div className="flexible--row acceptTerms">
                <Checkbox onChange={e => setUser({...user, acceptTerms: e.checked})} checked={user.acceptTerms} className="checkbox"/>
                <p className="checkboxLabel">{intl.formatMessage({ id: 'IAcceptTheTermsAndConditionsOfUseOfTheTelemedicinePlatform' })}</p>
            </div>
            <Link to="#" className="linkInfo">{intl.formatMessage({id: "SeeDetails"})}</Link>
            
            <div className="flexible--row buttonContainer" >
                <Link to="/register/1" className='linkReactRouter'><Button icon="pi pi-angle-left" iconPos="left" label={intl.formatMessage({id: "Back"})} className="buttonMain3" /></Link>
                <Link to="#" className='linkReactRouter'><Button label={intl.formatMessage({id: "Cancel"})} className="buttonMain3" onClick={()=>{setDisplayRegisterCancel(true)}}/></Link>
                <Link to="/register/3" className='linkReactRouter'><Button icon="pi pi-angle-right" iconPos="right" label={intl.formatMessage({id: "Follow"})} className="buttonMain" /></Link>
            </div>
        </div>
    );
}