import axios from "axios"
import { useDispatch } from "react-redux"
import { update_category } from "../redux/actions/listCategoryAction.jsx"
//כתובת של השרת 
const url = "https://server-react-project-zobh.onrender.com"

export const getAllCategory = () => {

    debugger
    return axios.get(`${url}/getAll`)
}
export const updateCategory = (item) => {

    debugger
    const data = axios.put(`${url}/update/${item._id}`, item);
    return data;

}
export const dellCategory = (id) => {
    debugger
    return axios.delete(`${url}/delete/${id}`);

}
export const addCategory = (item) => {
    debugger
    return axios.post(`${url}/add`, item);

}
