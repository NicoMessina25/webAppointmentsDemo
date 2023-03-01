import { addLocale, locale } from 'primereact/api';
import React, {useEffect, useState} from 'react'
import { getLanguage } from '../../services/nsGeneralService';
import EnglishMessages from '../../lang/en.json';
import SpanishMessages from '../../lang/es.json';
import SpanishMessagesPrime from '../../lang/esPrimeReact.json';
import { IntlProvider } from 'react-intl';

const langContext = React.createContext({});

export default function LangProvider({children}:any) {
    

    const [languageId,setLanguageId]=useState(0);
    const[messages,setMessages]:any = useState(SpanishMessages);
    const[localeintl,setLocale] = useState('es');

    addLocale('es',SpanishMessagesPrime);
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
    },[]);



    return (
        <langContext.Provider value={{messages, localeintl, languageId}}>
            <IntlProvider locale={localeintl} messages={messages}>
                {children}
            </IntlProvider>
            
        </langContext.Provider>
    )
}

export {LangProvider, langContext};
