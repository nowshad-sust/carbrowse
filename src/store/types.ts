import {
    SET_IS_LOADING,
    SET_IS_ERROR,
    SET_MAKES,
    SET_CURRENT_MAKE,
    SET_CURRENT_MODEL,
    SET_MODELS,
    SET_VEHICLES,
} from './consts';

export type Make = string;
export type Model = string;

export interface Vehicle {
    make: Make;
    model: Model;
    enginePowerPS: number;
    enginePowerKW: number;
    fuelType: string;
    bodyType: string;
    engineCapacity: number;
}

export interface StateType {
    isLoading: boolean;
    isError: boolean;
    makes: Make[];
    currentMake: Make | undefined;
    models: Model[];
    currentModel: Model | undefined;
    vehicles: Vehicle[];
}

export interface SetIsLoadingAction {
    type: typeof SET_IS_LOADING;
    payload: boolean;
}

export interface SetIsErrorAction {
    type: typeof SET_IS_ERROR;
    payload: boolean;
}

export interface SetMakesAction {
    type: typeof SET_MAKES;
    payload: Make[];
}
export interface SetCurrentMakeAction {
    type: typeof SET_CURRENT_MAKE;
    payload: Make;
}
export interface SetModelsAction {
    type: typeof SET_MODELS;
    payload: Model[];
}
export interface SetCurrentModelAction {
    type: typeof SET_CURRENT_MODEL;
    payload: Model;
}
export interface SetVehiclesAction {
    type: typeof SET_VEHICLES;
    payload: Vehicle[];
}

export type ActionType =
    | SetIsLoadingAction
    | SetIsErrorAction
    | SetMakesAction
    | SetCurrentMakeAction
    | SetModelsAction
    | SetCurrentModelAction
    | SetVehiclesAction;
