import axios from "axios";


export function getMedicalCoverages(inputText:any, offSet:any, pageSize:any){
    return axios.get(process.env.REACT_APP_MEDERE_ADDRESS +  '/rest/webappointments/getMedicalCompanies', {
        params: {
            inputText:inputText,
            offSet: offSet,
            pageSize: pageSize
        }
    }).then(res => res.data)
}

export function getPlans(inputText:any, offSet:any, pageSize:any, filterId:any){
    
    
    return axios.get(process.env.REACT_APP_MEDERE_ADDRESS +  '/rest/webappointments/getPlans', {
        params: {
            inputText: inputText,
            filterId: filterId || 0,
            offSet: offSet,
            pageSize: pageSize
        }
    }).then(res => res.data)
}