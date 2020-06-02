import {
    SET_IS_LOADING,
    SET_IS_ERROR,
    SET_MAKES,
    SET_MODELS,
    SET_CURRENT_MAKE,
    SET_CURRENT_MODEL,
    SET_VEHICLES,
} from './consts';
import { StateType, ActionType } from './types';

const reducers = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case SET_IS_ERROR:
            return {
                ...state,
                isError: action.payload,
            };
        case SET_MAKES:
            return {
                ...state,
                makes: action.payload,
            };
        case SET_CURRENT_MAKE:
            return {
                ...state,
                currentMake: action.payload,
            };
        case SET_MODELS:
            return {
                ...state,
                models: action.payload,
            };
        case SET_CURRENT_MODEL:
            return {
                ...state,
                currentModel: action.payload,
            };
        case SET_VEHICLES:
            return {
                ...state,
                vehicles: action.payload,
            };
        default:
            return state;
    }
};
export default reducers;
