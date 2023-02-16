
import { useEffect, useState } from 'react';
import {  useIntl } from 'react-intl';
import "./ForgotPassword.scss"
import { getLogo } from "../../services/imageService";
import Modal from '../Modal/Modal';
import NewPasswordForm from './NewPasswordForm';
import ForgotPasswordForm from './ForgotPasswordForm';

export default function ForgotPasswordStepOne(){
    

    const [logo, setLogo] = useState("");
    let [headerTitle,setHeaderTitle]=useState("");
    const intl = useIntl();
    const [visibilityCancelModal,setVisibilityCancelModal]=useState(false);
    
    const [patientId,setPatientId]=useState(-1);

    let [receivedCode,setReceivedCode]=useState("");
    

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
                { logo!='' && <img src={`/imgs/${logo}`} alt="" className='img' /> }
            </div>
            <div className='headerFormForgotPass'>
                { !toggleFormBoolean ? <h1>{ intl.formatMessage({ id: 'ForgotPassword' }) }</h1> : <h1>{ intl.formatMessage({ id: 'NewPassword' }) }</h1> }
            </div>

            {  !toggleFormBoolean ? <ForgotPasswordForm receivedCode={receivedCode} setReceivedCode={setReceivedCode} toggleForm={toggleForm} patientId={patientId} setPatientId={setPatientId} handleCancel={handleCancel}/> : <NewPasswordForm receivedCode={receivedCode} patientId={patientId} handleCancel={handleCancel}/>}
            
            <Modal visible={visibilityCancelModal} setVisible={setVisibilityCancelModal} header={intl.formatMessage({ id: 'CancelYourRecovery' })} footerButtonLeftText={intl.formatMessage({ id: 'YesCancel'})} footerButtonRightText={intl.formatMessage({ id: 'ContinueWithRecovery' })}  onClickRightBtn={()=>setVisibilityCancelModal      (false)} pathLeftBtn={"/"}>
                {intl.formatMessage({ id: 'CancelYourRecoveryMessage' })}
            </Modal> 
        </div>
        
    )
}