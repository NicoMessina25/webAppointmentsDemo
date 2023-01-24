import { render } from "@testing-library/react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { getAllMedicalCoverages, getPlans } from "../../../services/medicalCoverageService";
import Combobox from "../../Combobox/Combobox";
import InputTextCustom from "../../Inputs/InputText/InputTextCustom";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";
import "./CoverageDataForm.scss"

export default function CoverageDataForm({user, setUser, setStep, setDisplayRegisterCancel}:any){
    const intl = useIntl();
    const [medicalCoverages, setMedicalCoverages] = useState([]);
    const [hasMedicalCoverage, setMedicalCoverage]:any = useState(null);
    const [plans, setPlans] = useState([]);
    const [plan, setPlan] = useState(null);

    let yes = intl.formatMessage({id: "Yes"});
    let no = intl.formatMessage({id: "No"});

   useEffect(()=>{
        getAllMedicalCoverages().then(data =>{
            setMedicalCoverages(data);
            
        })

        
   },[])

   useEffect(() => {
    getPlans(user.medicalCoverage?.entityid).then(data => {;
        setPlans(data)
        
    })
   }, [user.medicalCoverage])
   

    const yesNo = [
        {label: yes, value: true},
        {label: no, value: false}
    ]

    /* useEffect(()=>{
        setStep(1);
    },[]) */

    return (
        <div className="flexible--column formCoverage">
            <RadioButtonGroup id={1} options={yesNo} value={user.hasMedicalCoverage} setValue={(value:any)=>{
                setUser({...user, hasMedicalCoverage: value})
            }} labelId={"DoYouHaveMedicalCoverage?"} orientation="row"/>
        
            {user.hasMedicalCoverage && 
            <div>
                <RadioButtonGroup id={2} options={yesNo} value={user.isMedCoverageThroughJob} setValue={(value:any)=>{
                setUser({...user, isMedCoverageThroughJob: value})
            }} labelId={"IsThroughYourJob?"} orientation="row"/>
            
                <Combobox label={intl.formatMessage({id: "PrepaidHealthInsurance"})} placeholder={user.medicalCoverage?.name || intl.formatMessage({id: "Select"})} className="combobox" items={medicalCoverages} value={user.medicalCoverage} setValue={(p:any)=>{
                    setUser({...user, medicalCoverage: p})
                }} optionLabel="name" />

                <Combobox label={intl.formatMessage({id:"Plan"})} className="combobox" placeholder={intl.formatMessage({id: "Select"})} items={plans} value={user.plan} setValue={(p:any)=>{
                    setUser({...user, plan: p})
                }} optionLabel="name"/>

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