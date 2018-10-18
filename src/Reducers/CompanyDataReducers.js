const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_COMPANY_DATA':
            return action.payload;
        case "GET_FAILED":
            return INITIAL_STATE;
        case 'REGISTER_SUCCESSFUL':
            return action.payload;
        case "REGISTER_FAILED":
            return { ...state, error: "Authentication Error" };
        default:
            return state;
    }
}