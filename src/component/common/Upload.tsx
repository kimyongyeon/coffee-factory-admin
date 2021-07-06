import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface Props {
    readonly name: string;
}

const Uploader = (props: Props) => {
    const _props = {
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
        <Upload {..._props} >
            <Button icon={<UploadOutlined />}>{props.name}</Button>
        </Upload>
    );
};

export default Uploader;
