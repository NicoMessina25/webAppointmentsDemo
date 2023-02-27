import { render } from "@testing-library/react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useRef, useState, useContext } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { getMedicalCoverages, getPlans } from "../../../services/medicalCoverageService";
import Combobox from "../../Combobox/Combobox";
import { appContext } from "../../Context/appContext";
import InputTextCustom from "../../Inputs/InputText/InputTextCustom";
import Modal from "../../Modal/Modal";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";
import Terms from "../../TermsAndConditions/TermsAndConditions";
import "./CoverageDataForm.scss"

export default function CoverageDataForm({user, setUser, setDisplayRegisterCancel, onSubmit}:any){
    const intl = useIntl();


    const navigate = useNavigate();

    const {inputErrors, setInputErrors, validateData, onChangeRemoveError}:any = useContext(appContext);

    const [visibilityTermsAndConditions,setVisibilityTermsAndConditions]=useState(false);

    let yes = intl.formatMessage({id: "Yes"});
    let no = intl.formatMessage({id: "No"});

    let inputFields = ["hasMedicalCoverage", "isMedCoverageThroughJob","medicalCoverage", "plan", "affiliateNo"];

   

    const yesNo = [
        {label: yes, value: true},
        {label: no, value: false}
    ]

    

    return (
        <div className="flexible--column formCoverage">
            <RadioButtonGroup id={1} options={yesNo} value={user.hasMedicalCoverage} setValue={(value:any)=>{
                setUser({...user, hasMedicalCoverage: value})
                onChangeRemoveError("hasMedicalCoverage")
            }} label={intl.formatMessage({id: "DoYouHaveMedicalCoverage?"})} orientation="row" error={!inputErrors.hasMedicalCoverage.isValid} caption={inputErrors.hasMedicalCoverage.caption} />
        
            {user.hasMedicalCoverage && 
            <div>
                <RadioButtonGroup id={2} options={yesNo} value={user.isMedCoverageThroughJob} setValue={(value:any)=>{
                setUser({...user, isMedCoverageThroughJob: value})
                onChangeRemoveError("isMedCoverageThroughJob")
            }} label={intl.formatMessage({id: "IsThroughYourJob?"})} orientation="row" error={!inputErrors.isMedCoverageThroughJob.isValid} caption={inputErrors.isMedCoverageThroughJob.caption} />
            
                <Combobox label={intl.formatMessage({id: "PrepaidHealthInsurance"})} placeholder={user.medicalCoverage?.name || intl.formatMessage({id: "Select"})} className="combobox" getItems={getMedicalCoverages} value={user.medicalCoverage} setValue={(p:any)=>{
                    setUser({...user, medicalCoverage: p});
                    onChangeRemoveError("medicalCoverage")
                    
                }} optionLabel="name" error={!inputErrors.medicalCoverage.isValid} caption={inputErrors.medicalCoverage.caption} />

                <Combobox label={intl.formatMessage({id:"Plan"})} className="combobox" placeholder={intl.formatMessage({id: "Select"})} getItems={(inputText:any, offSet:any, pageSize:any)=>{
                    return getPlans(inputText, offSet, pageSize, user.medicalCoverage?.entityid)
                }} value={user.plan} setValue={(p:any)=>{
                    setUser({...user, plan: p})
                    onChangeRemoveError("plan");
                }} optionLabel="name" reLoadItemsValue={user.medicalCoverage} error={!inputErrors.plan.isValid} caption={inputErrors.plan.caption}/>

                <InputTextCustom label={intl.formatMessage({id: "NumberOfMember"})}  value={user.affiliateNo} onChange={(e:any)=>{
                    setUser({...user, affiliateNo: e.target.value})
                    onChangeRemoveError("affiliateNo");
                }} error={!inputErrors.affiliateNo.isValid} caption={inputErrors.affiliateNo.caption}/>
            </div>
            }

            <div className="flexible--row acceptTerms">
                <Checkbox onChange={e => setUser({...user, acceptTerms: e.checked})} checked={user.acceptTerms} className="checkbox"/>
                <p className="checkboxLabel">{intl.formatMessage({ id: 'IAcceptTheTermsAndConditionsOfUseOfTheTelemedicinePlatform' })} <Link to="#" onClick={()=>{
                setVisibilityTermsAndConditions(true);
            }}
             className="linkInfo">{intl.formatMessage({id: "SeeDetails"})}</Link></p>
            </div>
            
            
            <div className="flexible--rowWrap buttonContainer" >
                <Link to="/register/1" className='linkReactRouter'><Button icon="pi pi-angle-left" iconPos="left" label={intl.formatMessage({id: "Back"})} className="buttonMain3" /></Link>
                <Link to="#" className='linkReactRouter'><Button label={intl.formatMessage({id: "Cancel"})} className="buttonMain3" onClick={()=>{setDisplayRegisterCancel(true)}}/></Link>
                <Button icon="pi pi-angle-right" iconPos="right" label={intl.formatMessage({id: "Follow"})} className="buttonMain" onClick={()=>{
                    if(user.hasMedicalCoverage !== null && (!user.hasMedicalCoverage || validateData(inputFields, user))){
                        navigate("/register/3");
                    } else if (user.hasMedicalCoverage === null){
                        let _inputErrors = {...inputErrors};
                        _inputErrors["hasMedicalCoverage"].caption = intl.formatMessage({id: "ThisFieldIsRequired"});
                        _inputErrors["hasMedicalCoverage"].isValid = false;
                        setInputErrors(_inputErrors);
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