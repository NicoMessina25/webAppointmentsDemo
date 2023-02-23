import React from 'react'
import { useIntl } from 'react-intl';
import "./WelcomePanel.scss"

export default function WelcomePanel({user}:any) {

    const {firstname, lastname, email, affiliateNo, mobilephone, medicalCoverage} = user;
    const intl = useIntl();

  return (
    <div className='flexible--column welcomeContainer'>
        <h1 className='infoText'>¡{intl.formatMessage({id:"Hello"})}! {firstname} {lastname}</h1>
        <p className='textBold welcomeMedicalCov'>{medicalCoverage?.name} - N° de afiliado:{affiliateNo}</p>
        <div className='flexible--row'>
            <p>Email: {email} | Cel: {mobilephone.prefix + mobilephone.number}</p>
        </div>
    </div>
  )
}
