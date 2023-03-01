import axios from "axios";


export function getAppointments(offSet:any,pageSize:any,language:any,params:any ){
    
    /* "language":1,
    "medicalspeciality":51,
    "professional":58946,
    "videocall":false,
    "building":3,
    "hour":"",
    "time":"tade",
    "date":"2023-02-25T10:31:59.000Z"
     */

    let professional=-1;
    if(params.professional)
        professional=params.professional;

    return axios.post('/api/secure/appointments/getAppointments',params,
    {
        params: {
            pageSize:pageSize,
            offSet:offSet,
        }
    }).then(res => {return res.data})
}


