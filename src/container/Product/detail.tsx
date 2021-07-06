import { Button, Form, Input, PageHeader, Select, Space } from 'antd';
const { Option } = Select;
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Uploader from '../../component/common/Upload';
import { TProduct, useProductState } from '../../recoil/product';

interface Props {
    history: any;
    location: any;
}

const Detail = (props: Props) => {

    const [productState, setProductState] = useProductState();
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    useEffect(() => {
        const styleType = props.location.type;
        if (styleType !== 'R') {
            try {
                const payload: TProduct = props.location.item;
                setProductState(payload);
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

    const onSelUseYnChange = (item: any) => {
        setProductState({ ...productState, useYn: item.value });
    }
    const onSelShotYnChange = (item: any) => {
        setProductState({ ...productState, shotYn: item.value });
    }
    const onSelWhippingYnChange = (item: any) => {
        setProductState({ ...productState, whippingYn: item.value });
    }
    const onSelGbChange = (item: any) => {
        setProductState({ ...productState, hotIceGb: item.value });
    }
    const onSelCateChange = (item: any) => {
        setProductState({ ...productState, category: item.value });
    }

    const onChange = (e: any) => {

        switch (e.target.name) {
            case 'productId':
                setProductState({ ...productState, productId: e.target.value });
                break;
            case 'name':
                setProductState({ ...productState, name: e.target.value });
                break;
            case 'price':
                setProductState({ ...productState, price: e.target.value });
                break;
            case 'volume':
                setProductState({ ...productState, volume: e.target.value });
                break;
            case 'size':
                setProductState({ ...productState, size: e.target.value });
                break;
            case 'sort':
                setProductState({ ...productState, sort: e.target.value });
                break;
            // case 'imgUrl':
            //     setProductState({ ...productState, imgUrl: e.target.value });
            //     break;
            // case 'useYn':
            //     setProductState({ ...productState, useYn: e.target.value });
            //     break;
            // case 'gb':
            //     setProductState({ ...productState, hotIceGb: e.target.value });
            //     break;
            // case 'whipping':
            //     setProductState({ ...productState, whippingYn: e.target.value });
            //     break;
            // case 'shot':
            //     setProductState({ ...productState, shotYn: e.target.value });
            //     break;
            // case 'category':
            //     setProductState({ ...productState, category: e.target.value });
            //     break;
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
                    <Input name="productId" value={productState?.productId} onChange={onChange} placeholder='PR0001'
                        style={{ width: 250 }} />
                </Form.Item>
                <Form.Item label="상품명">
                    <Input name="name" value={productState?.name} onChange={onChange} placeholder='아메리카노' style={{ width: 250 }} />
                </Form.Item>
                <Form.Item label="가격">
                    <Input name="price" value={productState?.price} onChange={onChange} placeholder='숫자만 입력하세요.' style={{ width: 250 }} />
                </Form.Item>
                <Form.Item label="용량">
                    <Input name="volume" value={productState?.volume} onChange={onChange} placeholder='숫자만 입력하세요.' style={{ width: 250 }} />
                </Form.Item>
                <Form.Item label="크기">
                    <Input name="size" value={productState?.size} onChange={onChange} placeholder='숫자만 입력하세요.' style={{ width: 250 }} />
                </Form.Item>
                <Form.Item label="정렬">
                    <Input name="sort" value={productState?.sort} onChange={onChange} placeholder='숫자만 입력하세요.' style={{ width: 250 }} />
                </Form.Item>
                <Form.Item label="커피사진">
                    {/* <Input name="imgUrl" value={productState?.imgUrl} onChange={onChange} /> */}
                    <Uploader name='커피 사진업로드' />
                </Form.Item>
                <Form.Item label="사용유무">
                    {/* <Input name="useYn" value={productState?.useYn} onChange={onChange} /> */}
                    <Select
                        labelInValue
                        // @ts-ignore
                        defaultValue={{ value: 'Y' }}
                        style={{ width: 250 }}
                        onChange={onSelUseYnChange}
                    >
                        <Option value="Y">사용</Option>
                        <Option value="N">미사용</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="구분">
                    {/* <Input name="gb" value={productState?.hotIceGb} onChange={onChange} /> */}
                    <Select
                        labelInValue
                        // @ts-ignore
                        defaultValue={{ value: 'Y' }}
                        style={{ width: 250 }}
                        onChange={onSelGbChange}
                    >
                        <Option value="">구분</Option>
                        <Option value="HOT">핫</Option>
                        <Option value="ICE">아이스</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="휘핑">
                    {/* <Input name="whipping" value={productState?.whippingYn} onChange={onChange} /> */}
                    <Select
                        labelInValue
                        // @ts-ignore
                        defaultValue={{ value: 'Y' }}
                        style={{ width: 250 }}
                        onChange={onSelWhippingYnChange}
                    >
                        <Option value="Y">추가</Option>
                        <Option value="N">미추가</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="샷">
                    {/* <Input name="shot" value={productState?.shotYn} onChange={onChange} /> */}
                    <Select
                        labelInValue
                        // @ts-ignore
                        defaultValue={{ value: 'Y' }}
                        style={{ width: 250 }}
                        onChange={onSelShotYnChange}
                    >
                        <Option value="Y">추가</Option>
                        <Option value="N">미추가</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="카테고리">
                    {/* <Input name="category" value={productState?.category} onChange={onChange} /> */}
                    <Select
                        labelInValue
                        // @ts-ignore
                        defaultValue={{ value: 'coffee' }}
                        style={{ width: 250 }}
                        onChange={onSelCateChange}
                    >
                        <Option value="coffee">커피</Option>
                        <Option value="tea">차</Option>
                    </Select>
                </Form.Item>
                <Space>
                    <Button onClick={onClickEdit} disabled={!productState?._id}>수정</Button>
                    <Button onClick={onClickDel} disabled={!productState?._id}>삭제</Button>
                    <Button onClick={onClickReg} disabled={!!productState?._id}>등록</Button>
                </Space>
            </Form>
        </div>
    )
}

export default Detail
