import { Button, DatePicker, Space, Table } from 'antd';
import { Input } from 'antd';
const { Search } = Input;
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;
interface Props {
    history: any
}

type pagination = {
    pageSize: number;
    current: number;
}

const getRandomuserParams = (params: { pagination: pagination }) => ({
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
});

const index = (props: Props) => {

    const [data, setData] = useState([{}]);
    const [pagination, setPagination] = useState({
        current: 1, pageSize: 10
    });
    const [loading, setLoading] = useState(false);

    const onClickEdit = (e: any, item: any) => {
        // alert('수정하기 버튼 클릭!')
        // const queryString = getPayLoadToQueryString(item);
        props.history.push({
            pathname: `product/detail`,
            type: 'E',
            item: item
        });
    }

    const columns = [
        {
            title: '상품코드',
            dataIndex: '_id',
            key: '_id',
            width: '30%',
            render: (text: string, item: any) => <a onClick={() => onClickEdit(this, item)}>{text}</a>
        },
        {
            title: '상품명',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        },
        {
            title: '가격',
            dataIndex: 'price',
            key: 'price',
            width: '20%',
        },
        {
            title: '용량',
            dataIndex: 'volume',
            key: 'volume',
        },
        {
            title: '크기',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: '정렬',
            dataIndex: 'sort',
            key: 'sort',
        },
        {
            title: '사용유무',
            dataIndex: 'useYn',
            key: 'useYn',
        },
    ];

    useEffect(() => {
        fetch({ pagination });
    }, [])

    const handleTableChange = (pagination: any, filters: any, sorter: { field: any; order: any; }) => {
        fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };

    const fetch = (params: any = {}) => {
        setLoading(true);
        axios({
            method: 'get',
            url: 'http://coffee-oda.shop:3000/api/product',
            responseType: 'json',
            data: getRandomuserParams(params),
        }).then(function (resp: any) {
            setLoading(false);
            const rows = resp.data.body.map((row: { key: any; _id: any; }) => {
                row.key = row._id;
                return row;
            });
            setData(rows);
            setPagination({
                ...params.pagination,
                total: resp.data.body.length
            });

        });
    };

    const onClickReg = (e: any) => {
        // alert('등록하기 버튼 클릭!');
        props.history.push({
            pathname: "product/detail",
            type: 'R'
        });
    }

    const onSearch = (value: any) => {
        if (value !== '') {
            axios({
                method: 'get',
                url: `http://coffee-oda.shop:3000/api/product/${value}`,
                responseType: 'json',
                data: '',
            }).then(function (resp: any) {
                console.log(resp.data.body);
                let order = resp.data.body;
                order.key = 1;
                setData([order]);
                setPagination({
                    ...pagination
                });

            });
        }
    };

    const onClickAllSearch = (e: any) => {
        fetch({ pagination });
    }

    return (
        <div>
            <Space direction="vertical">
                <Space>
                    <Search placeholder="상품 검색" size="large" onSearch={onSearch} />
                    <Button onClick={onClickAllSearch}>전체조회</Button>
                    <Button onClick={onClickReg}>등록</Button>
                </Space>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    // @ts-ignore
                    onChange={handleTableChange}
                />
            </Space>
        </div>
    )
}

export default index
