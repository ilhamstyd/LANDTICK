export const login = (email) => {
    return {
      type: "LOGIN",
      payload: email,
    };
  };
  
  export const logout = () => {
    return {
      type: "LOGOUT"
    };
  };
  