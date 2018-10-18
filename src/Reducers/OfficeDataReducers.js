const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_OFFICE_DATA':
            return action.payload;
        case "GET_FAILED":
            return INITIAL_STATE;
        default:
            return state;
    }
}