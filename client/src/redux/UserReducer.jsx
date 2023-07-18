const initialState = {
    isLoginIn: false
  };
  
  const UserReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          isLoginIn: true
        };
      case "LOGOUT":
        return {
          ...state,
          isLoginIn: false
        };
      default:
        return state;
    }
  };
  
  export default UserReducer;
  