import React, { useContext, useEffect, useState } from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import EnglishMessages from '../../lang/en.json';
import SpanishMessages from '../../lang/es.json';
import { getCaptchaKey, getLanguage } from '../../services/siteService';
import { locale, addLocale } from 'primereact/api';
import SpanishMessagesPrime from '../../lang/esPrimeReact.json';
import { any } from 'prop-types';
import { getPatientInfo } from '../../services/UserService';

const appContext = React.createContext({});

const AppProvider = ({children}:any) => {
    
    let [languageId,setLanguageId]=useState(0);
    const[messages,setMessages]:any = useState(SpanishMessages);
    const[localeintl,setLocale] = useState('es');

    addLocale('es',SpanishMessagesPrime );
    locale('es');

    const [user, setUser] : any= useState({
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
    });
    
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
                res.mobilephone={
                    prefix: "+54",
                    area: "",
                    number: "",
                };
                res.birthDate = new Date(res.birthDate);
                setUser(res);
                
            })
            
        }


    },[])

       //Captcha

       let [captchaKey,setCaptchaKey]=useState("");
    
       useEffect(()=>{
           getCaptchaKey().then(response=>{
               setCaptchaKey(response);
           })
       },[])
   
       //Captcha

       function setModificateUser(patient:any){

        console.log(patient)
        const { firstname, address, lastname, email, document, documentType, gender, healthpatientcoverage, birthdate, city } = patient

        const { hasMedicalCoverage, healthentity, healthentityplan, voluntary } = healthpatientcoverage;

        if (patient) {
            let _user = {
                ...user,
                firstname: firstname,
                lastname: lastname,
                address: address,
                birthdate: new Date(birthdate),
                email: email,
                document: document,
                documentType: documentType.documentType,
                gender: gender,
                hasMedicalCoverage: hasMedicalCoverage,
                medicalCoverage: healthentity,
                plan: healthentityplan,
                isMedCoverageThroughJob: voluntary,
                city: city
            }
            setUser(_user);
            
            console.log(_user)
        }
       }

       function restoreUser(){
            let defaultUser={ username: "",
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

            setUser(defaultUser)
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
    
    

    return (
        <appContext.Provider value={{messages,localeintl,languageId,captchaKey,user,setUser,restoreUser,setModificateUser}}>
             <IntlProvider locale={localeintl} messages={messages}>
                {children}
            </IntlProvider>
        </appContext.Provider>
    )
}

export {AppProvider,appContext};