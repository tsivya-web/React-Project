import axios from "axios"

// יצירת instance של axios עם הגדרות נכונות
const axiosInstance = axios.create({
  baseURL: "https://server-react-project-zobh.onrender.com",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

//כתובת של השרת 
const url = "/shopping"

export const getAllOrder = async (id) => {
  try {
    const response = await axiosInstance.get(`${url}/getById/${id}`)
    return response
  } catch (error) {
    console.error("Error getting orders:", error)
    throw error
  }
}

export const add = async (item) => {
  try {
    const response = await axiosInstance.post(`${url}/add`, item)
    return response
  } catch (error) {
    console.error("Error adding order:", error)
    throw error
  }
}

