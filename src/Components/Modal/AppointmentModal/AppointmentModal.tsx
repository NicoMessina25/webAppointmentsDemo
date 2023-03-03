import { Icon } from '@iconify/react';
import React from 'react'
import { useIntl } from 'react-intl';
import InfoCard from '../InfoCard/InfoCard';
import Modal from '../Modal'
import './AppointmentModal.scss'


export default function AppointmentModal({visible, setVisible,patient, appointment, descriptionText}:any) {
  
    const intl = useIntl();
    /* 
    
    Component Structure

    Icon
    label (title)
    description ( main text )
    footer ( optional text )

    componentbackground ( component background )

    footerbackground ( footer background )

    */

    /* 
    Modal Footer Structure

    description ( text )
    background ( style )
    
    */


    /* const boxList = (detailsList:any) => {

        let index = 0;
        const boxes = detailsList.map((component:any) => (
            
            <div key={index++} className={`flexible--column appointment-modal-container ${component.background}`}>
                <div className='flexible--row'>
                    <div className='flexible--column icon-class'>
                        {component.icon}
                    </div>
                    <div className='flexible--column content'>
                        <div className='title'>{component.label}</div>
                        {component.footer.props.children 
                        ? <div className={`infoText textBold description`}>{component.description}</div> : <div className={`infoText textBold description-without-footer`}>{component.description}</div>} 

                        {component.footer.props.children && <div className='footer'>{component.footer}</div>}
                    </div>
                </div>
            </div>
        )
        )
      
        return <div className='flexible--column'>
            {boxes}
            {detailsList && !components && <div className={`${modalfooter.background}`}>{modalfooter.description}</div>}
        </div>;
      };

      const componentsList = (components:any) => {

        let index = 0;
        
        const boxes = components.map((component:any) => (
            
            <div key={index++} className={`flexible--column appointment-modal-container`}>
                <div className='flexible--row'>
                    <div className='flexible--column icon-clock-class'>
                        {component.icon}
                    </div>
                    <div className='flexible--column clock-container-content'>
                        <div className='lightPrimaryText textBold description'>{component.description}</div>
                    </div>
                </div>
                
                {/* <div className='flexible--rowWrap buttons-container'>
                {
                component.component.map((item:any, index:any) => (
                    <div className='hour-buttons' key={index}>
                        {item}
                    </div>
                ))
               
                }
                 </div>  }

                <div className='flexible--rowWrap buttons-container'>
                    {component.component}
                </div>
               
            </div>
        )
        )
      
        return <div className='flexible--column'>
            {boxes}
            <div className={`${modalfooter.background}`}>{modalfooter.description}</div>
        </div>;
      };

      
      const footerMessage = (components:any) => {

        return <div className='flexible--column'>
            <div className={`${modalfooter.background}`}>{modalfooter.description}</div>
        </div>;
      }; */
  

  
return (
    <Modal visible={visible} setVisible={setVisible}  header={intl.formatMessage({id:"YouAreAboutToScheduleThisAppointment"})} footerButtonRightText={intl.formatMessage({id:"Confirm"})} footerButtonLeftText={intl.formatMessage({id:"Cancel"})} onClickLeftBtn={()=>{setVisible(false)}} onClickRightBtn={()=>{console.log("Confirmado")}
    } pathRightBtn={"#"} pathLeftBtn={"#"}>
        <div className='appointmentModalContainer flexible--column'>
            <div className='flexible--row patientInfoContainer'>
                <div className='icon'>
                    <Icon icon="mdi:account" />
                </div>
                <div className='flexible--column patientInfo'>
                    <p className='textDark'>{intl.formatMessage({id:"Patient"})}</p>
                    <h3 className='infoText textBold'>{patient.firstname + " " + patient.lastname}</h3>
                    <div className='text personalInfo flexible--column'>
                        <p>Mail: {patient.email}</p>
                        <p>{intl.formatMessage({id:"Phone"})}: {patient.mobilephone.prefix} {patient.mobilephone.number}</p>
                        <p>{intl.formatMessage({id:"PrepaidHealthInsurance"})}: {patient.medicalCoverage.name}</p>
                    </div>
                </div>
            </div>
            <InfoCard label={intl.formatMessage({id:"Professional"})} text={appointment.professional?.prefixAndFullName} textClassName={"textBold infoText"} />
        </div>
        
        
    </Modal>
    
  )
}
