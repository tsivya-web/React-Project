import { produce } from 'immer'

// קבלת המשתמש מ-localStorage אם קיים
const getStoredUser = () => {
  try {
    const stored = localStorage.getItem('currentUser')
    return stored ? JSON.parse(stored) : { name: "", password: "" }
  } catch (error) {
    return { name: "", password: "" }
  }
}

const getStoredManager = () => {
  try {
    return localStorage.getItem('isManager') === 'true'
  } catch (error) {
    return false
  }
}

export const myState = {
    userList: [
        // {
        //     password: "1234",
        //     name: "fff",
        // },
        // {
        //     password: "33333",
        //     name: "dd",
        // },
        // {
        //     password: "0000",
        //     name: "m",
        // }
    ],
    currentClient: getStoredUser(),
    isManager: getStoredManager()
}

export const dataClientReducer = produce((state, action) => {
    switch (action.type) {
        case "SET_CURRENT_CLIENT":{
            debugger; 
            state.currentClient.name = action.payload.name
            state.currentClient.password = action.payload.password
            // שמירה ב-localStorage
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
            break;}
            case "SET_IS_MANAGER":{
                debugger; 
                state.isManager = action.payload
                // שמירה ב-localStorage
                localStorage.setItem('isManager', action.payload.toString())
                break;}
                case "SET_LISTUSER": {
                    return {
                      ...state, // עותק חדש של ה-state הקיים
                      userList: action.payload, // מעדכנים את השדה list
                    };
                  }
                  case "ADD_CLIENT": {
                    debugger
                      state.userList.push(action.payload)
                     
                  }
                  case "LOGOUT": {
                    state.currentClient = { name: "", password: "" }
                    state.isManager = false
                    // מחיקה מ-localStorage
                    localStorage.removeItem('currentUser')
                    localStorage.removeItem('isManager')
                  }
    

        default:
            break;
    }

}, myState)