import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import InputTextCustom from "../../Inputs/InputText/InputTextCustom";
import Modal from "../../Modal/Modal";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";

export default function SecurityDataForm({setStep, user, setUser, setDisplayRegisterCancel}:any){
    const intl = useIntl();
    const [displayRegisterComplete, setDisplayRegisterComplete] = useState(false);

    useEffect(()=>{
        setStep(2);
    },[])

    return (
        <div className="flexible--column">
            <Button label={intl.formatMessage({ id: 'SignInWithGoogle' })} className="buttonMain2 googleButton"/>
            <div className="lineContainer flexible--row">
                <div className="lineGreenBlue"></div>
                <p>O</p>
                <div className="lineGreenBlue"></div>
            </div>

            <InputTextCustom value={user.username} onChange={(e:any) => setUser({...user, username: e.target.value})} labelId={intl.formatMessage({id:"User"})}/>

            <InputTextCustom value={user.mail} onChange={(e:any) => setUser({...user, mail: e.target.value})} labelId={intl.formatMessage({id:"Mail"})}/>

            <InputTextCustom value={user.password} onChange={(e:any) => setUser({...user, password: e.target.value})} labelId={intl.formatMessage({id:"Password"})} password caption={intl.formatMessage({id:"AtLeast8Characters"})}/>

            <InputTextCustom value={user.password} onChange={(e:any) => setUser({...user, password: e.target.value})} labelId={intl.formatMessage({id:"RepeatPassword"})} password />

            <div className="flexible--row buttonContainer" >
                <Link to="../step2"><Button icon="pi pi-angle-left" iconPos="left" label={intl.formatMessage({id: "Back"})} className="buttonMain3"/></Link>
                <Link to="#"><Button label={intl.formatMessage({id: "Cancel"})} className="buttonMain3" onClick={()=>{setDisplayRegisterCancel(true)}}/></Link>
                <Link to="#"><Button icon="pi pi-check" iconPos="right" label={intl.formatMessage({id: "Finish"})} className="buttonMain" onClick={()=>{setDisplayRegisterComplete(true)}}/></Link>
            </div>

            <Modal visible={displayRegisterComplete} setVisible={setDisplayRegisterComplete} header={`${intl.formatMessage({id:"SuccessfullSignUp"})}`}  footerButtonRightText={intl.formatMessage({ id: 'Join' })}  footerButtonLeftText={intl.formatMessage({ id: 'Cancel' })}  onClickLeftBtn={()=>setDisplayRegisterComplete(false)} pathLeftBtn={"#"} pathRightBtn={"/"}>
                {intl.formatMessage({ id: 'SuccessfullSignUpDescription' })}
            </Modal>

        </div>
    );
}