import React, { useEffect, useState } from "react";
import Doughnut from "react-chartjs-2";


const KidneyPolarArea = () => {

    const [counts, setCounts] = useState([100, 200, 300]);
    const [labels, setLabels] = useState(["A", "B", "C"]);

    const valueSwitch = (param) => {
            switch (param) {
              case 0: return 'Cyst';
              case 1: return 'Normal';
              case 2: return 'Stone';
              case 3: return 'Tumor';
            }
    }


    const fetchData = async () => {
        const res = await fetch("http://localhost:5000/query/prediction_count_per_kidney_desease");
        const data = await res.json()
            .then(data => {
                setCounts(data.map((d) => d.count));
                setLabels(data.map((d) => valueSwitch(d._id)));
            });
        console.log(counts);
        return data;
    }

    useEffect(() => {

        fetchData();
    }, []);


    const d = {
        labels: labels,
        title: 'Predictions per desease',
        datasets: [
            {
                label: "Predictions per desease",
                type: 'pie',
                backgroundColor: ['rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)'],
                data: counts,
            },
        ],
    };


    return (
        <div>
            <Doughnut data={d} />
        </div>
    );
}

export default KidneyPolarArea;