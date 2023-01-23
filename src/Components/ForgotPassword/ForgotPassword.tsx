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
    let [headerTitle,setHeaderTitle]=useState("");
    const intl = useIntl();
    const [visibilityCancelModal,setVisibilityCancelModal]=useState(false);
    
    const [patientId,setPatientId]=useState(-1);

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
        <div className='containerFormForgotPass flexible--column' >
            <div >
                { logo!='' && <img src={process.env.REACT_APP_MEDERE_ADDRESS+`/imgs/${logo}`} alt="" className='img' /> }
            </div>
            <div className='headerFormForgotPass'>
                { !toggleFormBoolean ? <h1>{ intl.formatMessage({ id: 'ForgotPassword' }) }</h1> : <h1>{ intl.formatMessage({ id: 'NewPassword' }) }</h1> }
            </div>

            {  !toggleFormBoolean ? <ForgotPasswordForm toggleForm={toggleForm} patientId={patientId} setPatientId={setPatientId} handleCancel={handleCancel}/> : <NewPasswordForm  patientId={patientId} handleCancel={handleCancel}/>}
            
            <Modal visible={visibilityCancelModal} setVisible={setVisibilityCancelModal} header={intl.formatMessage({ id: 'CancelYourRecovery' })} footerButtonLeftText={intl.formatMessage({ id: 'YesCancel'})} footerButtonRightText={intl.formatMessage({ id: 'ContinueWithRecovery' })}  onClickRightBtn={()=>setVisibilityCancelModal      (false)} pathLeftBtn={"/"}>
                {intl.formatMessage({ id: 'CancelYourRecoveryMessage' })}
            </Modal> 
        </div>
        
    )
}