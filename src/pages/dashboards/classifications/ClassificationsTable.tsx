import { Button, Descriptions, List, message, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Modal from 'antd/lib/modal/Modal';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';



const ClassificationTable = (props: any) => {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  const [modaldata, setmodaldata] = useState([]);
  const key = 'updatable';

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    console.log(record);
    setmodaldata(record);
    setIsModalVisible(true);
  };

  const handleApproval = async () => {
    alert(modaldata['key'])
    console.log(JSON.stringify({ _id: modaldata['key'], approval: 1 }));
    await fetch('http://localhost:5000/predict/update_prediction_approval', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: modaldata['key'], approval: 1 }),
      credentials: "same-origin"
    })
      .then((res) => {

        console.log(res);
        message.loading({ content: 'Updating...', key });
        setTimeout(() => {
          message.success({ content: 'Prediction Approved Successfully!', key, duration: 2 });
        }, 1000);

      })
      .catch((err) => {
        message.error('Prediction update failed.');
        console.log(err);
      })
      .finally(() => {
        setIsModalVisible(false);
        getData();
      });
  };

  const handleDissaproval = async () => {
    alert(modaldata['key'])
    console.log(JSON.stringify({ _id: modaldata['key'], approval: 1 }));
    await fetch('http://localhost:5000/predict/update_prediction_approval', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: modaldata['key'], approval: 0 }),
      credentials: "same-origin"
    })
      .then((res) => {
        console.log(res);
        message.loading({ content: 'Updating...', key });
        setTimeout(() => {
          message.success({ content: 'Prediction Dissaproved Successfully!', key, duration: 2 });
        }, 1000);

      })
      .catch((err) => {
        message.error('Prediction update failed.');
        console.log(err);
      })
      .finally(() => {
        setIsModalVisible(false);
        getData();
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const approvalSwitch = (param) => {
    switch (param) {
      case 0:
        return 'Dissaproved';
      case 1:
        return 'Approved';
      default:
        return 'Pending';
    }
  }

  const approvalColor = (param) => {
    switch (param) {
      case 'Dissaproved':
        return '#B22222';
      case 'Approved':
        return '#b7ce63';
      default:
        return '#cec759';
    }
  }

  const valueSwitch = (param1, param2) => {
    switch (param1) {
      case 'Kidney':
        switch (param2) {
          case 0: return 'Diagnosed with Cyst';
          case 1: return 'Normal';
          case 2: return 'Diagnosed with Stone';
          case 3: return 'Diagnosed with Tumor';
        }
      default:
        switch (param2) {
          case 0: return 'Negative';
          case 1: return 'Positive';
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
            approval: row.approved,
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
      title: 'Approval',
      dataIndex: 'approval',
      key: 'approval',
      responsive: ['sm'],
      render: (approval) => (
        <Tag style={{ borderRadius: 15 }} color={approvalColor(approvalSwitch(approval))}>
          {approvalSwitch(approval)}
        </Tag>
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
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button danger loading={loading} onClick={handleDissaproval}>
            Dissaprove
          </Button>,
          <Button type="primary" loading={loading} onClick={handleApproval}>
            Approve
          </Button>
        ]}
      >
        <div>
          <Descriptions title="Diagnostic Informations" layout="vertical" bordered>
            <Descriptions.Item label="Patient Name:">{modaldata['patient']}</Descriptions.Item>
            <Descriptions.Item label="Desease:">{modaldata['desease']}</Descriptions.Item>
            <Descriptions.Item label="Result:">{valueSwitch(modaldata['desease'], modaldata['result'])}</Descriptions.Item>
            <Descriptions.Item label={modaldata['desease'] == 'Kidney' ? 'Probabilities (Cyst - Normal - Stone - Tumor):' : 'Probabilities (Negativity - Positivity):'}>
              <ul>{modaldata['probs']?.map((prob, index) => (
                <li key={index}>{prob}</li>
              ))}</ul></Descriptions.Item>
            <Descriptions.Item label="Doctors Report:">{modaldata['d_report']}</Descriptions.Item>
            <Descriptions.Item label="Symptoms:">
              <List
                bordered
                dataSource={modaldata['symptoms']}
                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Patient's MRI Scan">
              <div style={{textAlign: 'center'}}>
              <img width='400' src={modaldata['image_path'] as string} height='400' alt='avatar' />
              </div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>
    </>)

}

export default ClassificationTable;