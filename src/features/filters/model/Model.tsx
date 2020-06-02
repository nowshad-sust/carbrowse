import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { selectModels, setCurrentModel, fetchModels } from './store';
import { selectMake } from '../make/store';

interface SelectOption {
    value: string;
    label: string;
}

const Model: FC = () => {
    const { currentMake } = useSelector(selectMake);
    const { models, isLoading, isError, currentModel } = useSelector(selectModels);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentMake) {
            dispatch(fetchModels(currentMake));
        }
    }, [dispatch, currentMake]);

    const onModelChange = (model: SelectOption | SelectOption[] | any) => {
        dispatch(setCurrentModel(model.value));
    };

    return (
        <Select
            className="model"
            name="model"
            options={models.map((model) => ({ value: model, label: model }))}
            onChange={onModelChange}
            isLoading={isLoading}
            isDisabled={!currentMake || isLoading || isError}
            placeholder="Select car model"
            hasValue={!!currentModel}
            value={currentModel ? { label: currentModel, value: currentModel } : null}
        />
    );
};

export default Model;
