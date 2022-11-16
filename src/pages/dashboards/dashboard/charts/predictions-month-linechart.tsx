import React, { useEffect, useState } from "react";
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
    Tooltip,
    Legend
} from 'recharts';

const PredictionsMonthLinechart = () => {
    const [d, setD] = useState([
        {
            month: 'jan',
            predictions: 4000,
        },
    ])

    const fetchData = async () => {
        const res = await fetch("http://localhost:5000/query/predictions_per_month");
        const data = await res.json()
            .then(data => {
                setD((Object.keys(data[0])).filter(key => key !==  "_id").map((key) => {
                    return {
                      month: key,
                      predictions: data[0][key]
                    }
                }))
            })
        console.log(data);
        console.log(d);
    }

    useEffect(() => {

        fetchData();
    }, []);


    return (
        <LineChart width={1100} height={400} data={d}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="predictions" stroke="#8884d8" />

        </LineChart>
    )
}

export default PredictionsMonthLinechart;