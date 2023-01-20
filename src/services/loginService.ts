import axios from "axios";
import { idText } from "typescript";
const url=process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/'



export function getMailAndCellphone(document:any,documenttype:any){
    
    return axios.get(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/getMailAndCellphone', {
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
  console.log(newUser);
  

  return axios.post(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/saveUser', null, {
    params: {
      user: JSON.stringify(newUser)
    }
  })
}
export function postNewPassword(id:number,password : string){
  return axios.post(url+ 'resetpassword', {
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

export async function validateMedereUser(username:string,password:string){

    return axios.post(
      url+'validatemedereuser',{
        username:username,
        password:password
      },{
        headers: {
          'Content-Type': 'application/json',
        }})
      .then(response => 
        response
      )
  
  
}

