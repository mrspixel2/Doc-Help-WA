import React, { useEffect, useState } from "react";
import {
    Treemap,
    Tooltip
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {

    if (active && payload && payload.length) {
        return (
            <div className="treemap-custom-tooltip">
                <p>{`${payload[0].payload.root.name}`}</p>
                <p>{`${payload[0].payload.name} : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};


const SymptomsTreemap = () => {


    const [data, setData] = useState([{
        "name": "axis",
        "children": [
            {
                "name": "Axis",
                "size": 24593
            },
            {
                "name": "Axes",
                "size": 1302
            },
            {
                "name": "AxisGridLine",
                "size": 652
            },
        ]
    }])

    const fetchData = async () => {
        const res = await fetch("http://localhost:5000/query/symptoms_count");
        const data = await res.json()
            .then(data => {
                setData([{
                    "name": "axis",
                    "children": data.map((d) => {
                        return {
                            "name": d._id,
                            "size": d.count
                        }
                    })
                }])
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <Treemap
                width={730}
                height={250}
                data={data}
                dataKey="size"
                ratio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
            />
            <Tooltip content={<CustomTooltip active={true} payload={data} />}/>
        </>
    )

}

export default SymptomsTreemap;