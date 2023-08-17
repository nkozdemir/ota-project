/* eslint-disable react/prop-types */
import { useContext, useState } from "react"
import Step1 from "./formSteps/Step1";
import Step2 from "./formSteps/Step2";
import Step3 from "./formSteps/Step3";
import Step4 from "./formSteps/Step4";
import FormDataContext from "./FormContext";
import axios from "axios";
import showToast from '../showToast'
import { Toaster } from 'react-hot-toast'

const headers = {
  'x-api-key': import.meta.env.VITE_API_KEY
}

const Form = ({ onClose, vehicleOptions, regionData, refreshData, vehicleConfigData, subsystems }) => {
    const { formData, setFormData } = useContext(FormDataContext);

    const [currentStep, setCurrentStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    const handleNext = () => {
        setCurrentStep(prevStep => prevStep + 1);
        //console.log(formData);
    }

    const handlePrev = () => {
        setCurrentStep(prevStep => prevStep - 1);
        //console.log(formData);
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        
        const requestBody = {
            campaign_name: formData.campaign_name,
            campaign_description: formData.campaign_desc,
            region_id: formData.regions.map(item => parseInt(item.id)),
            vehicle_sw_config_id: parseInt(formData.config.vehicle_sw_config_id),
            vehicle_id: parseInt(formData.vehicle_id),
            vin_number: formData.vehicle_vin
        }
        //console.log(requestBody);

        await axios
            .post(`${import.meta.env.VITE_API_BASE_URL}/createcampaign`, requestBody, { headers })
            .then(response => {
                //console.log(response);
                if (response.data.statusCode === 200) {
                    showToast('ok');
                    setTimeout(() => {
                        setSubmitting(false);
                        handleCloseForm();
                        refreshData();
                    }, 3000);
                }
                else {
                    showToast('err');
                    setSubmitting(false);
                }
            })
            .catch(error => {
                console.error('Error while adding configuration:', error);
                showToast('err');
                setSubmitting(false);
            })
    };

    const handleCloseForm = () => {
        setCurrentStep(1); 
        setFormData(null);
        onClose();
    };

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
            <div className="font-bold text-2xl mt-4 mb-8">Add New Campaign</div>
            <div className="relative">
                <div className="flex md:justify-end justify-center mb-4 mt-0 md:mb-0">
                    <button className="btn btn-sm lg:btn-md btn-circle md:absolute top-0 right-0" onClick={handleCloseForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    <ul className="steps">
                        <li className={currentStep >= 1 ? 'step step-primary' : 'step'}>Select Region</li>
                        <li className={currentStep >= 2 ? 'step step-primary' : 'step'}>Choose Configuration</li>
                        <li className={currentStep >= 3 ? 'step step-primary' : 'step'}>Add VIN</li>
                        <li className={currentStep === 4 ? 'step step-primary' : 'step'}>Campaign Summary</li>
                    </ul>
                </div>
            </div>
            <div className="divider my-10"></div> 
            <div className="mt-4">
                {currentStep === 1 && 
                    <Step1 
                        regionData={regionData}
                        onNext={handleNext}
                    />}
                {currentStep === 2 && 
                    <Step2 
                        vehicleConfigurations={vehicleConfigData}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        subsystems={subsystems}
                        vehicleOptions={vehicleOptions}
                    />}
                {currentStep === 3 && 
                    <Step3 
                        vehicleOptions={vehicleOptions}
                        onNext={handleNext}
                        onPrev={handlePrev} 
                    />}
                {currentStep === 4 && 
                    <Step4
                        onPrev={handlePrev}
                        onSubmit={handleSubmit} 
                        submitting={submitting}
                    />}
            </div>
        </>
    )
}

export default Form;