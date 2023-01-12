import React, { useContext, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import EnglishMessages from '../../lang/en.json';
import SpanishMessages from '../../lang/es.json';
import { getLanguage } from '../../services/siteService';
import { locale, addLocale } from 'primereact/api';
import SpanishMessagesPrime from '../../lang/esPrimeReact.json';

const langContext = React.createContext({});

const LangProvider = ({children}:any) => {
    
    let [languageId,setLanguageId]=useState(0);
    const[messages,setMessages]:any = useState(SpanishMessages);
    const[localeintl,setLocale] = useState('es');


    addLocale('es',SpanishMessagesPrime );
    locale('es');



    useEffect(()=>{
        
        /* getLanguage().then(res=>{
            setLanguageId(res);
            switch(res){
                case 1: setMessages(SpanishMessages); setLocale('es');locale('es');break;
                case 2: setMessages(EnglishMessages);setLocale('en');locale('en');break;
                default : setMessages(SpanishMessages);setLocale('es');locale('es');;
            }
        }) */
    },[])
    
    return (
        <langContext.Provider value={{messages,localeintl}}>
             <IntlProvider locale={localeintl} messages={messages}>
                {children}
            </IntlProvider>
        </langContext.Provider>
    )
}

export {LangProvider,langContext};