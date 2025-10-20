import axios from 'axios';

const apiUrl = import.meta.env.VITE_SERVER_URL;

console.log(apiUrl);

export const fetchData = async(url, method, data=null, token=null, config={}) =>{

    let headers = {}
    
    if(token){
        headers={Authorization: `Bearer ${token}`}
    }

    const axiosConfig = {
        url: apiUrl + url,
        method, 
        data,
        headers: headers,
        ...config,
    }

    const res = await axios(axiosConfig);
    return res;

}