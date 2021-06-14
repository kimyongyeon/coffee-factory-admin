import React, { useEffect, useState } from 'react'
import { DatePicker, Space, Table } from 'antd';
import axios from 'axios';

const { RangePicker } = DatePicker;
interface Props {

}

const columns = [
  {
    title: '이메일',
    dataIndex: 'email',
    key: 'email',
    width: '30%',
  },
  {
    title: '비밀번호',
    dataIndex: 'password',
    key: 'password',
    width: '30%',
  },
  {
    title: '프로필 이미지',
    dataIndex: 'img_url',
    key: 'img_url',
    width: '20%',
  },
  {
    title: '등록자',
    dataIndex: 'reg_writer',
    key: 'reg_writer',
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
      url: 'http://coffee-oda.shop:3000/api/user',
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
        <RangePicker showTime />
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
