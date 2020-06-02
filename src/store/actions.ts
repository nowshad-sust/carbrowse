import {
    SET_MAKES,
    SET_MODELS,
    SET_CURRENT_MAKE,
    SET_CURRENT_MODEL,
    SET_VEHICLES,
    SET_IS_ERROR,
    SET_IS_LOADING,
} from './consts';
import { ActionType } from './types';
import { Make, Model, Vehicle } from './types';

const API_ROOT = process.env.REACT_APP_ENDPONINT;

export const actionCreator = (dispatch: React.Dispatch<ActionType>): any => {
    const fetchAndSetMakes = () => {
        return fetch(API_ROOT + '/makes')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((data) => setMakes(data));
    };

    const fetchAndSetModels = (make: Make) => {
        return fetch(API_ROOT + '/models?make=' + make)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((data) => setModels(data));
    };

    const fetchAndSetVehicles = (make: Make, model: Model) => {
        return fetch(`${API_ROOT}/vehicles?make=${make}&model=${model}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((data) => setVehicles(data));
    };

    const setIsLoading = (payload: boolean) =>
        dispatch({
            type: SET_IS_LOADING,
            payload,
        });

    const setIsError = (payload: boolean) =>
        dispatch({
            type: SET_IS_ERROR,
            payload,
        });

    const setMakes = (payload: Make[]) =>
        dispatch({
            type: SET_MAKES,
            payload,
        });

    const setCurrentMake = (payload: Make) =>
        dispatch({
            type: SET_CURRENT_MAKE,
            payload,
        });

    const setModels = (payload: Model[]) =>
        dispatch({
            type: SET_MODELS,
            payload,
        });

    const setCurrentModel = (payload: Model) =>
        dispatch({
            type: SET_CURRENT_MODEL,
            payload,
        });

    const setVehicles = (payload: Vehicle[]) =>
        dispatch({
            type: SET_VEHICLES,
            payload,
        });

    return {
        setIsLoading,
        setIsError,
        fetchAndSetMakes,
        fetchAndSetModels,
        fetchAndSetVehicles,
        setMakes,
        setCurrentMake,
        setModels,
        setCurrentModel,
        setVehicles,
    };
};
