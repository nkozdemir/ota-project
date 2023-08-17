/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const ConfigFormDataContext = createContext(undefined);

export const ConfigFormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    combo_make: '',
    combo_model: '',
    combo_year: '',
    vehicle_data: {},
    sys_ids: [],
    sys_versions: [],
    config_name: ''
  });

  return (
    <ConfigFormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </ConfigFormDataContext.Provider>
  );
};

export default ConfigFormDataContext;