/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import FormDataContext from '../FormContext';
import showToast from '../../showToast';

const Step2 = ({ vehicleConfigurations, onNext, onPrev, subsystems, vehicleOptions }) => {
  const { setFormData } = useContext(FormDataContext);
  
  const [configData, setConfigData] = useState([]);
  const [dialogData, setDialogData] = useState({
    sys_data: [],
    veh_data: []
  });

  useEffect(() => {
    //console.log(vehicleConfigurations);
    setConfigData(vehicleConfigurations.map((item) => ({
      ...item,
      isChecked: false
    })))
  }, [vehicleConfigurations])

  const handleCheckboxChange = (id) => {
    const updatedDataArray = configData.map((item) =>
      item.vehicle_sw_config_id === id ? { ...item, isChecked: true } : { ...item, isChecked: false }
    );
    //console.log('step2, updated array:', updatedDataArray);
    setConfigData(updatedDataArray);
  };

  const setDialog = (sub_id, ver, veh_id) => {
    const id_arr = JSON.parse(sub_id);
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
    const v_data = vehicleOptions.filter(item => item.vehicle_id === veh_id);

    setDialogData((prevData) => ({ ...prevData, sys_data: data, veh_data: v_data }));
  }

  const handleNext = () => {
    const selectedData = configData
      .filter(item => item.isChecked)
      .map(({ vehicle_sw_config_id, vehicle_sw_config_name, vehicle_id, subsystem_id, subsystem_version, status, date }) => ({ vehicle_sw_config_id, vehicle_sw_config_name, vehicle_id, subsystem_id, subsystem_version, status, date }));

    if (selectedData.length > 0) {
      setFormData((prevData) => ({ ...prevData, config: selectedData[0], vehicle_id: selectedData[0].vehicle_id }));
      onNext();
    }
    else showToast('missing');
  }

  const handlePrev = () => {
    setConfigData(null);
    setFormData((prevData) => ({ ...prevData, config: null, vehicle_id: null }));
    onPrev();
  }

  return (
    <>
      {configData.length > 0 ? (
        <div className='overflow-x-auto shadow-md'>
          <table className='table table-zebra'>
            <thead>
              <tr>
                <th></th>
                <th>Config Name</th>
                <th>Vehicle SW Config ID</th>
                <th>Vehicle ID</th>
                <th>Subsystem ID</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              {configData.map(item => (
              <tr key={item.vehicle_sw_config_id}>
                <td>
                <input 
                    type="checkbox"
                    id={`checkbox-${item.vehicle_sw_config_id}`}
                    checked={item.isChecked}
                    onChange={() => handleCheckboxChange(item.vehicle_sw_config_id)}
                    className="checkbox checkbox-accent checkbox-sm" />
                </td>
                <td>{item.vehicle_sw_config_name}</td>
                <td>{item.vehicle_sw_config_id}</td>
                <td>{item.vehicle_id}</td>
                <td>{JSON.parse(item.subsystem_id).join(', ')}</td>
                <td>
                    <button className="btn btn-sm btn-circle bg-transparent border-none" onClick={() => {
                        setDialog(item.subsystem_id, item.subsystem_version, item.vehicle_id);
                        window.my_modal_3.showModal();
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
          <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg mb-4">Information</h3>
              <div className='grid grid-cols-2 gap-8'>
                <div>
                  {dialogData.sys_data.map((item) => (
                    <div key={item.id} className="my-4">
                      <p className="py-2">Subsystem ID: {item.sys_id}</p>
                      <p className="py-2">Subsystem Name: {item.sys_name} - {item.sys_short_name}</p>
                      <p className="py-2">Current Version: {item.version}</p>
                    </div>
                  ))}
                </div>
                <div>
                  {dialogData.veh_data.map((item) => (
                    <div key={item.id} className='my-4'>
                      <p className="py-2">Vehicle ID: {item.vehicle_id}</p>
                      <p className="py-2">Vehicle Make - Model: {item.vehicle_make}, {item.vehicle_model}</p>
                      <p className="py-2">Vehicle Year: {item.vehicle_year_from} - {item.vehicle_year_to}</p>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner loading-lg mt-8"></span>
        </div>
      )}
      <div className='join flex items-center justify-center my-16'>
        <button type="button" className="btn btn-neutral join-item" onClick={handlePrev}>
            Back
        </button>
        <button type="button" className="btn btn-primary join-item" onClick={handleNext}>
            Next
        </button>
      </div>
    </>
  );
}

export default Step2