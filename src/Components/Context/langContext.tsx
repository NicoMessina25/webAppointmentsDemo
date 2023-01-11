import React, { useContext, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import EnglishMessages from '../../lang/en.json';
import SpanishMessages from '../../lang/es.json';
import { getLanguage } from '../../services/siteService';

const langContext = React.createContext({});

const LangProvider = ({children}:any) => {
    
    let [languageId,setLanguageId]=useState(0);
    const[messages,setMessages]:any = useState(SpanishMessages);
    const[locale,setLocale] = useState('es');


    useEffect(()=>{
        getLanguage().then(res=>{
            setLanguageId(res);
            switch(res){
                case 1: setMessages(SpanishMessages); setLocale('es');break;
                case 2: setMessages(EnglishMessages);setLocale('en');break;
                default : setMessages(EnglishMessages);setLocale('en');
            }
        })
    },[])
    
    return (
        <langContext.Provider value={{messages,locale}}>
             <IntlProvider locale={locale} messages={messages}>
                {children}
            </IntlProvider>
        </langContext.Provider>
    )
}

export {LangProvider,langContext};