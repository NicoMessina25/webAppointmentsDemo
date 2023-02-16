import axios from "axios";
import { idText } from "typescript";
const url='/rest/webappointments/'


const urlLocal= window.location.href;
const baseUrl = new URL(urlLocal).origin;

export function getMailAndCellphone(document:any,documenttype:any){
    
    return axios.get('/api/notsecure/getMailAndCellphone', {
        params: {
          document: document,
          documenttype:documenttype
        }
      })
      .then(res => 
        res.data
      )
}

export function saveUser(user:any, onlyUser:boolean) {
  let newUser= {...user}
  newUser.mobilephone = user.mobilephone.prefix + user.mobilephone.area + user.mobilephone.number
  //newUser.birthdate = Date.parse(user.birthdate);
  newUser.city = user.city.city;
  newUser.medicalCoverage = user.medicalCoverage?.entityid;
  newUser.plan = user.plan?.healthentityplan;
  newUser.benefitNumber = newUser.affiliateNo;
  
  

  return axios.post(`/api/notsecure/${onlyUser?"saveOnlyUser":"saveUserAndPatient"}`,
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

export function postNewPassword(id:number,password : string,repeatPassword : string,token:string,code:string){
  return axios.post('/api/notsecure/resetpassword', {
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

export function sendCodeByMail(id:number){
  return axios.post(
    '/api/notsecure/sendRecoveryCodeEmail',{
      id:id
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
    )
};

export function validateRecoveryCode(id:number,code:string){
  return axios.post(
    '/api/notsecure/validateRecoveryCode',{
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

export function getDevice(){
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  const iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os = "";

  if (macosPlatforms.indexOf(platform) !== -1) {
      os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "Windows";
  } else if (/Android/.test(userAgent)) {
      os = "Android";
  } else if (!os && /Linux/.test(platform)) {
      os = "Linux";
  }

  return os;
}

export async function authenticateUser(username:string,password:string){

 
    return axios.post(
      '/api/auth/authenticate',{
        username:username,
        password:password,
        siteURL:baseUrl,
        appId:2,
        deviceId:getDevice()
      },{
        headers: {
          'Content-Type': 'application/json',
        }})
      .then(response => 
        response
      )
  
}

export function amilogged(){
  
    return axios.get('/api/secure/amilogged');
    
}


export function sendLocationConsent(userId:number){

  

  const onLocationAllowed = ({coords, timestamp}:any) => {
    
    axios.post('/api/notsecure/saveDigitalConsent',
    {
      userId: userId,
      latitude: coords.latitude,
      longitude: coords.longitude
    }).then((res)=>{
    
  }).catch((err)=>{console.log(err);
  })
  }

  const onLocationNotAllowed = () => {
    
    
    
    axios.post('/api/notsecure/saveDigitalConsent',
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

export function getValidationData(language:number, id:number){
  return axios.get('/api/notsecure/getValidationData', {
    params:{
      id:id,
      language:language
    }
  }).then(res => res)
}

export function sendValidationDataAnswers(validationDTO:any, patientId:any){

  
  return axios.post('/api/notsecure/validatePatient', validationDTO, {
    params: {
      id: patientId
    }
  }).then(res => res.data);
}

export function existsPatientAndNotUser(patientDocument:any, documentType:any){
  return axios.get('/api/notsecure/existsPatientAndNotUser', {
    params: {
      patientDocument: patientDocument,
      documentType: documentType
    }
  }).then(res => res.data);
}

