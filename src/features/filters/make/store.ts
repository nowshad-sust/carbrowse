import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch, RootState } from '../../../store/index';

export type Make = string;
export type Model = string;

interface MakeState {
    isLoading: boolean;
    isError: boolean;
    makes: Make[];
    currentMake: Make | undefined;
}

const initialState: MakeState = {
    isLoading: false,
    isError: false,
    makes: [],
    currentMake: undefined,
};

const makeSlice = createSlice({
    name: 'makes',
    initialState,
    reducers: {
        setMakes: (state, action: PayloadAction<Make[]>) => {
            state.makes = action.payload;
        },
        setCurrentMake: (state, action: PayloadAction<Make>) => {
            state.currentMake = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
    },
});

export const { setMakes, setLoading, setError, setCurrentMake } = makeSlice.actions;

export const fetchMakes = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(setLoading(true));
        const data = await fetch(process.env.REACT_APP_ENDPONINT + '/makes').then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        });
        dispatch(setMakes(data));
        dispatch(setLoading(false));
        dispatch(setError(false));
    } catch {
        dispatch(setError(true));
        dispatch(setLoading(false));
    }
};

export const selectMake = (state: RootState): MakeState => state.makes;
export default makeSlice.reducer;
