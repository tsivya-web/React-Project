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
const url = "/game"

export const getAllGame = async () => {
  try {
    const response = await axiosInstance.get(`${url}/getAll`)
    return response
  } catch (error) {
    console.error("Error getting all games:", error)
    throw error
  }
}

export const updateGame = async (item) => {
  try {
    const response = await axiosInstance.put(`${url}/update/${item._id}`, item)
    return response
  } catch (error) {
    console.error("Error updating game:", error)
    throw error
  }
}

export const dellGame = async (id) => {
  try {
    const response = await axiosInstance.delete(`${url}/delete/${id}`)
    return response
  } catch (error) {
    console.error("Error deleting game:", error)
    throw error
  }
}

export const addGame = async (item) => {
  try {
    const response = await axiosInstance.post(`${url}/add`, item)
    return response
  } catch (error) {
    console.error("Error adding game:", error)
    throw error
  }
}

export const getByCategory = async (id) => {
  try {
    const response = await axiosInstance.get(`${url}/getByCategory/${id}`)
    return response
  } catch (error) {
    console.error("Error getting games by category:", error)
    throw error
  }
}


