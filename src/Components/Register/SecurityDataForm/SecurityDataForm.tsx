import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { saveUser } from "../../../services/loginService";
import InputTextCustom from "../../Inputs/InputText/InputTextCustom";
import Modal from "../../Modal/Modal";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";

export default function SecurityDataForm({setStep, user, setUser, setDisplayRegisterCancel}:any){
    const intl = useIntl();
    const [displayRegisterComplete, setDisplayRegisterComplete] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorInputs, setErrorInputs] = useState({
        userName: {error: false},
        password: false,
        confirmPasswordValid: false,
        email:{error:false, caption: ""}
    })

    useEffect(()=>{
        setStep(2);
    },[])

    function validateData(){
        let validRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return user.email.match(validRegex);
    }

    return (
        <div className="flexible--column">
            <Button label={intl.formatMessage({ id: 'SignInWithGoogle' })} className="buttonMain2 googleButton"/>
            <div className="lineContainer flexible--row">
                <div className="lineGreenBlue"></div>
                <p>O</p>
                <div className="lineGreenBlue"></div>
            </div>

            <InputTextCustom value={user.username} onChange={(e:any) => setUser({...user, username: e.target.value})} labelId="User"/>

            <InputTextCustom value={user.email} error={errorInputs.email.error} caption={errorInputs.email.caption} onChange={(e:any) => { 
                setUser({...user, email: e.target.value});
                setErrorInputs({...errorInputs, email:{error:false, caption: ""}})
            }} labelId="Mail"/>

            <InputTextCustom value={user.password} onChange={(e:any) => setUser({...user, password: e.target.value})} labelId="Password" password caption={intl.formatMessage({id:"AtLeast8Characters"})}/>

            <InputTextCustom value={confirmPassword} onChange={(e:any) => setConfirmPassword(e.target.value)} labelId="RepeatPassword" password feedback={false}/>


            <div className="flexible--row buttonContainer" >
                <Link to="/register/2" className='linkReactRouter'><Button icon="pi pi-angle-left" iconPos="left" label={intl.formatMessage({id: "Back"})} className="buttonMain3"/></Link>
                <Link to="#" className='linkReactRouter'><Button label={intl.formatMessage({id: "Cancel"})} className="buttonMain3" onClick={()=>{setDisplayRegisterCancel(true)}}/></Link>
                <Link to="#" className='linkReactRouter'><Button icon="pi pi-check" iconPos="right" label={intl.formatMessage({id: "Finish"})} className="buttonMain" onClick={()=>{
                    if(validateData()){
                        setDisplayRegisterComplete(true);
                        saveUser(user);
                    } else {
                        console.log("Y no");
                        setErrorInputs({...errorInputs, email:{error:true, caption: intl.formatMessage({id:"EnterAValidEMail"})}})
                    };
                    
                    
                    }}/></Link>
            </div>

            <Modal visible={displayRegisterComplete} setVisible={setDisplayRegisterComplete} header={`${intl.formatMessage({id:"SuccessfullSignUp"})}`}  footerButtonRightText={intl.formatMessage({ id: 'Join' })}  footerButtonLeftText={intl.formatMessage({ id: 'Cancel' })}  onClickLeftBtn={()=>setDisplayRegisterComplete(false)} pathLeftBtn={"#"} pathRightBtn={"/"}>
                {intl.formatMessage({ id: 'SuccessfullSignUpDescription' })}
            </Modal>

        </div>
    );
}