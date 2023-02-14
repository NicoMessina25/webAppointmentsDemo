import React, { useContext, useEffect, useState } from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import EnglishMessages from '../../lang/en.json';
import SpanishMessages from '../../lang/es.json';
import { getCaptchaKey, getLanguage } from '../../services/siteService';
import { locale, addLocale } from 'primereact/api';
import SpanishMessagesPrime from '../../lang/esPrimeReact.json';
import { any } from 'prop-types';
import { getPatientInfo } from '../../services/UserService';
import { Button } from 'primereact/button';
import { Icon } from '@iconify/react';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';




const appContext = React.createContext({});

const AppProvider = ({children}:any) => {
    
    let [languageId,setLanguageId]=useState(0);
    const[messages,setMessages]:any = useState(SpanishMessages);
    const[localeintl,setLocale] = useState('es');

    addLocale('es',SpanishMessagesPrime );
    locale('es');

    const [user, setUser] : any= useState(getDefaultPatient());
    
    function validMobileForInputDate(res:any){
        try{
            const phoneUtil = PhoneNumberUtil.getInstance();
            const parsedNumber = phoneUtil.parse(res.mobilePhone);
            const parts = phoneUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL).replace("-", "").split(" ")
            const countryCode = parts[0];
            const areaCode = parts[1];
            const phoneNumber = parts[2];
            
            if(areaCode.length>4)
                throw new Error("Area invalida");


            console.log("celu valido")

            return {
                prefix: countryCode,
                area: areaCode,
                number: phoneNumber,
            };
        }catch{
            console.log("celu invalido")
            return {
                prefix: "+54",
                area: "",
                number: res.mobilePhone,
            };
        }
    }

    useEffect(()=>{
        
         getLanguage().then(res=>{
            setLanguageId(res);
            switch(res){
                case 1: setMessages(SpanishMessages); setLocale('es');locale('es');break;
                case 2: setMessages(EnglishMessages);setLocale('en');locale('en');break;
                default : setMessages(SpanishMessages);setLocale('es');locale('es');;
            }
        })
        
        let settingsString: any = localStorage.getItem("settings");
        let settingsJson;
        
        if (settingsString){
            
            settingsJson = JSON.parse(settingsString)
        
            getPatientInfo(settingsJson.entityId).then(res=>{
                res.mobilephone=validMobileForInputDate(res);
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
                birthdate: new Date(birthdate),
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
                area: "",
                number: "",
            },
            address: "",
            city: { location: 'Mar del Plata, Buenos Aires, Argentina', city: 1 },
            memberNumber: "",
            hasMedicalCoverage: null,
            isMedCoverageThroughJob: null,
            medicalCoverage: null,
            plan: null,
            acceptTerms: false,
            repeatPassword: ""
        }
       }

       function returnValidPatientDTO(patient:any){
            let validPatientDTO=Object.assign({} , patient)
            validPatientDTO.documentType={
                documentType: patient.documentType,
                externalCode:"",
                longName:"",
                shortName:""
            }
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
            validPatientDTO.phoneNumber=null;
            validPatientDTO.mobilePhone=patient.mobilephone.prefix+patient.mobilephone.area+patient.mobilephone.number;
            validPatientDTO.medereentity=patient.medereentity;
            validPatientDTO.clinichistoryid="";
            validPatientDTO.birthdate=patient.birthdate;

            delete validPatientDTO.affiliateNo;
            delete validPatientDTO.isMedCoverageThroughJob
            delete validPatientDTO.memberNumber;
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

    return (
        <appContext.Provider value={{messages,localeintl,languageId,captchaKey,user,setUser,renderState,restorePatientDefault,setModificateUser,getDefaultPatient,returnValidPatientDTO,validMobileForInputDate}}>
             <IntlProvider locale={localeintl} messages={messages}>
                {children}
            </IntlProvider>
        </appContext.Provider>
    )
}

export {AppProvider,appContext};