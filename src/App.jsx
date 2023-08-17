import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import axios from "axios";
import Data from "./components/Data"
import FormConfig from "./components/configComp/FormConfig";
import { ConfigFormDataProvider } from "./components/configComp/ConfigFormContext";
import Form from "./components/campaignComp/Form"
import { FormDataProvider } from "./components/campaignComp/FormContext";
import CampaignData from "./components/campaignComp/CampaignData";
import ConfigData from "./components/configComp/ConfigData";

const headers = {
  'x-api-key': import.meta.env.VITE_API_KEY
}

function App() {
  const [vehicleOptData, setVehicleOptData] = useState([]);
  const [vehicleConfigData, setVehicleConfigData] = useState([]);
  const [campaignData, setCampaignData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [subsysData, setSubsysData] = useState([]);

  const [showConfig, setShowConfig] = useState(false);
  const [showCamp, setShowCamp] = useState(false);

  const fetchVehicleOptData = () => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/getvehicleoptions`, {}, { headers })
      .then(response => {
        //console.log('vehicle options:', response);
        setVehicleOptData(response.data.body);
      })
      .catch(error => {
        console.error('Error getting vehicle options:', error);
      });
  }

  const fetchConfigData = () => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/getvehicleconfigurations`, {}, { headers })
      .then(response => {
          //console.log(response);
          setVehicleConfigData(response.data.body);
      })
      .catch(error => {
          console.error('Error getting vehicle configurations:', error);
      });
  }

  const fetchCampaignData = () => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/getcampaigns`, {}, { headers })
      .then(response => {
          //console.log('campaign data:', response.data.body);
          setCampaignData(response.data.body);
      })
      .catch(error => {
          console.error('Error getting campaigns:', error);
      });
  }

  const fetchRegionData = () => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/getregions`, {}, { headers })
      .then(response => {
          //console.log('region data:', response.data.body);
          setRegionData(response.data.body);
      })
      .catch(error => {
          console.error('Error getting regions:', error);
      });
  }

  const fetchSubsysData = () => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/getotasubsystems`, {}, { headers })
      .then(response => {
        //console.log('subsystems:', response);
        setSubsysData(response.data.body);
      })
      .catch(error => {
        console.error('Error getting subsystems:', error);
      });
  }

  useEffect(() => {
    fetchVehicleOptData();
    fetchConfigData();
    fetchCampaignData();
    fetchRegionData();
    fetchSubsysData();
  }, []) 

  const refreshData = () => {
    fetchCampaignData();
    fetchConfigData();
  }

  const closeConfig = () => {
    setShowConfig(false);
  }
  
  const openConfig = () => {
    setShowConfig(true);
  }

  const closeCamp = () => {
    setShowCamp(false);
  }
  
  const openCamp = () => {
    setShowCamp(true);
  }

  return (
    <div className="max-h-screen">
      <Navbar />
      {showConfig ? (
        <div className="p-4 my-16 mx-8">
          <ConfigFormDataProvider>
            <FormConfig 
              onClose={closeConfig} 
              subsystems={subsysData} 
              vehicleOptions={vehicleOptData} 
              fetchConfig={fetchConfigData} />
          </ConfigFormDataProvider>
        </div>
      ) 
      : showCamp ? (
        <div className="p-4 my-16 mx-8">
          <FormDataProvider>
            <Form 
              onClose={closeCamp} 
              vehicleOptions={vehicleOptData} 
              regionData={regionData} 
              refreshData={refreshData}
              vehicleConfigData={vehicleConfigData}
              subsystems={subsysData} 
              />
          </FormDataProvider>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-4 p-4 lg:pt-16 lg:mt-0 mt-8">
          <div className="p-4 lg:h-full">
            <Data 
              vehicleOptions={vehicleOptData} 
              campaigns={campaignData}
              regionData={regionData} />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:h-full">
            <div className="p-4">
              <ConfigData 
                vehicleOptions={vehicleOptData} 
                vehicleConfigs={vehicleConfigData} 
                startForm={openConfig}
                subsystems={subsysData} />
            </div>
            <div className="p-4">
              <CampaignData 
                vehicleOptions={vehicleOptData} 
                campaigns={campaignData} 
                regions={regionData}
                startForm={openCamp} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App