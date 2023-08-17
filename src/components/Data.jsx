/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend);

const Data = ({ vehicleOptions, campaigns, regionData }) => {
    const make_labels = [...new Set(vehicleOptions.map(item => item.vehicle_make))];
    const make_data = make_labels.map(make => {
        return vehicleOptions.filter(item => item.vehicle_make === make).length;
    })

    const model_labels_graph = [...new Set(vehicleOptions.map(item => `${item.vehicle_make} - ${item.vehicle_model}`))];
    const model_labels = [...new Set(vehicleOptions.map(item => item.vehicle_model))];
    const model_data = model_labels.map(model => {
        return vehicleOptions.filter(item => item.vehicle_model === model).length;
    })

    const camp_vehicle_ids = [...new Set(campaigns.map(item => item.vehicle_id))]; //err
    const camp_vehicle_labels = [...new Set(vehicleOptions
        .filter(item => camp_vehicle_ids.includes(item.vehicle_id))
        .map(({ vehicle_make, vehicle_model }) => `${vehicle_make} - ${vehicle_model}`))]
    const camp_vehicle_data = camp_vehicle_ids.map(id => {
        return campaigns.filter(item => item.vehicle_id === id).length;
    })

    const parseRegionIds = () => {
        let region_data = [];

        campaigns.map(({ region_id }) => {
            const cleanedString = region_id.replace(/\s/g, '').slice(1, -1);
            const arr = cleanedString.split(',').map(item => parseInt(item, 10));
            const data = regionData.filter(item => arr.includes(item.id))
            region_data = [...region_data, ...data]
        })

        return region_data;
    }

    const data = parseRegionIds();
    const regionsData = {};
    const countriesData = {};

    data.forEach(item => {
        if (!regionsData[item.region_name])
            regionsData[item.region_name] = 1;
        else
            regionsData[item.region_name]++;

        const label = `${item.region_name} - ${item.country_name}`;
        if (!countriesData[label])
            countriesData[label] = 1;
        else
            countriesData[label]++;
    });

    const colorPalette = [
        ['#FF5733', '#FFC300', '#36DBCA', '#4BC0C8', '#9966FF', '#FF6B6B', '#66FF66', '#FFD700', '#8A2BE2', '#20B2AA'],
        ['#F08080', '#E0FFFF', '#7FFFD4', '#D2B48C', '#FFA07A', '#98FB98', '#DDA0DD', '#FFD700', '#2E8B57', '#8B4513'],
        ['#F4A460', '#AFEEEE', '#9370DB', '#FF4500', '#00FF7F', '#6A5ACD', '#20B2AA', '#FF6347', '#32CD32', '#BA55D3'],
        ['#B0C4DE', '#3CB371', '#FF1493', '#778899', '#FFD700', '#4169E1', '#FF4500', '#8B008B', '#2E8B57', '#9932CC'],
        ['#87CEEB', '#FF6347', '#228B22', '#CD5C5C', '#FFA500', '#800080', '#4682B4', '#B22222', '#FFD700', '#6B8E23']
    ];
      
    const chartData = [
        {
            labels: make_labels,
            datasets: [
                {
                    data: make_data,
                    backgroundColor: colorPalette[0]
                },
            ],
        },
        {
            labels: model_labels_graph,
            datasets: [
                {
                    data: model_data,
                    backgroundColor: colorPalette[1]
                },
            ],
        },
        {
            labels: camp_vehicle_labels,
            datasets: [
                {
                    data: camp_vehicle_data,
                    backgroundColor: colorPalette[2]
                },
            ],
        },
        {
            labels: Object.keys(regionsData),
            datasets: [
                {
                    data: Object.values(regionsData),
                    backgroundColor: colorPalette[3]
                },
            ],
        },
        {
            labels: Object.keys(countriesData),
            datasets: [
                {
                    data: Object.values(countriesData),
                    backgroundColor: colorPalette[4]
                },
            ],
        },
    ]

    const labels = ['Vehicle Make', 'Vehicle Model', 'Campaign Vehicle Data', 'Campaign Region Data', 'Campaign Country Data']

    return (
        <>
            <div className="font-bold text-2xl mt-4 mb-8 mx-8">Data</div>
            <div className="divider m-8"></div> 
            <div className="flex flex-wrap items-center justify-center">
                <div className="grid md:grid-cols-2 md:grid-rows-3 grid-rows-5 grid-cols-1 gap-8">
                    {chartData.map((item, index) => (
                        <div key={index} className="p-4">
                            <p className="text-center">{labels[index]}</p>
                            <Pie data={item} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Data