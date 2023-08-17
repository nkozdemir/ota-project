/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react"
import ConfigFormDataContext from "./ConfigFormContext";

const ConfigStep1 = ({ vehicleOptions }) => {
    const { formData, setFormData } = useContext(ConfigFormDataContext);
    
    const [comboOptions, setComboOptions] = useState({
        make_combo: [],
        model_combo: [],
        year_combo: [],
    });

    const handleChange = (event) => {
        const { id, value } = event.target;

        if (id === 'combo_make' && value === '') {
            setFormData((prevData) => ({ ...prevData, combo_model: value }));
            setFormData((prevData) => ({ ...prevData, combo_year: value }));
        }
        else if (id === 'combo_model' && value === '')
            setFormData((prevData) => ({ ...prevData, combo_year: value }));

        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    useEffect(() => { // vehicle_make options
        const vehicleMakeArr = [...new Set(vehicleOptions.map(item => item.vehicle_make))];
        //console.log(vehicleMakeArr);
        setComboOptions((prevData) => ({ ...prevData, make_combo: vehicleMakeArr }));
    }, [vehicleOptions]);

    useEffect(() => { // vehicle_model options
        const vehicleModelArr = [...new Set(vehicleOptions.filter(item => item.vehicle_make === formData.combo_make).map(item => item.vehicle_model))];
        //console.log(vehicleModelArr);
        setComboOptions((prevData) => ({ ...prevData, model_combo: vehicleModelArr }));
    }, [formData.combo_make])

    useEffect(() => { // vehicle_year options
        const vehicleYearArr = [...new Set(vehicleOptions
        .filter(item => item.vehicle_make === formData.combo_make && item.vehicle_model === formData.combo_model)
        .map((item) => {
            return `${item.vehicle_year_from}-${item.vehicle_year_to}`
        }))];
        //console.log(vehicleYearArr);
        setComboOptions((prevData) => ({ ...prevData, year_combo: vehicleYearArr }));
    }, [formData.combo_make, formData.combo_model])

    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-16">
                <div className="form-control flex flex-col">
                    <label className="label">
                        <span className="label-text">Select Vehicle Make</span>
                    </label>
                    <select id="combo_make" onChange={handleChange} value={formData.combo_make} className="select select-bordered">
                        <option value="">Vehicle Make</option>
                        {comboOptions.make_combo.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control flex flex-col">
                    <label className="label">
                        <span className="label-text">Select Vehicle Model</span>
                    </label>
                    <select id="combo_model" onChange={handleChange} value={formData.combo_model} className="select select-bordered">
                        <option value="">Vehicle Model</option>
                        {comboOptions.model_combo.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control flex flex-col">
                    <label className="label">
                        <span className="label-text">Select Vehicle Year</span>
                    </label>
                    <select id="combo_year" onChange={handleChange} value={formData.combo_year} className="select select-bordered">
                        <option value="">Vehicle Year</option>
                        {comboOptions.year_combo.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ConfigStep1