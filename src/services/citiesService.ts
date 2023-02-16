import axios from "axios";


export function getCities(inputText:any, offset:any, pageSize:any, languageId:any){
    


    return axios.post('/api/notsecure/getCities'
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