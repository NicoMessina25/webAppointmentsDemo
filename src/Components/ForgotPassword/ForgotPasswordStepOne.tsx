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

export default function ForgotPasswordStepOne(){
    const [document,setDocument]=useState("");
    const [documentType,setDocumentType]=useState("");
    const intl = useIntl();
    const [logo, setLogo] = useState("");
    const options=[ 
        {label:"DNI"},
        {label:intl.formatMessage({ id:'Foreign' })}
    ];

    let [mail,setMail]=useState("");
    let [mobilephone,setMobilephone]=useState("");

    const sendOptions=[
        {label:mail,captions:"Mail"},
        {label:mobilephone,captions:"SMS"}
    ];
    const [confirm,setConfirm]=useState(false);
    const [descriptionClass,setDescriptionClass]=useState("infoText");
    const [dniClass,setDniClass]=useState("textHeading dniRegistered");
    const [sendOptionSelected,setSendOptionSelected]=useState("");
    const request:any=null;
    
    const [visibilityCompleteFields,setVisibilityCompleteFields]=useState(false);
    const [visibilityUserNotExist,setVisibilityUserNotExist]=useState(false);
    const [visibilityCancelModal,setVisibilityCancelModal]=useState(false);
    const [visibilityCodeModal,setVisibilityCodeModal]=useState(false);

    function toggleModalFields(){
        setVisibilityCompleteFields(!visibilityCompleteFields);
    }

    function toggleModalUserNotExists(){
        setVisibilityUserNotExist(!visibilityUserNotExist);
    }

    useEffect(()=>{
        getLogo().then(res=>{
            setLogo(res);
            
        })
    },[])

    function handleConfirm(){
        
        if(documentType!="" && document!=""){
            //SETEAR CAMPO MAIL Y DNI, ej:
            getMailAndCellphone(document).then(res => {
                if ("response" in res && res.response.status === 404){
                    toggleModalUserNotExists();
                }else{
                    setConfirm(true);
                    setDescriptionClass("textTertiary");
                    setDniClass("textTertiary");
                    setMail(res.email);
                    setMobilephone(res.mobilephone);
                }
            });
        }else{
            toggleModalFields();
        }
    }

    function handleSend(e:any){
        
        if(sendOptionSelected!=mail && sendOptionSelected!=mobilephone) // No eligio contacto
            console.log("No elegiste contacto")
        if(sendOptionSelected==mail){
            //abrir modal con esta opcion
        }
         else{
            //abrir modal con esta opcion celular
            setVisibilityCodeModal(!visibilityCodeModal)
        }
            
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
                <h1>{intl.formatMessage({ id: 'ForgotPassword' })}</h1>
            </div>

            <div className='bodyForm flexible--column '>
                <div className='descriptionText littleMargin'>
                    <p className={descriptionClass}>{intl.formatMessage({ id: 'ForgotPasswordDescriptionStepOne' })}</p>
                    <p className={dniClass}>{intl.formatMessage({ id: 'DniRegistered' })+":"}</p>
                </div>

                <RadioButtonGroup className="radioButtonGroup littleMargin" orientation="row" options={options} value={documentType} setValue={setDocumentType} labelId='Type'/>

                
                <InputTextCustom labelId="Number" value={document}  onChange={(e:any) => setDocument(e.target.value)} className="input" placeholder=""/>
                 
                
                {
                    confirm && <div >
                        <p className='littleMargin'>
                            <span className='textDark'>{intl.formatMessage({ id:'WeWillSendYouaNumericalCode' })}</span>
                            <span className='infoText'>{intl.formatMessage({ id:'NumericalCodeMsg' })}</span>
                        </p>

                        <RadioButtonGroup className="radioButtonGroup" orientation="column" options={sendOptions} value={sendOptionSelected} setValue={setSendOptionSelected}/>
                    </div>
                }

                <div className="flexible--row buttonsContainer">
                    <Button onClick={handleCancel} label={intl.formatMessage({ id:'Cancel' })} className="buttonMain3 cancelButton"></Button>
                    {
                         !confirm && <Button onClick={handleConfirm} icon="pi pi-angle-right" iconPos="right" label={intl.formatMessage({ id:'Confirm' })} className="buttonMain saveButton"></Button> 
                    }
                    {
                        confirm && <Button icon="pi pi-angle-right" iconPos="right" onClick={handleSend} label={intl.formatMessage({ id:'Send' })} className="buttonMain saveButton"></Button>
                    }
                </div>
                <Modal visible={visibilityCompleteFields} setVisible={setVisibilityCompleteFields} header={intl.formatMessage({ id: 'IncompleteData' })} footerButtonRightText={intl.formatMessage({ id: 'Back' })}  onClickRightBtn={()=>setVisibilityCompleteFields(false)} pathRightBtn={"#"}>
                {intl.formatMessage({ id: 'CompleteTheTypeOfIDAndTheNumber' })}
                </Modal>
                <Modal visible={visibilityUserNotExist} setVisible={setVisibilityUserNotExist} header={intl.formatMessage({ id: 'UserDoesNotExist' })} footerButtonRightText={intl.formatMessage({ id: 'Back' })}  onClickRightBtn={()=>setVisibilityUserNotExist(false)} pathRightBtn={"#"}>
                {intl.formatMessage({ id: 'UserNotExistByDocument' })}
                </Modal>
                <Modal visible={visibilityCancelModal} setVisible={setVisibilityCancelModal} header={intl.formatMessage({ id: 'CancelYourRecovery' })} footerButtonLeftText={intl.formatMessage({ id: 'YesCancel'})} footerButtonRightText={intl.formatMessage({ id: 'ContinueWithRecovery' })}  onClickRightBtn={()=>setVisibilityCancelModal(false)} pathLeftBtn={"/"}>
                {intl.formatMessage({ id: 'CancelYourRecoveryMessage' })}
                </Modal>

                <Modal visible={visibilityCodeModal} setVisible={setVisibilityCodeModal} header={intl.formatMessage({ id: 'WeSendYouACode' })} footerButtonLeftText={intl.formatMessage({ id: 'TryAnotherWay'})} footerButtonRightText={intl.formatMessage({ id: 'Validate' })}  onClickRightBtn={()=>setVisibilityCodeModal(false)} pathLeftBtn={"#"}>
                {
                    <FormattedMessage
                    id="MobileVerificationMesssage"
                    defaultMessage=""
                    values={{
                        mobilephone: mobilephone,
                    }}
                  />
                }
                
                </Modal>

            </div>

        </div>
        
    )
}