import axios from "axios";


export function getAllCities(inputText:any,languageId:any){
    

    return axios.post(process.env.REACT_APP_MEDERE_ADDRESS +  '/rest/webappointments/getCities'
    , null, {
        params:{
            languageCode:languageId,
            inputText:inputText
        }
    }
    ).then(res => res.data)
}