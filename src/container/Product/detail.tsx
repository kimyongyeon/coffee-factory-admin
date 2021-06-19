import { Button, Form, Input, PageHeader, Space } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Props {
    _id: string;
    productId: string;
    name: string;
    price: string;
    volume: string;
    size: string;
    sort: string;
    imgUrl: string;
    useYn: string;
    hotIceGb: string;
    whippingYn: string;
    shotYn: string;
    category: string;

    history: any;
    location: any;
}

type Product = {
    _id: string;
    productId: string;
    name: string;
    price: string;
    volume: string;
    size: string;
    sort: string;
    imgUrl: string;
    useYn: string;
    hotIceGb: string;
    whippingYn: string;
    shotYn: string;
    category: string;
}

const Detail = (props: Props) => {

    const [id, setId] = useState('');
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [volume, setVolume] = useState('');
    const [size, setSize] = useState('');
    const [sort, setSort] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [useYn, setUseYn] = useState('');
    const [hotIceGb, setHotIceGb] = useState('');
    const [whippingYn, setWhippingYn] = useState('');
    const [shotYn, setShotYn] = useState('');
    const [category, setCategory] = useState('');

    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    useEffect(() => {
        const styleType = props.location.type;
        if (styleType !== 'R') {
            try {
                const payload: Product = props.location.item;
                setId(payload._id);
                setProductId(payload.productId);
                setName(payload.name);
                setPrice(payload.price);
                setVolume(payload.volume);
                setSize(payload.size);
                setSort(payload.sort);
                setImgUrl(payload.imgUrl);
                setUseYn(payload.useYn);
                setHotIceGb(payload.hotIceGb);
                setWhippingYn(payload.whippingYn);
                setShotYn(payload.shotYn);
                setCategory(payload.category);
            } catch (e) {
                console.log(e);
            }
        }
    }, []);

    const onClickEdit = (e: any) => {
        alert('수정 버튼 클릭!');
    }

    const onClickDel = (e: any) => {
        alert('삭제 버튼 클릭!');
    }

    const onClickReg = (e: any) => {
        alert('등록 버튼 클릭!');
        const product = {
        };
        axios({
            method: 'post',
            url: 'http://coffee-oda.shop:3000/api/product',
            responseType: 'json',
            data: product,
        }).then(function (resp: any) {
            alert('등록 완료!');
            props.history.push('/product');
        });
    }

    const onChange = (e: any) => {

        switch(e.target.name) {
            case 'productId':
                setProductId(e.target.value);
                break;
            case 'name':
                setName(e.target.value);
                break;
            case 'price':
                setPrice(e.target.value);
                break;
            case 'volume':
                setVolume(e.target.value);
                break;
            case 'size':
                setSize(e.target.value);
                break;
            case 'sort':
                setSort(e.target.value);
                break;
            case 'imgUrl':
                setImgUrl(e.target.value);
                break;
            case 'useYn':
                setUseYn(e.target.value);
                break;
            case 'gb':
                setHotIceGb(e.target.value);
                break;
            case 'whipping':
                setWhippingYn(e.target.value);
                break;
            case 'shot':
                setShotYn(e.target.value);
                break;
            case 'category':
                setCategory(e.target.value);
                break;
        }
    }
    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => props.history.goBack()}
                title="상품 상세"
                subTitle="상품 정보를 상세하게 조회 합니다."
            />
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                size={componentSize as SizeType}
            >
                <Form.Item label="상품코드">
                    <Input name="productId" value={productId} onChange={onChange} />
                </Form.Item>
                <Form.Item label="상품명">
                    <Input name="name" value={name} onChange={onChange} />
                </Form.Item>
                <Form.Item label="가격">
                    <Input name="price" value={price} onChange={onChange} />
                </Form.Item>
                <Form.Item label="용량">
                    <Input name="volume" value={volume} onChange={onChange} />
                </Form.Item>
                <Form.Item label="크기">
                    <Input name="size" value={size} onChange={onChange} />
                </Form.Item>
                <Form.Item label="정렬">
                    <Input name="sort" value={sort} onChange={onChange} />
                </Form.Item>
                <Form.Item label="커피사진">
                    <Input name="imgUrl" value={imgUrl} onChange={onChange} />
                </Form.Item>
                <Form.Item label="사용유무">
                    <Input name="useYn" value={useYn} onChange={onChange} />
                </Form.Item>
                <Form.Item label="구분">
                    <Input name="gb" value={hotIceGb} onChange={onChange} />
                </Form.Item>
                <Form.Item label="휘핑">
                    <Input name="whipping" value={whippingYn} onChange={onChange} />
                </Form.Item>
                <Form.Item label="샷">
                    <Input name="shot" value={shotYn} onChange={onChange} />
                </Form.Item>
                <Form.Item label="카테고리">
                    <Input name="category" value={category} onChange={onChange} />
                </Form.Item>
                <Space>
                    <Button onClick={onClickEdit} disabled={!id}>수정</Button>
                    <Button onClick={onClickDel} disabled={!id}>삭제</Button>
                    <Button onClick={onClickReg} disabled={!!id}>등록</Button>
                </Space>
            </Form>
        </div>
    )
}

export default Detail
