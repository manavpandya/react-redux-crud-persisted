import {
    ADD_RECORD,
    EDIT_RECORD,
    UPDATE_RECORD,
    SELECT_RECORD,
    SELECT_RECORDS,
    DELETE_RECORD,
} from "../actiontypes/index";

let initialState = {
    records: []
}

const recordsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_RECORDS:
            return {
                ...state,
            };
        case ADD_RECORD:
            return {
                ...state,
                records: state.records.concat(action.payload)
            };
        case UPDATE_RECORD:
            return {
                ...state,
                records: state.records.map((content, i) => content.id === action.data.id ? content = action.data : content)
            };
        case DELETE_RECORD:
            return {
                ...state,
                records: state.records.filter(item => item.id !== action.id)
            };
        default:
            break;
    }

    return state;
};

export default recordsReducer;