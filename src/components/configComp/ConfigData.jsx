import { useState } from "react";

/* eslint-disable react/prop-types */
const ConfigData = ({ vehicleOptions, vehicleConfigs, startForm, subsystems }) => {
    const [dialogData, setDialogData] = useState([])

    const getVehicleDetails = (id) => {
        let vehicleData = vehicleOptions
            .filter(item => item.vehicle_id === id)
            .map(item => `${item.vehicle_make}, ${item.vehicle_model}, ${item.vehicle_year_from}-${item.vehicle_year_to}`)[0]
        //console.log(vehicleData);

        return vehicleData;
    }

    const setDialog = (id, ver) => {
        const id_arr = JSON.parse(id);
        //console.log(id_arr);
        const ver_arr = JSON.parse(ver);
        //console.log(ver_arr);

        const data = subsystems.filter(item => id_arr.includes(item.sys_id)).map((obj, index) => {
            return {
                ...obj,
                version: ver_arr[index]
            }
        })
        //console.log(data);

        setDialogData(data);
    }

    return (
        <>
            <div className="font-bold text-2xl mt-4 mb-8 mx-8">Vehicle Configurations</div>
            <div className="divider m-8"></div> 
            <div className="mx-8">
                <div className="font-semibold text-xl m-8 text-center">Vehicle Configuration Data</div>
                <div className="overflow-x-auto shadow-md">
                    {vehicleConfigs.length > 0 ? (
                    <>
                        <table className='table table-zebra'>
                            <thead>
                                <tr>
                                    <th>Config Name</th>
                                    <th>Vehicle SW Config ID</th>
                                    <th>Vehicle Type</th>
                                    <th>Subsystem ID</th>
                                    <th>Date</th>
                                    <th>Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicleConfigs.map(item => (
                                    <tr key={item.vehicle_sw_config_id}>
                                        <td>{item.vehicle_sw_config_name}</td>
                                        <td>{item.vehicle_sw_config_id}</td>
                                        <td>{getVehicleDetails(item.vehicle_id)}</td>
                                        <td>{JSON.parse(item.subsystem_id).join(', ')}</td>
                                        <td>{item.date || '-'}</td>
                                        <td>
                                            <button className="btn btn-circle bg-transparent border-none" onClick={() => {
                                                setDialog(item.subsystem_id, item.subsystem_version);
                                                window.my_modal.showModal();
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
                            <form method="dialog" className="modal-box">
                                <h3 className="font-bold text-lg mb-4">Subsystem Information</h3>
                                {dialogData.map((item) => (
                                    <div key={item.id} className="my-4">
                                        <p className="py-2">Subsystem ID: {item.sys_id}</p>
                                        <p className="py-2">Subsystem Name: {item.sys_name} - {item.sys_short_name}</p>
                                        <p className="py-2">Current Version: {item.version}</p>
                                    </div>
                                ))}
                            </form>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </>
                    ) : (
                        <div className="flex items-center justify-center">
                            <span className="loading loading-spinner loading-lg my-8"></span>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-10 flex items-center justify-center">
                <button className="btn btn-wide btn-primary" onClick={startForm}>New Configuration</button>
            </div>
        </>
    )
}

export default ConfigData