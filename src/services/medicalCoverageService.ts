import axios from "axios";


export function getAllMedicalCoverages(){
    return axios.get(process.env.REACT_APP_MEDERE_ADDRESS +  '/rest/webappointments/getMedicalCompanies').then(res => res.data)
}

export function getPlans(filterId:any){
    return axios.get(process.env.REACT_APP_MEDERE_ADDRESS +  '/rest/webappointments/getPlans', {
        params: {
            filterId: filterId
        }
    }).then(res => res.data)
}