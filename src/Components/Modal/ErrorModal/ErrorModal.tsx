import React from 'react'
import { useIntl } from 'react-intl';
import Modal from '../Modal';
export default function ErrorModal({visible,setVisible}:any) {


    const intl=useIntl();
    let header=intl.formatMessage({id:"Error"})
    let footerButtonRightText=intl.formatMessage({id:"Back"})
    let FooterMessage=intl.formatMessage({id:"AnErrorHasOccurred"})
    
    function onClickRightBtn(){
        setVisible(false)
    }

    function onHideCustom(){

    }

  return (
        <Modal visible={visible} setVisible={setVisible} header={header} footerButtonRightText={footerButtonRightText} onClickRightBtn={onClickRightBtn}  footermessage={FooterMessage}> 
        </Modal>
  )
}
