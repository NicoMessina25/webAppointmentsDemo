import { Icon } from '@iconify/react';
import React from 'react'
import { useIntl } from 'react-intl';
import Modal from '../Modal';
import './SuccessModal.scss'

export default function SuccesModal({visible,setVisible,header,onHide}:any) {


    const intl=useIntl();
    let footerButtonRightText=intl.formatMessage({id:"Back"})
    
    
    function onClickRightBtn(){
        setVisible(false)
    }


  return (
        <Modal visible={visible} setVisible={setVisible} header={header} onHideCustom={onHide} footerButtonRightText={footerButtonRightText} onClickRightBtn={onClickRightBtn} >
            <div className='flexible--row icon-container'>
                {
                    <Icon className="check-icon" icon="ic:round-check" ></Icon>
                }
            </div>
        </Modal>
  )
}
