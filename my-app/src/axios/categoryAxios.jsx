import axios from "axios"
import { useDispatch } from "react-redux"
import { update_category } from "../redux/actions/listCategoryAction.jsx"

// יצירת instance של axios עם הגדרות נכונות
const axiosInstance = axios.create({
  baseURL: "https://server-react-project-zobh.onrender.com",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

//כתובת של השרת 
const url = "/category"

export const getAllCategory = async () => {
  try {
    const response = await axiosInstance.get(`${url}/getAll`)
    return response
  } catch (error) {
    console.error("Error getting all categories:", error)
    throw error
  }
}

export const updateCategory = async (item) => {
  try {
    const response = await axiosInstance.put(`${url}/update/${item._id}`, item)
    return response
  } catch (error) {
    console.error("Error updating category:", error)
    throw error
  }
}

export const dellCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`${url}/delete/${id}`)
    return response
  } catch (error) {
    console.error("Error deleting category:", error)
    throw error
  }
}

export const addCategory = async (item) => {
  try {
    const response = await axiosInstance.post(`${url}/add`, item)
    return response
  } catch (error) {
    console.error("Error adding category:", error)
    throw error
  }
}
