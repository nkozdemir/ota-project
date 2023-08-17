/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import FormDataContext from '../FormContext';
import showToast from '../../showToast';

const Step4 = ({ onPrev, onSubmit, submitting }) => {
  const { formData, setFormData } = useContext(FormDataContext);
  
  const [inputFields, setInputFields] = useState({
    name: '',
    desc: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputFields((prevData) => ({ ...prevData, [id]: value }));
  }

  const handlePrev = () => {
    setInputFields(null);
    setFormData((prevData) => ({ ...prevData, campaign_name: null, campaign_desc: null })) 
    onPrev();
  }

  const handleSubmit = () => {
    if (inputFields.name !== '' && inputFields.desc !== '') {
      setFormData((prevData) => ({ ...prevData, campaign_name: inputFields.name, campaign_desc: inputFields.desc })) 
      onSubmit();
    }
    else showToast('missing');
  }

  useEffect(() => {
      setFormData((prevData) => ({ ...prevData, campaign_name: inputFields.name, campaign_desc: inputFields.desc })) 
  }, [inputFields])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-control col-span-2 sm:col-span-1">
          <label className="label">
            <span className="label-text">Campaign Name:</span>
          </label>
          <input 
            type="text" 
            id='name'
            value={inputFields.name}
            onChange={handleChange}
            placeholder="Enter Campaign Name" 
            className="input input-bordered w-full" />
        </div>
        <div className="form-control col-span-2 sm:col-span-1">
          <label className="label">
            <span className="label-text">Campaign Description:</span>
          </label>
          <textarea 
            id='desc'
            value={inputFields.desc}
            onChange={handleChange}
            placeholder="Enter Campaign Description" 
            className="textarea textarea-bordered w-full"
            rows={2} />
        </div>
      </div>
      <div className='mt-8 overflow-x-auto shadow-md'>
        <table className='table table-zebra w-full'>
          <thead>
            <tr>
              <th>Region</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {formData.regions.map((item) => (
              <tr key={item.id}>
                <td>{item.region_name}</td>
                <td>{item.country_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-8 overflow-x-auto shadow-md'>
        <table className='table table-zebra w-full'>
          <thead>
            <tr>
              <th>Config Name</th>
              <th>Vehicle Type</th>
              <th>Vehicle SW Config ID</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{formData.config.vehicle_sw_config_name}</td>
                <td>{formData.vehicle.vehicle_make}, {formData.vehicle.vehicle_model}, {formData.vehicle.vehicle_year_from} - {formData.vehicle.vehicle_year_to}</td>
                <td>{formData.config.vehicle_sw_config_id}</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div className='join flex items-center justify-center my-16'>
        <button type="button" className={submitting ? "btn btn-neutral" : "btn btn-neutral join-item"} onClick={handlePrev} disabled={submitting}>
          Back
        </button>
        <button type="button" className={submitting ? 'btn' : "btn btn-primary join-item"} onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <span className="loading loading-spinner"></span>
            </>
          ) : 'Submit'}
        </button>
      </div>
    </>
  );
}

export default Step4