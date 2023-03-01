import axios from "axios";

export function getLanguage(){
    return axios.get('/api/notsecure/general/getLanguage').then(res=>res.data)
}

export function getPlans(inputText:any, offSet:any, pageSize:any, filterId:any){
    
    return axios.get('/api/notsecure/general/getPlans', {
        params: {
            inputText: inputText,
            filterId: filterId || 0,
            offSet: offSet,
            pageSize: pageSize
        }
    }).then(res => res.data)
}

export function getCaptchaKey(){
    return axios.get('/api/notsecure/general/getWebAppointmentsCaptchaKey',{
        params:{
            appid:2
        }
    }).then(res => {
        return res.data
    } );   
}

export function getMedicalCoverages(inputText:any, offSet:any, pageSize:any){
    return axios.get('/api/notsecure/general/getMedicalCompanies', {
        params: {
            inputText:inputText,
            offSet: offSet,
            pageSize: pageSize
        }
    }).then(res => res.data)
}

export function getCities(inputText:any, offset:any, pageSize:any, languageId:any){
    


    return axios.post('/api/notsecure/general/getCities'
    , null, {
        params:{
            languageCode:languageId,
            inputText:inputText,
            offSet: offset,
            pageSize: pageSize
        }
    }
    ).then(res => res.data)
}

export function getLogo(){

    return axios.get('/api/notsecure/general/getImage').then(res=>res.data)
}

export function sendCodeByMail(id:number){
    return axios.post(
      '/api/notsecure/general/sendRecoveryCodeEmail',{
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