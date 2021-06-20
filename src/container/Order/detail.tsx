import { Button, Form, Input, PageHeader, Space, DatePicker } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { TOrder, useOrderState } from  '../../recoil/order';
const { RangePicker } = DatePicker;

interface Props {
    history: any;
    location: any;
}

const Detail = (props: Props) => {

    const [orderState, setOrderState] = useOrderState();
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    useEffect(() => {
        const styleType = props.location.type;
        if (styleType !== 'R') {
            try {
                const payload: TOrder = props.location.item;
                setOrderState(payload);
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
        const order = {
            userId: orderState?.id,
            productId: orderState?.productId,
            startDateTime: orderState?.orderStartDate,
            endDateTime: orderState?.orderEndDate,
            orderState: orderState?.state
        };
        axios({
            method: 'post',
            url: 'http://coffee-oda.shop:3000/api/order',
            responseType: 'json',
            data: order,
        }).then(function (resp: any) {
            alert('등록 완료!');
            props.history.push('/order');
        });
    }

    const onChange = (dates: any[], dateStrings: any[]) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }

    const onInputChange = (e: any) => {
        switch(e.target.name) {
            case 'userId':
                setOrderState({...orderState, userId: orderState?.id } )
                break;
            case 'productId':
                setOrderState({...orderState, productId: orderState?.productId});
                break;
            case 'orderState':
                setOrderState({...orderState, state: orderState?.state});
                break;
        }
    }

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => props.history.goBack()}
                title="주문 상세"
                subTitle="주문 정보를 상세하게 조회 합니다."
            />
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                size={componentSize as SizeType}
            >
                <Form.Item label="아이디">
                    <Input name='userId' value={orderState?.userId} onChange={onInputChange} />
                </Form.Item>
                <Form.Item label="상품아이디">
                    <Input name='productId' value={orderState?.productId} onChange={onInputChange} />
                </Form.Item>
                <Form.Item label="주문일자">
                    <RangePicker
                        ranges={{
                            Today: [moment(), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                        }}
                        showTime
                        format="YYYYMMDDHHmmss"
                        // @ts-ignore
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item label="주문상태">
                    <Input name='orderState' value={orderState?.state} onChange={onInputChange} />
                </Form.Item>
                <Space>
                    <Button onClick={onClickEdit} disabled={!orderState?.id}>수정</Button>
                    <Button onClick={onClickDel} disabled={!orderState?.id}>삭제</Button>
                    <Button onClick={onClickReg} disabled={!!orderState?.id}>등록</Button>
                </Space>
            </Form>
        </div>
    )
}

export default Detail
