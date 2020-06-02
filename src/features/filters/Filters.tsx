import React, { FC, useEffect, useContext } from 'react';
import Select from 'react-select';
import { store } from '../../store/Store';
import './filters.scss';

interface SelectOption {
    value: string;
    label: string;
}

const Filters: FC = () => {
    const { state, actions } = useContext(store);
    const { makes, currentMake, models, currentModel } = state;

    useEffect(() => {
        actions.fetchAndSetMakes();
    }, [actions]);

    useEffect(() => {
        if (currentMake) {
            actions.fetchAndSetModels(currentMake);
        }
    }, [currentMake, actions]);

    useEffect(() => {
        if (currentModel && currentMake) {
            actions.fetchAndSetVehicles(currentMake, currentModel);
        }
    }, [currentMake, currentModel, actions]);

    const onMakeChange = (make: SelectOption | SelectOption[] | any) => {
        actions.setCurrentMake(make.value);
    };

    const onModelChange = (model: SelectOption | SelectOption[] | any) => {
        actions.setCurrentModel(model.value);
    };

    return (
        <div className="filters">
            <Select
                className="make"
                options={makes.map((make) => ({ value: make, label: make }))}
                onChange={onMakeChange}
                placeholder="Select car make"
            />
            <Select
                isLoading={true}
                className="model"
                options={models.map((make) => ({ value: make, label: make }))}
                onChange={onModelChange}
                placeholder="Select car model"
            />
        </div>
    );
};

export default Filters;
