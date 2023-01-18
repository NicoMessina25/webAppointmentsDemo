import axios from "axios";
import { idText } from "typescript";
const url='http://medere1.medere.localhost:8080/rest/webappointments/'



export function getMailAndCellphone(document:any,documenttype:any){
    
    return axios.get(`http://medere1.medere.localhost:8080/rest/webappointments/getMailAndCellphone`, {
        params: {
          document: document,
          documenttype:documenttype
        }
      })
      .then(res => 
        res.data
      )
      .catch(er => 
        er
      );
}

export function saveUser(user:any) {
  let newUser= {...user}

  newUser.phone = user.phone.prefix + user.phone.area + user.phone.number
  newUser.date = Date.parse(user.date);
  

  return axios.post(`http://medere1.medere.localhost:8080/rest/webappointments/saveUser`, null, {
    params: {
      user: JSON.stringify(newUser)
    }
  })
}
export function postNewPassword(id:number,password : string){
  return axios.post(url+ 'newpassword', {
    id: id,
    password: password
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
    url+'sendRecoveryCodeEmail',{
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
    url+'validateRecoveryCode',{
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