import { Button } from "primereact/button";
import { useContext } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { appContext } from "../../Context/appContext";
import InputTextCustom from "../../Inputs/InputText/InputTextCustom";


export default function SecurityDataForm({user, setUser, setDisplayRegisterCancel, toast, onSubmit}:any){
    const intl = useIntl();

    let inputFields = ["username", "password", "repeatPassword", "email"];

    const {inputErrors, onChangeRemoveError, validateData}:any = useContext(appContext);


    return (
        <div className="flexible--column">
            {/* <Button label={intl.formatMessage({ id: 'SignInWithGoogle' })} className="buttonMain2 googleButton"/>
            <div className="lineContainer flexible--row">
                <div className="lineGreenBlue"></div>
                <p>O</p>
                <div className="lineGreenBlue"></div>
            </div> */}

            <InputTextCustom value={user.username} onChange={(e:any) =>{
                setUser({...user, username: e.target.value});
                onChangeRemoveError("username")
            } } label={intl.formatMessage({id:"User" })} error={!inputErrors.username.isValid} caption={inputErrors.username.caption} />

            <InputTextCustom value={user.email} error={!inputErrors.email.isValid} caption={inputErrors.email.caption} onChange={(e:any) => { 
                setUser({...user, email: e.target.value});
                onChangeRemoveError("email");
            }} label={intl.formatMessage({id:"Email" })}/>

            <InputTextCustom value={user.password} onChange={(e:any) => {
                setUser({...user, password: e.target.value})
                onChangeRemoveError("password")
                }} label={intl.formatMessage({id: "Password"})} password error={!inputErrors.password.isValid} caption={inputErrors.password.caption}/>

            <InputTextCustom value={user.repeatPassword} onChange={(e:any) => {
                setUser({...user, repeatPassword: e.target.value});
                onChangeRemoveError("repeatPassword")
            } } label={intl.formatMessage({id: "RepeatPassword"})} password feedback={false} error={!inputErrors.repeatPassword.isValid} caption={inputErrors.repeatPassword.caption} />


            <div className="flexible--row buttonContainer" >
                <Link to="/register/2" className='linkReactRouter'><Button icon="pi pi-angle-left" iconPos="left" label={intl.formatMessage({id: "Back"})} className="buttonMain3"/></Link>
                <Link to="#" className='linkReactRouter'><Button label={intl.formatMessage({id: "Cancel"})} className="buttonMain3" onClick={()=>{setDisplayRegisterCancel(true)}}/></Link>
                <Link to="#" className='linkReactRouter'><Button icon="pi pi-check" iconPos="right" label={intl.formatMessage({id: "Finish"})} className="buttonMain" onClick={()=>{
                    if(validateData(inputFields, user)){

                        onSubmit(user)
                    }
                    
                    
                    }}/></Link>
            </div>

            

        </div>
    );
}