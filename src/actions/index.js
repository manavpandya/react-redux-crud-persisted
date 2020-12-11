import {
    ADD_RECORD,
    EDIT_RECORD,
    UPDATE_RECORD,
    SELECT_RECORD,
    SELECT_RECORDS,
    DELETE_RECORD,
} from "../actiontypes/index";

export const selectRecords = () => {
    return {
        type: SELECT_RECORDS
    };
};

export const selectRecord = (id) => {
    return {
        type: SELECT_RECORD,
        id
    };
};

export const addRecord = payload => {
    return {
        type: ADD_RECORD,
        payload
    };
};

export const editRecord = id => {
    return {
        type: EDIT_RECORD,
        id
    };
};

export const updateRecord = (data) => {
    return {
        type: UPDATE_RECORD,
        data
    };
};

export const deleteRecord = (id) => {
    return {
        type: DELETE_RECORD,
        id
    };
};