import axios from "axios";



export function getMailAndCellphone(document:any){
    
    return axios.get(`http://medere1.medere.localhost:8080/rest/webappointments/getMailAndCellphone`, {
        params: {
          document: document
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