import axios from "axios";
import { idText } from "typescript";
const url='/rest/webappointments/'


const urlLocal= window.location.href;
const baseUrl = new URL(urlLocal).origin;



export function getDevice(){
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  const iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os = "";

  if (macosPlatforms.indexOf(platform) !== -1) {
      os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "Windows";
  } else if (/Android/.test(userAgent)) {
      os = "Android";
  } else if (!os && /Linux/.test(platform)) {
      os = "Linux";
  }

  return os;
}

export async function authenticateUser(username:string,password:string,remember:boolean){

 
    return axios.post(
      '/api/auth/authenticate',{
        username:username,
        password:password,
        siteURL:baseUrl,
        appId:2,
        deviceId:getDevice(),
        remember:remember
      },{
        headers: {
          'Content-Type': 'application/json',
        }})
      .then(response => 
        response
      )
  
}

export function logout(){
  return axios.post('/api/auth/logout',{
      appId:2,
      deviceId:getDevice(),
  }).then(res => {
      return res.data
  } );   
}










