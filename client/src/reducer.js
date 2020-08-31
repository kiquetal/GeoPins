/*
 remember the state from createContext.
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
    default:
      return state;
    
  }
  
  
}
