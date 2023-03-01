import React, { useContext, useEffect, useState } from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import EnglishMessages from '../../lang/en.json';
import SpanishMessages from '../../lang/es.json';
import { getCaptchaKey} from '../../services/nsGeneralService';
import { locale, addLocale } from 'primereact/api';
import SpanishMessagesPrime from '../../lang/esPrimeReact.json';
import { any } from 'prop-types';
import { getPatientInfo } from '../../services/sUserService';
import { Button } from 'primereact/button';
import { Icon } from '@iconify/react';
import { PhoneNumberUtil } from 'google-libphonenumber';




const appContext = React.createContext({});

const AppProvider = ({children}:any) => {
    
    const intl = useIntl();
    const [isLoading, setIsLoading] = useState(true)
    
    const [inputErrors, setInputErrors] = useState({
        firstname: { caption: "", isValid: true },
        lastname: { caption: "", isValid: true },
        birthdate: { caption: "", isValid: true },
        document: { caption: "", isValid: true },
        documentType: { caption: "", isValid: true },
        gender: { caption: "", isValid: true },
        mobilephone: { caption: "", isValid: true },
        address: { caption: "", isValid: true },
        hasMedicalCoverage: {caption: "", isValid: true},
        isMedCoverageThroughJob: {caption: "", isValid:true},
        medicalCoverage: {caption: "", isValid: true},
        plan: {caption: "", isValid: true},
        affiliateNo: {caption: "", isValid: true},
        username: {caption: "", isValid: true},
        password: {caption: "", isValid: true},
        repeatPassword: {caption: "", isValid: true},
        email:{isValid:true, caption: ""}
    }) 

    addLocale('es',SpanishMessagesPrime );
    locale('es');

    const [user, setUser] : any= useState(getDefaultPatient());
    
    
    function validMobileForInputPhone(mobilePhone:any){
        try{
            const phoneUtil = PhoneNumberUtil.getInstance();
            const parsedNumber = phoneUtil.parse(mobilePhone);
            /* console.log(phoneUtil.getLengthOfGeographicalAreaCode(parsedNumber)); 

            const ex = phoneUtil.getExampleNumber("UY");
            
            console.log(ex, phoneUtil.getLengthOfGeographicalAreaCode(ex), phoneUtil.format(ex, PhoneNumberFormat.INTERNATIONAL))*/
            let geographicalAreaCodeLength = phoneUtil.getLengthOfGeographicalAreaCode(parsedNumber); 
            const countryCode = "+" + parsedNumber.getCountryCode();
            const phoneNumber = parsedNumber.getNationalNumber();

            //console.log(countryCode, areaCode, phoneNumber);
            
            /* if(areaCode.length>4)
                throw new Error("Area invalida"); */


            //console.log("celu valido")

            return {
                prefix: countryCode,
                number: phoneNumber,
            };
        }catch(e){
            console.log(e);
            //console.log("celu invalido")
            return {
                prefix: "+54",
                number: mobilePhone,
            };
        }
    }

    function getStorage(){
        let remember=localStorage.getItem("remember");
        if(remember && remember==='true'){
            return localStorage;
        }else{
            return sessionStorage;
        }
    }

    useEffect(()=>{
        
        
        
        let settingsString: any = getStorage().getItem("settings");
        let settingsJson;
        
        if (settingsString){
            
            settingsJson = JSON.parse(settingsString)
        
            getPatientInfo(settingsJson.entityId).then(res=>{
                res.mobilephone=validMobileForInputPhone(res.mobilePhone);
                setModificateUser(res);
            })
            
        }


    },[])

       //Captcha

       let [captchaKey,setCaptchaKey]=useState("");
    
       useEffect(()=>{
           getCaptchaKey().then(response=>{
               setCaptchaKey(response);
           })

           console.log()
       },[])
   
       //Captcha

       function setModificateUser(patient:any){

        const { firstname, address, lastname, email, document, documentType, gender, healthpatientcoverage, birthdate, city,_user} = patient

        // const { hasMedicalCoverage, healthentity, healthentityplan, voluntary, healthpatientcoverage } = healthpatientcoverage;

        
        if (patient) {
            let modificatedUser:any;
            modificatedUser = {
                ...user,
                firstname: firstname,
                lastname: lastname,
                address: address,
                birthdate: birthdate? new Date(birthdate): null,
                email: email,
                document: document,
                documentType: documentType.documentType,
                gender: gender,
                city: city,
                _user:_user,
                username:patient.username,
                clinichistoryid:patient.clinichistoryid,
                medereentity:patient.medereentity,
                mobilephone:patient.mobilephone,
                hasMedicalCoverage: false   
            }
            if(healthpatientcoverage){
                modificatedUser={
                    ...modificatedUser,
                    hasMedicalCoverage: healthpatientcoverage.hasMedicalCoverage,
                    medicalCoverage: healthpatientcoverage.healthentity,
                    plan: healthpatientcoverage.healthentityplan,
                    isMedCoverageThroughJob: healthpatientcoverage.voluntary,
                    healthpatientcoverage:healthpatientcoverage.healthpatientcoverage,
                    noCredential:healthpatientcoverage.noCredential,
                    affiliateNo:healthpatientcoverage.affiliateNo,
                    memberNumber:patient.healthpatientcoverage.affiliateNo
                }
            }
            


            setUser(modificatedUser);
            setIsLoading(false);
            
        }
       }

       function restorePatientDefault(){

            setUser(getDefaultPatient())
       }

       function getDefaultPatient(){
        return {
            username: "",
            password: "",
            documentType: 0,
            document: "",
            firstname: "",
            lastname: "",
            email: "",
            gender: "",
            birthdate: null,
            mobilephone: {
                prefix: "+54",
                number: "",
            },
            address: "",
            city: { location: 'Mar del Plata, Buenos Aires, Argentina', city: 1 },
            affiliateNo: "",
            hasMedicalCoverage: null,
            isMedCoverageThroughJob: null,
            medicalCoverage: null,
            plan: null,
            acceptTerms: false,
            repeatPassword: ""
        }
       }

       function returnValidPatientDTO(patient:any){
        console.log(patient)
            let validPatientDTO=Object.assign({} , patient)
            validPatientDTO.documentType={
                documentType: patient.documentType,
                externalCode:"",
                longName:"",
                shortName:""
            }
            if(patient.medicalCoverage===null)
                validPatientDTO.healthpatientcoverage=null;
            else{
                validPatientDTO.healthpatientcoverage={
                    affiliateNo:patient.affiliateNo,
                    hasMedicalCoverage:patient.hasMedicalCoverage,
                    healthPatientCoverage:1,//patient.healthpatientcoverage,
                    healthentity:{
                        entityid:patient.medicalCoverage.entityid,
                        name:patient.medicalCoverage.name,
                    },
                    healthentityplan:{
                        healthentity:patient.plan.healthentity,
                        healthentityplan:patient.plan.healthentityplan,
                        name:patient.plan.name
                    },
                    noCredential:patient.noCredential,
                    voluntary:patient.isMedCoverageThroughJob
                }
            }
                
            validPatientDTO.phoneNumber=null;
            validPatientDTO.mobilePhone=patient.mobilephone.prefix+patient.mobilephone.number;
            validPatientDTO.medereentity=patient.medereentity;
            validPatientDTO.clinichistoryid="";
            validPatientDTO.birthdate=patient.birthdate;

            delete validPatientDTO.affiliateNo;
            delete validPatientDTO.isMedCoverageThroughJob
            delete validPatientDTO.noCredential;
            delete validPatientDTO.hasMedicalCoverage;
            delete validPatientDTO.mobilephone;
            delete validPatientDTO.repeatPassword;
            delete validPatientDTO.acceptTerms;
            delete validPatientDTO.plan;
            delete validPatientDTO.medicalCoverage;
        
            return validPatientDTO
       }
       
       
  /*   //application configuration obtained via log

    let [settings,setSettings]=useState({
        userId:-1,
        firstName:"",
        lastName:"",
        siteId:-1,
        languageId:1,
        langCode:1,
        languageName:"spanish",
        entityId:-1,
        regionalSettings:{
            decimalSeparator:'',
            groupingSeparator:'',
            currencySymbolString:"",
            shortDateFormatString:"",
            dateTimeFormatString:"",
            timeFormatString:"",
        },
        menu:[]
    })

    function setAppSettings(settingsObject:any){
        setSettings(settingsObject);
    }
     */


    function renderState(state:any, btnClassName:any){
        switch (state){
          case "ready": return <Button icon="pi pi-download" className={btnClassName} />
          case "inCourse": return <p className='warningText statusText' >en curso <Icon icon="mdi:clock-time-five-outline" /> </p>
          case "observed": return <p className='errorText observedStatusText'>observado <Icon icon="mdi:warning-circle-outline" /></p>
        }
      }

    function onChangeRemoveError(field: any) {
        let _inputErrors: any = { ...inputErrors }
        _inputErrors[field].isValid = true
        _inputErrors[field].caption = ""
        setInputErrors(_inputErrors)
    }

    function resetInputErrors(){

        let _inputErrors:any = {...inputErrors};

        for(const ie in inputErrors){
            _inputErrors[ie].isValid = true;
            _inputErrors[ie].caption = "";
          }
        
          setInputErrors(_inputErrors)
    }

    function validateData(fields: Array<string>, u:any) {
        let valid = true;
        let _inputErrors: any = { ...inputErrors }

        for (const ie of fields) {

            valid = validateField(ie, _inputErrors, u) && valid;
        }

        setInputErrors(_inputErrors);
        
        return valid
    }

    function validateField(field: string, _inputErrors:any, u:any) {
        let valid = true;
        
        
        switch (field){
            case "password":
            case "repeatPassword":{
                if (u.password.length < 8){
                    _inputErrors.password = {isValid: false, caption: intl.formatMessage({id:"AtLeast8Characters"})}
                    valid = false;
                    
                }
        
                if(u.repeatPassword.length < 8){
                    _inputErrors.repeatPassword = {isValid: false, caption: ""}
                    valid = false;
                }

                if(u.password.localeCompare(u.repeatPassword)){
                    _inputErrors.repeatPassword = {isValid: false, caption: intl.formatMessage({id:"PasswordsDoNotMatch"})}
                    _inputErrors.password.caption = "";
                    _inputErrors.password.isValid = valid = false;
                }
                
            } break;
            case "email":{
                if(!u.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                    _inputErrors.email = {isValid: false, caption: intl.formatMessage({id:"EnterAValidEMail"})};
                    valid = false

                }
                break;
            }
            case "mobilephone": {
                if (u.mobilephone.number === "") {
                    _inputErrors.mobilephone.caption = intl.formatMessage({ id: "ThisFieldIsRequired" });
                    _inputErrors.mobilephone.isValid = valid = false;
                }
                break;
            }
            default: {
                if (!u[field] && u[field] !== false) {
                    _inputErrors[field].caption = intl.formatMessage({ id: "ThisFieldIsRequired" });
                    _inputErrors[field].isValid = valid = false;
                }

            }
        }

        

        

        return valid;

    }


    return (
        <appContext.Provider value={{captchaKey,user,setUser,renderState,restorePatientDefault,setModificateUser,getDefaultPatient,returnValidPatientDTO,validMobileForInputPhone, inputErrors, setInputErrors, resetInputErrors, onChangeRemoveError, validateData, getStorage, isLoading}}>           
                {children}
        </appContext.Provider>
    )
}

export {AppProvider,appContext};