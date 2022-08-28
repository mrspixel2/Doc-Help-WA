import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';



const ClassificationTable = (props:any) => {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await Axios.post('http://localhost:5000/predict/getAll_predictions').then(
      res => {
        console.log(res);
        setloading(false);
        setstate(
          res.data.map(row => ({
            key: row._id,
            patient: row.patient,
            desease: row.desease,
            result: row.result,
            status: row.prediction_status
            
          }))
        );
      }
    );
  };

  const columns: ColumnsType = [
    {
      title: 'Patient Name',
      dataIndex: 'patient',
      key: 'patient',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Desease',
      dataIndex: 'desease',
      key: 'desease',
      responsive: ['md'],
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
      responsive: ['sm'],
      render: (result) => (
        result == 0 ? "Normal" : "Diagnosed"
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      responsive: ['sm'],
      render: (status) => (
        <Tag style={{ borderRadius: 15 }} color={status === 'success' ? '#b7ce63' : '#cec759'}>
          {status}
        </Tag>
      )
    },
  ];


  return(<Table columns={columns} dataSource={state} />)

 }

export default ClassificationTable;