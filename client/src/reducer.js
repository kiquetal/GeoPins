/*
 remember the state from createContext.

 */
 /*
  @startuml
  
  @enduml
  */
export default function reduce(state, action) {
  
  switch (action.type) {
    
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: action.payload
      };
      
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: action.payload
      }
    case "SIGNOUNT_USER":
      return {
        ...state,
        isAuth: false,
        currentUser: null
      }
    case "CREATE_DRAFT":
    {
      return {
        ...state,
        draft:{
          latitude:0,
          longitude:0
        }
      }
    }
    case "UPDATE_DRAFT_LOCATION":
    {
      return {
        ...state,
        draft: action.payload
      }
    }
    
    case "DELETE_DRAFT":{
      return {
        ...state,
        draft: null
      }
    }
    
    default:
      return state;
    
  }
  
  
}
