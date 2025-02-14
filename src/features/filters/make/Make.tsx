import React, { FC, useEffect } from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { selectMake, fetchMakes, setCurrentMake } from './store';
import { reset } from '../model/store';
import { setVehicles } from '../../vehicles/store';
import ErrorOverlay from '../../common/ErrorOverlay';

interface SelectOption {
    value: string;
    label: string;
}

const Make: FC = () => {
    const { isLoading, isError, makes, currentMake } = useSelector(selectMake);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMakes());
    }, [dispatch]);

    const onMakeChange = (make: SelectOption | SelectOption[] | any) => {
        // reset models
        dispatch(reset());
        // reset vehicles
        dispatch(setVehicles([]));
        dispatch(setCurrentMake(make.value));
    };

    return (
        <div className="make">
            <Select
                className="select"
                name="make"
                options={makes.map((make) => ({ value: make, label: make }))}
                onChange={onMakeChange}
                isLoading={isLoading}
                isDisabled={isLoading || isError || makes?.length === 0}
                placeholder={makes?.length === 0 ? 'Makes is empty!' : 'Select car make'}
                hasValue={!!currentMake}
                value={currentMake ? { label: currentMake, value: currentMake } : null}
            />
            <ErrorOverlay isError={isError} text="Failed to fetch makes!" onResolve={() => dispatch(fetchMakes())} />
        </div>
    );
};

export default Make;
