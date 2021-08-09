const initialState = {
    user:null
  };

  const reducer = (state = initialState, action) => {
      switch (action.type) {
      case 'SET_USER':
        console.log(action.user)
          return {
              ...state,
              user: action.user,
            
          };
      default:
          return state;
      }
  };
  export default reducer;