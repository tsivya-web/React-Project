import {produce} from 'immer'
export const myState={
    list:[
    // { code:1234,
    // name:"aaa",
    // price:100,
    // img:"חתלתול.jpg",
    // age:12,
    // codeCategory:1,
    // details:"Embark on an exciting journey through mysterious lands and solve challenging puzzles to save the kingdom!"
    // },
    // { code:33333,
    //     name:"vvvv",
    //     price:10,
    //     img:"חתלתול.jpg",
    //     age:13,
    //     codeCategory:1,
    //     details:"Embark on an exciting journey through mysterious lands and solve challenging puzzles to save the kingdom!"
    //     },
    ],

   }
   export const dataGameReducer=produce((state,action)=>{
    switch(action.type){
   
                        case "SET_LISTGAME":{
                console.log("Setting games list:", action.payload)
                state.list=action.payload
                break;}

                case "UPDATE_GAME": {
                    // const index=state.list.findIndex(u=>u._id==action.payload._id)
                    // state.list[index]==action.payload
                    const index = state.list.findIndex((u) => u._id === action.payload._id);
              
                    if (index !== -1) {
                      return {
                        ...state,
                        list: state.list.map((item, i) =>
                          i === index ? action.payload : item
                        ),
                      };
                    }
                    return state;
                  }
               
                  case "DELL_GAME": {
                    if (action.payload.status1) {
                      return {
                        ...state,
                        list: state.list.filter((item) =>
                          item._id != action.payload.id
                        ),
                      };
                    }
                    return state;
                  }
                  case "ADD_GAME": {
                      state.list.push(action.payload)
                     break;
                  }

    default:
    break;
    }

   },myState)