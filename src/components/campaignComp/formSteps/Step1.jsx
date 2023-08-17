/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react';
import FormDataContext from '../FormContext';
import showToast from '../../showToast';

const Step1 = ({ regionData, onNext }) => {
  const { setFormData } = useContext(FormDataContext);

  const [regionCheckbox, setRegionCheckbox] = useState(regionData);
  const [regionNameOptions, setRegionNameOptions] = useState([])

  useEffect(() => {
    setRegionCheckbox(regionData.map((item) => ({ ...item, isChecked: false })))
    setRegionNameOptions(regionCheckbox.reduce((acc, obj) => {
      if (!acc.find((item) => item['region_name'] === obj['region_name'])) acc.push(obj);
      return acc;
    }, []));
  }, [])

  const handleRegionCheckbox = (id) => {
    const updatedDataArray = regionNameOptions.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    //console.log('region checkbox:', updatedDataArray);
    setRegionNameOptions(updatedDataArray);
  }

  const handleCountryCheckbox = (id) => {
    const updatedDataArray = regionCheckbox.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    //console.log('country checkbox:', updatedDataArray);
    setRegionCheckbox(updatedDataArray);
  }

  const handleNext = () => {
    const selectedData = regionCheckbox
      .filter(item => item.isChecked)
      .map(({ id, region_name, country_name }) => ({ id, region_name, country_name }))
    //console.log(selectedData);
    if (selectedData.length > 0) {
      setFormData((prevData) => ({ ...prevData, regions: selectedData }));
      onNext();
    }
    else showToast('missing');
  }

  return (
    <>
      {regionNameOptions.map((item) => (
        <div key={item.id} className='my-2'>
          <label className='label cursor-pointer max-w-xs'>
            <span className={item.isChecked ? 'label-text text-lg text-accent-focus font-semibold' : 'label-text text-lg'}>{item.region_name}</span>
            <input 
                type="checkbox"
                id={`checkbox-${item.id}`}
                checked={item.isChecked}
                onChange={() => handleRegionCheckbox(item.id)}
                value={item.region_name}
                className='checkbox checkbox-accent checkbox-sm' />
          </label>
          <div className='grid md:grid-cols-4 grid-cols-3 gap-2 mt-4'>
            {item.isChecked && (
              regionCheckbox
                .filter(obj => obj.region_name === item.region_name)
                .map((o) => (
                  <div key={o.id} className='px-4 my-2'>
                      <label className='label cursor-pointer max-w-xs'>
                        <span className={o.isChecked ? 'label-text text-accent-focus font-semibold' : 'label-text'}>{o.country_name}</span>
                        <input 
                            type="checkbox"
                            id={`checkbox-${o.id}`}
                            checked={o.isChecked}
                            onChange={() => handleCountryCheckbox(o.id)}
                            className='checkbox checkbox-accent checkbox-sm ml-2'
                            value={o.country_name} />
                      </label>
                  </div>
                ))
            )}
          </div>
        </div>
      ))}
      <div className='flex items-center justify-center my-16'>
        <button type="button" className="btn btn-primary" onClick={handleNext}>
            Next
        </button>
      </div>
    </>
  );
}

export default Step1;