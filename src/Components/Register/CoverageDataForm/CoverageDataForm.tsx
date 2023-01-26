import { render } from "@testing-library/react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { getAllMedicalCoverages, getPlans } from "../../../services/medicalCoverageService";
import Combobox from "../../Combobox/Combobox";
import InputTextCustom from "../../Inputs/InputText/InputTextCustom";
import Modal from "../../Modal/Modal";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";
import Terms from "../../TermsAndConditions/TermsAndConditions";
import "./CoverageDataForm.scss"

export default function CoverageDataForm({user, setUser, setStep, setDisplayRegisterCancel}:any){
    const intl = useIntl();
    const [medicalCoverages, setMedicalCoverages] = useState([]);
    const [plans, setPlans] = useState([]);
    const [inputErrors, setInputErrors] = useState({
        hasMedicalCoverage: {caption: "", isValid: true},
        isMedCoverageThroughJob: {caption: "", isValid:true},
        medicalCoverage: {caption: "", isValid: true},
        plan: {caption: "", isValid: true},
        memberNumber: {caption: "", isValid: true},
    })

    const navigate = useNavigate();

    const [visibilityTermsAndConditions,setVisibilityTermsAndConditions]=useState(false);

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
    });
   }, [user.medicalCoverage])
   

    const yesNo = [
        {label: yes, value: true},
        {label: no, value: false}
    ]

    function onChangeRemoveError(field:any){
        let _inputErrors:any = {...inputErrors}
        _inputErrors[field].isValid = true
        _inputErrors[field].caption = ""
        setInputErrors(_inputErrors)
    }

    
    function validateData(){
        let valid = true
        let _inputErrors:any = {...inputErrors};

        if(user.hasMedicalCoverage){
            for(const ie in inputErrors){
                
                if(!user[ie] && user[ie] !== false){
                    console.log("xd");
                    
                    _inputErrors[ie].caption = intl.formatMessage({id: "ThisFieldIsRequired"});
                    _inputErrors[ie].isValid = valid = false;
                }
            }
        } else if (user.hasMedicalCoverage === null){
            _inputErrors["hasMedicalCoverage"].caption = intl.formatMessage({id: "ThisFieldIsRequired"});
            _inputErrors["hasMedicalCoverage"].isValid = valid = false;
        }

        setInputErrors(_inputErrors);

        return valid
    }
    

    return (
        <div className="flexible--column formCoverage">
            <RadioButtonGroup id={1} options={yesNo} value={user.hasMedicalCoverage} setValue={(value:any)=>{
                setUser({...user, hasMedicalCoverage: value})
                onChangeRemoveError("hasMedicalCoverage")
            }} labelId={"DoYouHaveMedicalCoverage?"} orientation="row" error={!inputErrors.hasMedicalCoverage.isValid} caption={inputErrors.hasMedicalCoverage.caption} />
        
            {user.hasMedicalCoverage && 
            <div>
                <RadioButtonGroup id={2} options={yesNo} value={user.isMedCoverageThroughJob} setValue={(value:any)=>{
                setUser({...user, isMedCoverageThroughJob: value})
                onChangeRemoveError("isMedCoverageThroughJob")
            }} labelId={"IsThroughYourJob?"} orientation="row" error={!inputErrors.isMedCoverageThroughJob.isValid} caption={inputErrors.isMedCoverageThroughJob.caption} />
            
                <Combobox label={intl.formatMessage({id: "PrepaidHealthInsurance"})} placeholder={user.medicalCoverage?.name || intl.formatMessage({id: "Select"})} className="combobox" items={medicalCoverages} value={user.medicalCoverage} setValue={(p:any)=>{
                    setUser({...user, medicalCoverage: p});
                    onChangeRemoveError("medicalCoverage")
                    
                }} optionLabel="name" error={!inputErrors.medicalCoverage.isValid} caption={inputErrors.medicalCoverage.caption} />

                <Combobox label={intl.formatMessage({id:"Plan"})} className="combobox" placeholder={intl.formatMessage({id: "Select"})} items={plans} value={user.plan} setValue={(p:any)=>{
                    setUser({...user, plan: p})
                    onChangeRemoveError("plan");
                }} optionLabel="name" error={!inputErrors.plan.isValid} caption={inputErrors.plan.caption}/>

                <InputTextCustom labelId="NumberOfMember"  value={user.memberNumber} onChange={(e:any)=>{
                    setUser({...user, memberNumber: e.target.value})
                    onChangeRemoveError("memberNumber");
                }} error={!inputErrors.memberNumber.isValid} caption={inputErrors.memberNumber.caption}/>
            </div>
            }

            <div className="flexible--row acceptTerms">
                <Checkbox onChange={e => setUser({...user, acceptTerms: e.checked})} checked={user.acceptTerms} className="checkbox"/>
                <p className="checkboxLabel">{intl.formatMessage({ id: 'IAcceptTheTermsAndConditionsOfUseOfTheTelemedicinePlatform' })} <Link to="#" className="linkInfo">{intl.formatMessage({id: "SeeDetails"})}</Link></p>
            </div>
            
            
            <div className="flexible--row buttonContainer" >
                <Link to="/register/1" className='linkReactRouter'><Button icon="pi pi-angle-left" iconPos="left" label={intl.formatMessage({id: "Back"})} className="buttonMain3" /></Link>
                <Link to="#" className='linkReactRouter'><Button label={intl.formatMessage({id: "Cancel"})} className="buttonMain3" onClick={()=>{setDisplayRegisterCancel(true)}}/></Link>
                <Button icon="pi pi-angle-right" iconPos="right" label={intl.formatMessage({id: "Follow"})} className="buttonMain" onClick={()=>{
                    if(validateData()){
                        navigate("/register/3");
                    }
                }} />
            </div>

            <Modal visible={visibilityTermsAndConditions} setVisible={setVisibilityTermsAndConditions} header={intl.formatMessage({ id: 'TermsAndConditions' })} footerButtonRightText={intl.formatMessage({ id: 'YesAccept' })}  footerButtonLeftText={intl.formatMessage({ id: 'NoAccept' })}  
            onClickRightBtn={()=>{
                setUser({...user, acceptTerms: true})
                setVisibilityTermsAndConditions(false);
            }} 
            onClickLeftBtn={()=>{
                setUser({...user, acceptTerms: false})
                setVisibilityTermsAndConditions(false);
            }} >
            {<Terms></Terms>}
            </Modal>

        </div>
    );
}