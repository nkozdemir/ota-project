/* eslint-disable react/prop-types */
import { useState } from "react"

const CampaignData = ({ vehicleOptions, regions, campaigns, startForm }) => {
    const [dialogData, setDialogData] = useState([])

    const getVehicleDetails = (id) => {
        let vehicleData = vehicleOptions
            .filter(item => item.vehicle_id === id) //err
            .map(item => `${item.vehicle_make}, ${item.vehicle_model}, ${item.vehicle_year_from}-${item.vehicle_year_to}`)[0]
        //console.log(vehicleData);

        return vehicleData;
    }
    
    const setDialog = (id) => {
        const id_arr = JSON.parse(id);
        //console.log(id_arr);

        const data = regions.filter(item => id_arr.includes(item.id))
        //console.log(data);

        setDialogData(data);
    }

    return (
        <>
            <div className="font-bold text-2xl mt-4 mb-8 mx-8">Campaigns</div>
            <div className="divider m-8"></div> 
            <div className="mx-8">
                <div className="font-semibold text-xl m-8 text-center">Campaign Data</div>
                <div className="overflow-x-auto shadow-md">
                    {campaigns.length > 0 ? (
                        <>
                        <table className='table table-zebra'>
                            <thead>
                                <tr>
                                    <th>Campaign Name</th>
                                    <th>Region ID</th>
                                    <th>Vehicle SW Config ID</th>
                                    <th>Vehicle Type</th>
                                    <th>VIN</th>
                                    <th>Date</th>
                                    <th>Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.campaign_name}</td>
                                        <td>{JSON.parse(item.region_id).join(', ')}</td>
                                        <td>{item.vehicle_sw_config_id}</td>
                                        <td>{getVehicleDetails(item.vehicle_id)}</td>
                                        <td>{item.vin_number}</td>
                                        <td>{item.created_date || '-'}</td>
                                        <td>
                                            <button className="btn btn-circle bg-transparent border-none" onClick={() => {
                                                setDialog(item.region_id);
                                                window.my_modal_2.showModal();
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
                            <form method="dialog" className="modal-box">
                                <h3 className="font-bold text-lg mb-4">Region Information</h3>
                                {dialogData.map((item) => (
                                    <div key={item.id} className="my-4">
                                        <p className="py-2">Region Name: {item.region_name}</p>
                                        <p className="py-2">Country Name: {item.country_name}</p>
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
            <div className="flex items-center justify-center mt-10">
                <button className="btn btn-wide btn-primary" onClick={startForm}>New Campaign</button>
            </div>
        </>
    )
}

export default CampaignData