const INITIAL_STATE = { id: 0, name: "", address: "", revenue: "", countryCode: "", telephone: "" };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESSFUL':
            return action.payload;
        case "REGISTER_FAILED":
            return { ...state, error: "Authentication Error" };
        default:
            return state;
    }
}