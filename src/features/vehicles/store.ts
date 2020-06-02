import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch, RootState } from '../../store/index';

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

interface VehicleState {
    isLoading: boolean;
    isError: boolean;
    vehicles: Vehicle[];
}

const initialState: VehicleState = {
    isLoading: false,
    isError: false,
    vehicles: [],
};

const vehicleSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {
        setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
            state.vehicles = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
    },
});

export const { setVehicles, setLoading, setError } = vehicleSlice.actions;

export const fetchVehicles = (make: Make, model: Model): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(setLoading(true));
        const data = await fetch(`${process.env.REACT_APP_ENDPONINT}/vehicles?make=${make}&model=${model}`).then(
            (res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            },
        );
        dispatch(setVehicles(data));
        dispatch(setLoading(false));
    } catch {
        dispatch(setError(true));
        dispatch(setLoading(true));
    }
};

export const selectVehicles = (state: RootState): VehicleState => state.vehicles;
export default vehicleSlice.reducer;
