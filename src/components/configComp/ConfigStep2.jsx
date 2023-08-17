/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react"
import ConfigFormDataContext from "./ConfigFormContext"

const ConfigStep2 = ({ vehicleOptions, subsystems }) => {
    const { formData, setFormData } = useContext(ConfigFormDataContext);
    
    const [sysData, setSysData] = useState(subsystems.map((item) => ({ //err
        ...item,
        newVersion: '',
        isSelected: false
    })))

    const handleCheckboxChange = (event, id) => {
        const { checked } = event.target;
        setSysData((prevValues) =>
            prevValues.map((obj) => (obj.sys_id === id ? { ...obj, isSelected: checked } : obj))
        );
        //console.log('Checkbox change:', subsystemVersionData);
    };

    const handleInputChange = (event, id) => {
        const { value } = event.target;
        setSysData((prevValues) => 
            prevValues.map((obj) => (obj.sys_id === id ? { ...obj, newVersion: value } : obj))
        );
        //console.log('Input change:', subsystemVersionData);
    };

    const setData = () => {
        const selectedIds = sysData
            .filter(item => item.isSelected)
            .map(item => item.sys_id);
        //console.log(selectedIds);

        const selectedVersions = sysData
            .filter(item => item.isSelected && item.newVersion !== '')
            .map(item => item.newVersion);
        //console.log(selectedVersions);

        setFormData((prevData) => ({ ...prevData, sys_ids: selectedIds, sys_versions: selectedVersions }))
    }

    useEffect(() => {
        setData();
    }, [sysData])

    useEffect(() => { // get subsystem data 
        const targetVehicle = vehicleOptions
        .filter(item => 
            item.vehicle_make === formData.combo_make && 
            item.vehicle_model === formData.combo_model && 
            item.vehicle_year_from === formData.combo_year.split('-')[0] &&
            item.vehicle_year_to === formData.combo_year.split('-')[1])
        //console.log('target vehicle:', targetVehicle);
        setFormData((prevData) => ({ ...prevData, vehicle_data: targetVehicle[0] }))
        const sysIds = targetVehicle.map(item => item.subsystem_id);
        //console.log('system ids:', sysIds);
        const data = sysData.filter(item => sysIds.includes(item.sys_id));
        //console.log(data);
        setSysData(data);
    }, [])

    return (
        <>
            <div className="flex md:flex-row flex-col items-center justify-center gap-4 overflow-hidden py-2">
            {sysData.length == 0 ? (
                <div className="alert items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>No subsystem data found.</span>
                </div>
            ) : sysData.map((item) => (
                <div className="card bg-base-100 w-full sm:w-auto md:w-full lg:w-auto xl:w-auto shadow-xl" key={item.id}>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text text-lg">{item.sys_name}</span> 
                                <input 
                                    type="checkbox" 
                                    className="checkbox checkbox-accent checkbox-sm ml-2"
                                    id={`check_${item.sys_id}`}
                                    checked={item.isSelected}
                                    onChange={(e) => handleCheckboxChange(e, item.sys_id)}
                                />
                            </label>
                        </div>
                        <p>Subsystem ID: {item.sys_id}</p>
                        <p>Subsystem Short Name: {item.sys_short_name}</p>
                        {item.isSelected && (
                            <div className="card-actions justify-start">
                                <input 
                                    type="text" 
                                    placeholder="New Version" 
                                    className="input input-bordered max-w-md mt-2"
                                    id={`input_${item.sys_id}`}
                                    value={item.newVersion}
                                    onChange={(e) => handleInputChange(e, item.sys_id)} 
                                    required
                                />
                            </div>
                        )}
                    </div>
                </div> 
            ))}
            </div>
        </>
    )
}

export default ConfigStep2