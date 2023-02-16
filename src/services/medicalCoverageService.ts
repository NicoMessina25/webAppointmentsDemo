import axios from "axios";


export function getMedicalCoverages(inputText:any, offSet:any, pageSize:any){
    return axios.get('/api/notsecure/getMedicalCompanies', {
        params: {
            inputText:inputText,
            offSet: offSet,
            pageSize: pageSize
        }
    }).then(res => res.data)
}

export function getPlans(inputText:any, offSet:any, pageSize:any, filterId:any){
    
    return axios.get('/api/notsecure/getPlans', {
        params: {
            inputText: inputText,
            filterId: filterId || 0,
            offSet: offSet,
            pageSize: pageSize
        }
    }).then(res => res.data)
}