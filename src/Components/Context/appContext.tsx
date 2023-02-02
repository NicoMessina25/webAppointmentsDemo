import React, { useContext, useEffect, useState } from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import EnglishMessages from '../../lang/en.json';
import SpanishMessages from '../../lang/es.json';
import { getCaptchaKey, getLanguage } from '../../services/siteService';
import { locale, addLocale } from 'primereact/api';
import SpanishMessagesPrime from '../../lang/esPrimeReact.json';
import { any } from 'prop-types';

const appContext = React.createContext({});

const AppProvider = ({children}:any) => {
    
    let [languageId,setLanguageId]=useState(0);
    const[messages,setMessages]:any = useState(SpanishMessages);
    const[localeintl,setLocale] = useState('es');

    addLocale('es',SpanishMessagesPrime );
    locale('es');

    useEffect(()=>{
         getLanguage().then(res=>{
            setLanguageId(res);
            switch(res){
                case 1: setMessages(SpanishMessages); setLocale('es');locale('es');break;
                case 2: setMessages(EnglishMessages);setLocale('en');locale('en');break;
                default : setMessages(SpanishMessages);setLocale('es');locale('es');;
            }
        }) 
    },[])

       //Captcha

       let [captchaKey,setCaptchaKey]=useState("");
    
       useEffect(()=>{
           getCaptchaKey().then(response=>{
               setCaptchaKey(response);
           })
       },[])
   
       //Captcha

    
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
        <appContext.Provider value={{messages,localeintl,languageId,captchaKey}}>
             <IntlProvider locale={localeintl} messages={messages}>
                {children}
            </IntlProvider>
        </appContext.Provider>
    )
}

export {AppProvider,appContext};