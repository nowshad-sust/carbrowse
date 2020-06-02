import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import makeReducer from '../features/filters/make/store';
import modelReducer from '../features/filters/model/store';
import vehicleReducer from '../features/vehicles/store';

export const store = configureStore({
    reducer: {
        makes: makeReducer,
        models: modelReducer,
        vehicles: vehicleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
