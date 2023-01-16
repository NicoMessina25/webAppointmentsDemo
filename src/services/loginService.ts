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