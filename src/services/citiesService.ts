import axios from "axios";


export function getCities(inputText:any, offset:any, pageSize:any, languageId:any){
    


    return axios.post(process.env.REACT_APP_MEDERE_ADDRESS +  '/rest/webappointments/getCities'
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