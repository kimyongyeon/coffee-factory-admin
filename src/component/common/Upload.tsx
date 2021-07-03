import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Uploader = () => {
    const props = {
        beforeUpload: (file: { type: string; name: any; }) => {
            if (file.type !== 'image/png') {
                message.error(`${file.name} is not a png file`);
            }
            return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
        },
        onChange: (info: { fileList: any; }) => {
            console.log(info.fileList);
        },
    };
    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>배너이미지 등록</Button>
        </Upload>
    );
};

export default Uploader;