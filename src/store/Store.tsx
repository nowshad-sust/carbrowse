import React, { createContext, useReducer } from 'react';
import reducers from './reducers';
import { actionCreator } from './actions';
import { StateType } from './types';

const initialState: StateType = {
    isLoading: false,
    isError: false,
    makes: [],
    currentMake: undefined,
    models: [],
    currentModel: undefined,
    vehicles: [],
};

const store = createContext<{
    state: StateType;
    actions: any;
}>({
    state: initialState,
    actions: {},
});

const { Provider } = store;

const StateProvider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(reducers, initialState);
    const actions = actionCreator(dispatch);

    return <Provider value={{ state, actions }}>{children}</Provider>;
};

export type StoreType = typeof store;
export type StateProviderType = typeof StateProvider;
export { store, StateProvider };
