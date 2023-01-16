import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import "./ForgotPassword.scss"
import { getLogo } from "../../services/imageService";
import InputTextCustom from '../Inputs/InputText/InputTextCustom';
import { getMailAndCellphone } from '../../services/loginService';
import Modal from '../Modal/Modal';
import NewPasswordForm from './NewPasswordForm';
import ForgotPasswordForm from './ForgotPasswordForm';

export default function ForgotPasswordStepOne(){
    

    const [logo, setLogo] = useState("");
    

    
    let [headerTitleBoolean,setHeaderTitleBoolean]=useState(true);
    const intl = useIntl();
    const [visibilityCancelModal,setVisibilityCancelModal]=useState(false);

    useEffect(()=>{
        getLogo().then(res=>{
            setLogo(res);
            
        })
    },[])

    const [toggleFormBoolean,setToggleFormBoolean]=useState(false);

    function toggleForm(){
        setToggleFormBoolean(!toggleFormBoolean);
    }

    function handleCancel(){
        setVisibilityCancelModal(!visibilityCancelModal);
    }

    return (
        <div className='container flexible--column' >
            <div >
                <img  src={`http://medere1.medere.localhost:8080/imgs/${logo}`} alt="" className='img' />
            </div>
            <div className='header'>
                <h1>{ intl.formatMessage({ id: headerTitleBoolean ? 'ForgotPassword' : 'NewPassword' })}</h1>
            </div>
            {  !toggleFormBoolean ? <ForgotPasswordForm toggleForm={toggleForm} handleCancel={handleCancel}/> : <NewPasswordForm handleCancel={handleCancel}/>}
            
            <Modal visible={visibilityCancelModal} setVisible={setVisibilityCancelModal} header={intl.formatMessage({ id: 'CancelYourRecovery' })} footerButtonLeftText={intl.formatMessage({ id: 'YesCancel'})} footerButtonRightText={intl.formatMessage({ id: 'ContinueWithRecovery' })}  onClickRightBtn={()=>setVisibilityCancelModal      (false)} pathLeftBtn={"/"}>
                {intl.formatMessage({ id: 'CancelYourRecoveryMessage' })}
            </Modal> 
        </div>
        
    )
}