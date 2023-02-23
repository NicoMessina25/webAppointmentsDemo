import { Icon } from '@iconify/react';
import React from 'react'
import Modal from '../Modal'
import './AppointmentModal.scss'


export default function AppointmentModal({visible, setVisible, header, footerButtonRightText, footerButtonLeftText, onClickLeftBtn, onClickRightBtn, pathRightBtn, pathLeftBtn,onHideCustom,detailsList,components,modalfooter}:any) {
  

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


    const boxList = (detailsList:any) => {

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
                 </div>  */}

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
      };
  

  
return (
    <Modal visible={visible} setVisible={setVisible}  header={header} footerButtonRightText={footerButtonRightText} footerButtonLeftText={footerButtonLeftText} onClickLeftBtn={onClickLeftBtn} onClickRightBtn={onClickRightBtn} pathRightBtn={pathRightBtn} pathLeftBtn={pathLeftBtn} onHideCustom={onHideCustom} footermessage={footerMessage}>
        { detailsList && boxList(detailsList) }
        { components && componentsList(components)}
        
    </Modal>
    
  )
}
