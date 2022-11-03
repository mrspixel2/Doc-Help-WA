import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Modal from 'antd/lib/modal/Modal';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';



const ClassificationTable = (props: any) => {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  const [modaldata, setmodaldata] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    console.log(record);
    setmodaldata(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const valueSwitch = (param1,param2) => {
    switch(param1) {
      case 'Kidney':
        switch(param2) {
          case 0 : return 'Diagnosed with Cyst';
          case 1 : return 'Normal';
          case 2 : return 'Diagnosed with Stone';
          case 3 : return 'Diagnosed with Tumor';
        }
      default:
        switch(param2) {
          case 0 : return 'Normal';
          case 1 : return param1;
        }
        
    }
  }


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await Axios.post('http://localhost:5000/predict/getAll_predictions').then(
      res => {
        console.log(res.data);
        setloading(false);
        setstate(
          res.data.map(row => ({
            key: row._id,
            patient: row.patient,
            desease: row.desease,
            image_path: row.image_path,
            symptoms: row.symptoms,
            d_report: row.d_report,
            result: row.result,
            probs: row.probs,
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


  return (
    <>
      <Table columns={columns}
        dataSource={state}
        onRow={(record) => ({
          onClick: () => { showModal(record) }
        })} />
      <Modal title="Diagnostic Informations"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}>
        
        <p>Patient: {modaldata['patient']}</p>
        <p>Desease : {modaldata['desease']}</p>
        <p>Result : {valueSwitch(modaldata['desease'],modaldata['result'])}</p>
        <p>Probabilities : {modaldata['probs']}</p>
        <p>Doctors report : {modaldata['d_report']}</p>
        <p>Symptoms :  
           {modaldata['symptoms']}
         </p>
         <img width='400' src={modaldata['image_path'] as string } height='400' alt='avatar' />

      </Modal>



    </>)

}

export default ClassificationTable;