import React, { FC, useEffect, useState } from 'react';
import Select from 'react-select';

interface SelectOption {
    value: string;
    label: string;
}

const API_ROOT = process.env.REACT_APP_ENDPONINT;

const fetchMakes = () =>
    fetch(API_ROOT + '/makes').then((res) => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    });

const fetchModels = (make: string) =>
    fetch(API_ROOT + '/models?make=' + make).then((res) => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    });

const fetchVehicles = (make: string, model: string) =>
    fetch(API_ROOT + '/models?make=' + make + '&model=' + model).then((res) => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    });

const Filters: FC = () => {
    const [makes, setMakes] = useState([]);
    const [selectedMake, setSelectedMake] = useState<SelectOption | undefined>();
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState<SelectOption | undefined>();
    // const [keyword, setKeyword] = useState('');

    useEffect(() => {
        (async () => {
            const data = await fetchMakes();
            setMakes(data);
        })();
    }, []);

    useEffect(() => {
        if (selectedMake) {
            (async () => {
                const data = await fetchModels(selectedMake.value);
                setModels(data);
            })();
        }
    }, [selectedMake]);

    useEffect(() => {
        if (selectedModel && selectedMake) {
            (async () => {
                const data = await fetchVehicles(selectedMake.value, selectedModel.value);
                console.log(data);
            })();
        }
    }, [selectedMake, selectedModel]);

    const onMakeChange = (make: SelectOption | SelectOption[] | any) => {
        setSelectedMake(make);
    };

    const onModelChange = (model: SelectOption | SelectOption[] | any) => {
        setSelectedModel(model);
    };

    return (
        <div className="filters">
            <Select options={makes.map((make) => ({ value: make, label: make }))} onChange={onMakeChange} />
            <Select options={models.map((make) => ({ value: make, label: make }))} onChange={onModelChange} />
        </div>
    );
};

export default Filters;
