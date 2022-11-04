
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
    title: 'Tuberculosis Predictor',
    fulFilled: true,
    breadcrumbs: [
        {
            title: 'Home',
            route: 'default-dashboard'
        },
        {
            title: 'Tuberculosis Predictor'
        }
    ]
};

const PredictorForm = () => {
    usePageData(pageData);
    const [form] = useForm();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    /*Form values variales*/
    const InitialValues = { patient: "", symptoms: [], report: "" };
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
        alert(Array.from(formValues.symptoms));
        Array.from(formValues.symptoms).forEach((symptom) => {
            formData.append('symptoms[]', symptom);
            console.log(formData.getAll("symptoms[]"))
        });
        
        console.log(typeof(formData.get('symptoms[]')));
        formData.append('report', formValues.report);
        fileList.forEach(file => {
            formData.append('img', file as RcFile);
        });
        setUploading(true);
        console.log(Array.from(formData));
        // You can use any AJAX library you like
        await fetch('http://localhost:5000/predict/tuberculosis', {
            method: 'POST',
            body: formData,
            credentials: "same-origin",
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

            <Card title='Fill in the form and provide the patient`s Torso MRI'>
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
                            placeholder='Select symptoms'
                            optionFilterProp='children'
                            mode='multiple'
                            filterOption={optionFilter}
                            onChange={(e) => {
                                setFormValues({ ...formValues, symptoms: e });
                                console.log(formValues)
                            }}
                            value={formValues.symptoms}
                        >
                            <Option value='coughing'>Coughing for three or more weeks</Option>
                            <Option value='coughing_blood'>Coughing up blood</Option>
                            <Option value='fever'>Fever for more than three weaks </Option>
                            <Option value='Chest_pain'>Chest_pain</Option>
                            <Option value='feelings_sickness'>Feelings of sickness</Option>
                            <Option value='feelings_weakness'>Feelings of weakness</Option>
                            <Option value='night_sweats'>Night sweats</Option>
                            <Option value='weight_loss'>Weight loss</Option>
                        </Select>

                    </Form.Item>
                    <Form.Item label='Doctor Report'>
                        <Input placeholder='Type report'
                        name='report'
                        onChange={handleChange}
                        value={formValues.report}
                         />
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




const TuberculosisPredictorPage = () => {
    const user = useGetUser();
    usePageData(pageData);
    return (
        <div className='stack' style={{ maxWidth: 690, margin: '0 auto' }}>
            <PredictorForm />
            <Divider />
        </div>
    );
};


export default TuberculosisPredictorPage;
