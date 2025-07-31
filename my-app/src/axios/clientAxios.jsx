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
const url = "/client"

export const getAllClient = async () => {
  try {
    const response = await axiosInstance.get(`${url}/getAll`)
    return response
  } catch (error) {
    console.error("Error getting all clients:", error)
    throw error
  }
}

export const addClient = async (item) => {
  try {
    const response = await axiosInstance.post(`${url}/add`, item)
    return response
  } catch (error) {
    console.error("Error adding client:", error)
    throw error
  }
}

export const isExist = async (name, password) => {
  try {
    const response = await axiosInstance.get(`${url}/isExist/${name}/${password}`)
    return response
  } catch (error) {
    console.error("Error checking if client exists:", error)
    throw error
  }
}

export const idClient = async (name, password) => {
  try {
    const response = await axiosInstance.get(`${url}/idClient/${name}/${password}`)
    return response
  } catch (error) {
    console.error("Error getting client ID:", error)
    throw error
  }
}
