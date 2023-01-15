import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import Combobox from "../../Combobox/Combobox";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";
import "./CoverageDataForm.scss"

export default function CoverageDataForm({setStep}:any){
    const intl = useIntl();

    const [medicalCoverage, setMedicalCoverage] = useState("");
    const [throughJob, setThroughJob] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const yesNo = [
        {label: intl.formatMessage({id: "Yes"})},
        {label: intl.formatMessage({id: "No"})}
    ]

    useEffect(()=>{
        setStep(1);
    },[])

    return (
        <div className="flexible--column formCoverage">
            <RadioButtonGroup options={yesNo} value={medicalCoverage} setValue={setMedicalCoverage} labelId={"DoYouHaveMedicalCoverage?"} orientation="row"/>
            <RadioButtonGroup options={yesNo} value={throughJob} setValue={setThroughJob} labelId={"IsThroughYourJob?"} orientation="row"/>
            <Combobox label={intl.formatMessage({id: "PrepaidHealthInsurance"})} className="comboboxPrepaids"/>

            <div className="flexible--row acceptTerms">
                <Checkbox onChange={e => setAcceptTerms(e.checked)} checked={acceptTerms} className="checkbox"/>
                <p>{intl.formatMessage({ id: 'IAcceptTheTermsAndConditionsOfUseOfTheTelemedicinePlatform' })}</p>
            </div>
            <Link to="#" className="linkInfo">{intl.formatMessage({id: "SeeDetails"})}</Link>
            
            <div className="flexible--row buttonContainer" >
                <Link to="../step1"><Button icon="pi pi-angle-left" iconPos="left" label={intl.formatMessage({id: "Back"})} className="buttonMain3" /></Link>
                <Link to="/"><Button label={intl.formatMessage({id: "Cancel"})} className="buttonMain3" /></Link>
                <Link to="../step3"><Button icon="pi pi-angle-right" iconPos="right" label={intl.formatMessage({id: "Follow"})} className="buttonMain" /></Link>
            </div>
        </div>
    );
}