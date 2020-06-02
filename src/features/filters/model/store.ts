import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk, RootState } from '../../../store/index';

export type Model = string | undefined;
export type Make = string;

interface ModelState {
    isLoading: boolean;
    isError: boolean;
    models: Model[];
    currentModel: Model | undefined;
}

const initialState: ModelState = {
    isLoading: false,
    isError: false,
    models: [],
    currentModel: undefined,
};

const modelSlice = createSlice({
    name: 'models',
    initialState,
    reducers: {
        setModels: (state, action: PayloadAction<Model[]>) => {
            state.models = action.payload;
        },
        setCurrentModel: (state, action: PayloadAction<Model>) => {
            state.currentModel = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        reset: (state, action: PayloadAction<void>) => {
            state.currentModel = undefined;
            state.models = [];
        },
    },
});

export const { setLoading, setError, setModels, setCurrentModel, reset } = modelSlice.actions;

export const fetchModels = (make: Make): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(setLoading(true));
        dispatch(reset());

        const data = await fetch(process.env.REACT_APP_ENDPONINT + '/models?make=' + make).then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        });

        dispatch(setModels(data));
        dispatch(setLoading(false));
        dispatch(setError(false));
    } catch {
        dispatch(setError(true));
        dispatch(setLoading(false));
    }
};

export const selectModels = (state: RootState): ModelState => state.models;
export default modelSlice.reducer;
