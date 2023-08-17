/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import FormDataContext from "../FormContext";
import showToast from "../../showToast";

const Step3 = ({ vehicleOptions, onNext, onPrev }) => {
  const { formData, setFormData } = useContext(FormDataContext);
  const [vin, setVin] = useState('');
  const [isValid, setIsValid] = useState(false);
  
  const vehicleData = vehicleOptions
    .filter(item => item.vehicle_id === parseInt(formData.vehicle_id))
    .map(({ vehicle_make, vehicle_model, vehicle_year_from, vehicle_year_to }) => ({ vehicle_make, vehicle_model, vehicle_year_from, vehicle_year_to }))[0];
  
  const handleChange = (e) => {
    const enteredVin = e.target.value;
    setVin(enteredVin);
    setIsValid(validateVin(enteredVin));
  }

  const validateVin = (inputVin) => {
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    return vinRegex.test(inputVin);
  };

  const handleNext = () => {
    if (isValid) {
      setFormData((prevData) => ({ ...prevData, vehicle_vin: vin, vehicle: vehicleData }));
      onNext();
    }
    else showToast('missing');
  }

  const handlePrev = () => {
    setVin(null);
    setFormData((prevData) => ({ ...prevData, vehicle_vin: null, vehicle: null }));
    onPrev();
  }

  return (
    <>
      <div className="overflow-x-auto shadow-md">
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
              <td>{vehicleData.vehicle_make}</td>
              <td>{vehicleData.vehicle_model}</td>
              <td>{vehicleData.vehicle_year_from} - {vehicleData.vehicle_year_to}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-8 flex items-center justify-center">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">VIN:</span>
          </label>
          <input 
            type="text" 
            placeholder="Enter VIN" 
            value={vin}
            id="vehicle-vin"
            onChange={handleChange}
            className={!isValid ? "input input-error input-bordered w-full max-w-xs ml-2" : "input input-bordered w-full max-w-xs ml-2"} />
            {!isValid && (
              <label className="label">
                <span className="label-text-alt">VIN must be exactly 17 characters long.</span>
              </label>
            )}
        </div>
      </div>
      <div className="join flex items-center justify-center my-16">
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

export default Step3