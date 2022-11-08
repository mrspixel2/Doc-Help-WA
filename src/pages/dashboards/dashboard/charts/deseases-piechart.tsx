// ./components/PieChart.js
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";


const DPieChart = () => {

  const [counts,setCounts] = useState([100,200,300]);
  const [labels,setLabels] = useState(["A","B","C"]);
  

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/predict/predictions_count_per_desease");
    const data = await res.json()
    .then(data => {
    setCounts(data.map((d) => d.count));
    setLabels(data.map((d) => d._id));
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
        backgroundColor: ['#2fa7ff', '#7cdb86', '#805aff'],
        borderColor: ['#2fa7ff', '#7cdb86', '#805aff'],
        data: counts,
      },
    ],
  };


  return (
    <div>
      <Pie data={d} />
    </div>
  );
};
export default DPieChart;
