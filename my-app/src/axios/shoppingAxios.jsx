import axios from "axios"
//כתובת של השרת 
const url="https://client-react-project.onrender.com"
export const getAllOrder=(id)=>{
debugger
    return axios.get(`${url}/getById/${id}`)
}
export const add=(item)=>{
    debugger
        return axios.post(`${url}/add`,item)
    }

