/* eslint-disable react/prop-types */
import ConfigFormDataContext from "./ConfigFormContext"
import ConfigStep1 from "./ConfigStep1"
import ConfigStep2 from "./ConfigStep2"
import ConfigStep3 from "./ConfigStep3"
import { useContext, useState } from "react"
import axios from "axios"
import showToast from '../showToast'
import { Toaster } from 'react-hot-toast'

const headers = {
  'x-api-key': import.meta.env.VITE_API_KEY
}

const FormConfig = ({ onClose, subsystems, vehicleOptions, fetchConfig }) => {
    const { formData, setFormData } = useContext(ConfigFormDataContext);
    
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.config_name == '') showToast('missing');
        else {
            setSubmitting(true);
            const requestBody = {
                vehicle_sw_config_name: formData.config_name,
                vehicle_id: parseInt(formData.vehicle_data.vehicle_id),
                subsystem_id: formData.sys_ids,
                subsystem_version: formData.sys_versions
            }
            //console.log(requestBody);

            await axios
                .post(`${import.meta.env.VITE_API_BASE_URL}/createvehicleconfiguration`, requestBody, { headers })
                .then(response => {
                    //console.log(response);
                    if (response.data.statusCode === 200) {
                        showToast('ok');
                        setTimeout(() => {
                            setSubmitting(false);
                            handleClose();
                            fetchConfig();
                        }, 3000);
                    }
                    else {
                        showToast('err');
                        setSubmitting(false);
                    }
                })
                .catch(error => {
                    console.error('Error while adding configuration:', error.response.data.message);
                    showToast('err');
                    setSubmitting(false);
                })
        }
    }

    const handleClose = () => {
        //reset form
        setSubmitting(false);
        setFormData(null);
        setStep(1);
        onClose();
    }

    const nextStep = () => {
        if (step == 1 && (formData.combo_make !== '' && formData.combo_model !== '' && formData.combo_year !== '')) {
            setStep((prevStep) => prevStep + 1);
            //console.log(formData);
        }
        else if (step == 2 && (formData.sys_ids.length > 0 && formData.sys_versions.length == formData.sys_ids.length)) {
            setStep((prevStep) => prevStep + 1);
            //console.log(formData);
        }
        else showToast('missing');
    }

    const prevStep = () => {
        if (step === 3) {
            setFormData((prevData) => ({
                ...prevData,
                config_name: ''
            }))
        }
        else if (step === 2) {
            setFormData((prevData) => ({
                ...prevData,
                sys_ids: [],
                sys_versions: [],
                combo_make: '',
                combo_model: '',
                combo_year: ''
            }))
        }
        //console.log(formData);
        setStep((prevStep) => prevStep - 1);
    }

    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    custom: {
                        duration: 3000,
                    }
                }}
                containerStyle={{
                    marginTop: '24px',
                }}
            />
            <div className="font-bold text-2xl mt-4 mb-8">Add Vehicle Configuration</div>
            <div className="relative">
                <div className="flex md:justify-end justify-center mb-4 mt-0 md:mb-0">
                    <button className="btn btn-sm lg:btn-md btn-circle md:absolute top-0 right-0" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    <ul className="steps">
                        <li className={step >= 1 ? 'step step-primary' : 'step'}>Select Vehicle</li>
                        <li className={step >= 2 ? 'step step-primary' : 'step'}>Choose Subsystem</li>
                        <li className={step === 3 ? 'step step-primary' : 'step'}>Configuration Summary</li>
                    </ul>
                </div>
            </div>
            <div className="divider my-10"></div> 
            <div className="mt-4">
                {step === 1 && <ConfigStep1 vehicleOptions={vehicleOptions} />}
                {step === 2 && <ConfigStep2 vehicleOptions={vehicleOptions} subsystems={subsystems} />}
                {step === 3 && <ConfigStep3 subsystems={subsystems} />}
            </div>
            <div className='join flex items-center justify-center my-16'>
                {step != 1 && (
                    <button type="button" className="btn btn-neutral join-item" onClick={prevStep} disabled={submitting}>
                        Back
                    </button>
                )}
                {step != 3 ? (
                    <button type="button" className={step === 1 ? "btn btn-primary" : "btn btn-primary join-item"} onClick={nextStep} disabled={submitting}>
                        Next
                    </button>
                ) : (
                    <button type="button" className={submitting ? 'btn' : "btn btn-primary join-item"} onClick={handleSubmit} disabled={submitting}>
                        {submitting ? (
                            <>
                                <span className="loading loading-spinner"></span>
                            </>
                        ) : 'Submit'}
                    </button>
                )}
            </div>
        </>
    )
}

export default FormConfig