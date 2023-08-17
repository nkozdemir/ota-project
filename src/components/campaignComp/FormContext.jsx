/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const FormDataContext = createContext(undefined);

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    campaign_name: '',
    campaign_desc: '',
    regions: [],
    config: '',
    vehicle_id: '',
    vehicle: {},
    vehicle_vin: ''
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataContext;
