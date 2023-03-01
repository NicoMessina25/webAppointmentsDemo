import axios from "axios";

export function sendLocationConsent(userId:number){

  

    const onLocationAllowed = ({coords, timestamp}:any) => {
      
      axios.post('/api/notsecure/user/saveDigitalConsent',
      {
        userId: userId,
        latitude: coords.latitude,
        longitude: coords.longitude
      }).then((res)=>{
      
    }).catch((err)=>{console.log(err);
    })
    }
  
    const onLocationNotAllowed = () => {
      
      
      
      axios.post('/api/notsecure/user/saveDigitalConsent',
      {
        userId: userId,
        latitude: null,
        longitude: null
      }).then((res)=>{
        console.log(res.data);
      
    }).catch((err)=>{console.log(err);
    })
    }
  
  
    //console.log(userId +  " ea");
    navigator.geolocation?.getCurrentPosition(onLocationAllowed, onLocationNotAllowed);
    
    
  }

export function saveUser(user:any, onlyUser:boolean) {
    let newUser= {...user}
    newUser.mobilephone = user.mobilephone.prefix + user.mobilephone.number
    //newUser.birthdate = Date.parse(user.birthdate);
    newUser.city = user.city.city;
    newUser.medicalCoverage = user.medicalCoverage?.entityid;
    newUser.plan = user.plan?.healthentityplan;
    newUser.benefitNumber = newUser.affiliateNo;
    
    
  
    return axios.post(`/api/notsecure/user/${onlyUser?"saveOnlyUser":"saveUserAndPatient"}`,
      newUser).then((res)=>{
      let userId = res.data;
      if(user.acceptTerms && userId > 0){
          sendLocationConsent(userId);
      }
      return res;
      
    }).catch((err)=>{
  
      console.log(err);
      return err.response;
    })
  }

  export function getValidationData(language:number, id:number){
    return axios.get('/api/notsecure/user/getValidationData', {
      params:{
        id:id,
        language:language
      }
    }).then(res => res)
  }

  export function sendValidationDataAnswers(validationDTO:any, patientId:any){

  
    return axios.post('/api/notsecure/user/validatePatient', validationDTO, {
      params: {
        id: patientId
      }
    }).then(res => res.data);
  }

  export function existsPatientAndNotUser(patientDocument:any, documentType:any){
    return axios.get('/api/notsecure/user/existsPatientAndNotUser', {
      params: {
        patientDocument: patientDocument,
        documentType: documentType
      }
    }).then(res => res.data);
  }

  export function getMailAndMobilephone(document:any,documenttype:any){
    
    return axios.get('/api/notsecure/user/getMailAndMobilephone', {
        params: {
          document: document,
          documenttype:documenttype
        }
      })
      .then(res => 
        res.data
      )
}

export function postNewPassword(id:number,password : string,repeatPassword : string,token:string,code:string){
    return axios.post('/api/notsecure/user/resetpassword', {
      id: id,
      password: password,
      repeatPassword: repeatPassword,
      token:token,
      verificationCode:code
    },{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => 
      response
    )
    .catch(error => 
        error
    );
  }

  export function validateRecoveryCode(id:number,code:string){
  return axios.post(
    '/api/notsecure/user/validateRecoveryCode',{
      id:id,
      code:code
    },{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => 
      response.data
    )
    .catch(error => 
        error
    )
}