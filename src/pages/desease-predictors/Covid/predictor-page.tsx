
import React, { useState } from 'react';
import { Card, Divider, Form, Input, Select } from 'antd';
import { usePageData } from '../../../hooks/usePage';
import { useGetUser } from '../../../hooks/useGetUser';
import { IPageData } from '../../../interfaces/page';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useForm } from 'antd/lib/form/Form';

const Option = Select.Option;

const pageData: IPageData = {
    title: 'Covid19 Predictor',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Home',
            route: 'default-dashboard'
        },
        {
            title: 'Covid19 Predictor'
        }
    ]
};



const PredictorForm = () => {
    usePageData(pageData);
    const [form] = useForm();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    /*Form values variales*/
    const InitialValues = { patient: "", symptoms: [] };
    const [formValues, setFormValues] = useState(InitialValues);


    /*Changes variables on input*/
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);

    }

    /*Submits form*/
    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('patient', formValues.patient);
        formData.append('symptoms', JSON.stringify(formValues.symptoms));
        fileList.forEach(file => {
            formData.append('img', file as RcFile);
        });
        setUploading(true);
        console.log(Array.from(formData));
        // You can use any AJAX library you like
        await fetch('http://localhost:5000/predict/covid19', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then((res) => {
                setFileList([]);
                message.success('upload successfully.');
                alert(res.data);
                console.table(res);
            })
            .catch((err) => {
                message.error('upload failed.');
                console.log(err);

            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props: UploadProps = {
        onRemove: file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: file => {
            setFileList([...fileList, file]);

            return true;
        },
        fileList,
    };


    const optionFilter = (input, option) =>
        option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0;

    return (
        <>

            <Card title='Fill in the form and provide the patient`s Chest scan'>
                <Form form={form} layout='vertical'>
                    <Form.Item label='Patient'>
                        <Input
                            name='patient'
                            placeholder='Select Patient'
                            onChange={handleChange}
                            value={formValues.patient} />
                    </Form.Item>
                    <Form.Item label='Symptoms'>

                        <Select
                            showSearch
                            placeholder='Select Symptoms'
                            optionFilterProp='children'
                            mode='multiple'
                            filterOption={optionFilter}
                            onChange={(e) => {
                                setFormValues({ ...formValues, symptoms: e });
                                console.log(formValues)
                            }}
                            value={formValues.symptoms}
                        >
                            <Option value='Difficulty breathing or shortness of breath'>Difficulty breathing or shortness of breath</Option>
                            <Option value='Loss of speech or mobility, or confusion'>Loss of speech or mobility, or confusion</Option>
                            <Option value='fever'>Fever </Option>
                            <Option value='Chest_pain'>Chest_pain</Option>
                            <Option value='loss of taste or smell'>loss of taste or smell</Option>
                            <Option value='headache'>headache</Option>
                            <Option value='sore throat'>sore throat</Option>
                            <Option value='aches and pains'>aches and pains</Option>
                            <Option value='diarrhoea'>diarrhoea</Option>
                            <Option value='a rash on skin, or discolouration of fingers or toes'>a rash on skin, or discolouration of fingers or toes</Option>
                        </Select>

                    </Form.Item>
                    <Form.Item label='Condition'>
                        <Input placeholder='Write noticable conditions here' />
                    </Form.Item>
                    <Form.Item label='Doctor Report'>
                        <Input placeholder='Type report' />
                    </Form.Item>
                    <Form.Item>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                        <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={fileList.length === 0}
                            loading={uploading}
                            style={{ marginTop: 16 }}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
};




const CovidPredictorPage = () => {
    const user = useGetUser();
    usePageData(pageData);
    return (
        <div className='stack' style={{ maxWidth: 690, margin: '0 auto' }}>
            <PredictorForm />
            <Divider />
        </div>
    );
};


export default CovidPredictorPage;
