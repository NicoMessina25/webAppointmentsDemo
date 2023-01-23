import axios from "axios";


export function getAllCities(inputText:any,languageId:any){
    
    console.log(inputText," ",languageId)
    return axios.post(process.env.REACT_APP_MEDERE_ADDRESS +  '/rest/webappointments/getCities'
    ,{
        params:{
            languageCode:languageId,
            inputText:inputText
        }
    }
    ).then(res => res.data)
}