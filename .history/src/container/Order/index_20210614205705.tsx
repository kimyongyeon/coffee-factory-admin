import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Space, Table } from 'antd';
import axios from 'axios';

const { RangePicker } = DatePicker;
interface Props {

}

const columns = [
  {
    title: '아이디',
    dataIndex: 'userId',
    key: 'userId',
    width: '30%',
  },
  {
    title: '제품아이디',
    dataIndex: 'productId',
    key: 'productId',
    width: '30%',
  },
  {
    title: '주문시작일자',
    dataIndex: 'startDateTime',
    key: 'startDateTime',
    width: '20%',
  },
  {
    title: '주문종료일자',
    dataIndex: 'endDateTime',
    key: 'endDateTime',
  },
  {
    title: '주문상태',
    dataIndex: 'orderState',
    key: 'orderState',
  },
];


const getRandomuserParams = (params: { pagination: { pageSize: any; current: any; }; }) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

const index = (props: Props) => {

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1, pageSize: 10
  });
  const [loading, setLoading] = useState(false);

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
      url: 'http://coffee-oda.shop:3000/api/order',
      responseType: 'json',
      data: getRandomuserParams(params),
    }).then(function (resp: any) {
      console.log(resp);

      setLoading(false);
      setData(resp.data.body);
      setPagination({
        ...params.pagination,
        total: resp.data.body.length
      });

    });
  };

  return (
    <div>
      <Space direction="vertical" size={12}>
        <RangePicker showTime style/>
        <Button>조회</Button>
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
