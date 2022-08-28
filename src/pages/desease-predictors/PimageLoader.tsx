import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';

const PimageLoader = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file as RcFile);
        });
        setUploading(true);
        // You can use any AJAX library you like
        fetch('http://localhost:5000/predict/tuberculosis/', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
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

    return (
        <>
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
        </>
    );
};

export default PimageLoader;