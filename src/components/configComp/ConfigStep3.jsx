/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"
import ConfigFormDataContext from "./ConfigFormContext"

const ConfigStep3 = ({ subsystems }) => {
    const { formData, setFormData } = useContext(ConfigFormDataContext);
    
    const [configName, setConfigName] = useState('');
    const sysInfo = subsystems
        .filter(item => formData.sys_ids.includes(item.sys_id))
        .map((element, index) => {
            return {
                ...element,
                version: formData.sys_versions[index]
            }
        })

    const handleChange = (e) => {
        setConfigName(e.target.value);
    }

    useEffect(() => {
        setFormData((prevData) => ({ ...prevData, config_name: configName }))
    }, [configName])

    return (
        <>
            <div className="form-control max-w-xs">
                <label className="label">
                    <span className="label-text">Configuration Name:</span>
                </label>
                <input 
                    type="text" 
                    id='name'
                    value={configName}
                    onChange={handleChange}
                    placeholder="Enter Config Name" 
                    className="input input-bordered" />
            </div>
            <div className="shadow-md mt-8">
                <table className='table table-zebra'>
                    <thead>
                        <tr>
                            <th>Vehicle Make</th>
                            <th>Vehicle Model</th>
                            <th>Vehicle Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{formData.vehicle_data.vehicle_make}</td>
                            <td>{formData.vehicle_data.vehicle_model}</td>
                            <td>{formData.vehicle_data.vehicle_year_from} - {formData.vehicle_data.vehicle_year_to}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="shadow-md mt-8">
                <table className='table table-zebra'>
                    <thead>
                        <tr>
                            <th>Subsystem ID</th>
                            <th>Subsystem Name</th>
                            <th>Version</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sysInfo.map((item) => (
                            <tr key={item.id}>
                                <td>{item.sys_id}</td>
                                <td>{item.sys_name} - {item.sys_short_name}</td>
                                <td>{item.version}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ConfigStep3