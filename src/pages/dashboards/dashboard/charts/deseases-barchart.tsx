import React, { useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';


const d = [
    {
        name: 'Covid19',
        approved: 4000,
        rejected: 2400,
        amt: 2400
    },
    {
        name: 'Kidney',
        approved: 3000,
        rejected: 1398,
        amt: 2210
    },
    {
        name: 'Tuberculosis',
        approved: 2000,
        rejected: 9800,
        amt: 2290
    }
];

const SimpleBarChart = () => {

    const [counts, setCounts] = useState([{
        name: 'Covid19',
        approved: 4000,
        rejected: 2400,
        amt: 2400
    },
    {
        name: 'Kidney',
        approved: 3000,
        rejected: 1398,
        amt: 2210
    },
    {
        name: 'Tuberculosis',
        approved: 2000,
        rejected: 9800,
        amt: 2290
    }]);

    const fetchData = async () => {
        const res = await fetch("http://localhost:5000/query/approval_count_per_desease");
        const data = await res.json()
        .then(data => {
        setCounts(data.map((d) => {
            return {
                name: d._id,
                approved: d.approved,
                rejected: d.unapproved,
                total: d.approved + d.unapproved
            }
        }))
        });
        console.log(data);
      }
    
      useEffect(() => {
    
      fetchData();
      }, []);




    return (
        <ResponsiveContainer height={300} width={'100%'}>
            <BarChart
                width={200}
                height={100}
                data={counts}
                margin={{
                    top: 5
                }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='approved' fill='#8884d8' />
                <Bar dataKey='rejected' fill='#82ca9d' />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SimpleBarChart;