export const initialState = {
    loggedIn: false,
    socket: null
}

const reducer = (state, action) => {
    switch(action.type) {
        case "SET_LOGGED_IN": 
            return {
                ...state,
                loggedIn: action.loggedIn
            }
        case "SET_SOCKET":
            return {
                ...state,
                socket: action.socket
            }
        default: return state;
    }
}

export default reducer;