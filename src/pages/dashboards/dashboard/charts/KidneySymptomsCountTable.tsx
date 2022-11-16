import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';


const KidneySymptomsCountTable = () => {
    const [data, setData] = useState([]);

    const valueSwitch = (param) => {
        switch (param) {
          case 0: return 'Cyst';
          case 1: return 'Normal';
          case 2: return 'Stone';
          case 3: return 'Tumor';
        }
}

    const columns: ColumnsType = [
        {
            title: 'Kidney Disease',
            dataIndex: 'disease',
            key: 'disease',
            render: (text) => valueSwitch(text),
        },
        {
            title: 'Symptoms',
            dataIndex: 'symptoms',
            key: 'symptoms',
            render: (symptoms) => {
                return symptoms.map((symptom, index) => <div key={index} className='row'>{symptom.symptom}</div>);
            },
            responsive: ['md']
        },
        {
            title: 'Count',
            dataIndex: 'counts',
            key: 'count',
            render: (counts) => counts.map((count, index) => <div key={index} className='row'> {count.count} </div>),
            responsive: ['sm']
        },
        ];

    const fetchData = async () => {
        const res = await fetch("http://localhost:5000/query/symptoms_count_per_kidney_result");
        const data = await res.json()
            .then(data => {
                setData(data.map((d, index) => {
                    return {
                        key: index,
                        disease: d._id,
                        symptoms: d.symptoms,
                        counts: d.symptoms
                    }
                }))
            });
        console.log(data);
    }

    useEffect(() => {

        fetchData();
    }, []);

    return (
        <Table columns={columns} dataSource={data}></Table>
    )
}
export default KidneySymptomsCountTable