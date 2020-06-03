import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { selectModels, setCurrentModel, fetchModels } from './store';
import { selectMake } from '../make/store';
import ErrorOverlay from '../../common/ErrorOverlay';

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
        <div className="model">
            <Select
                className="select"
                name="model"
                options={models.map((model) => ({ value: model, label: model }))}
                onChange={onModelChange}
                isLoading={isLoading}
                isDisabled={!currentMake || isLoading || isError}
                placeholder="Select car model"
                hasValue={!!currentModel}
                value={currentModel ? { label: currentModel, value: currentModel } : null}
            />
            <ErrorOverlay
                isError={isError}
                text="Failed to fetch models!"
                onResolve={() => currentMake && dispatch(fetchModels(currentMake))}
            />
        </div>
    );
};

export default Model;
