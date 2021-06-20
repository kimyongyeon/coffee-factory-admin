import { Button, DatePicker, Input, Space, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const { Search } = Input;

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
      pathname: `order/detail`,
      type: 'E',
      item: item
    });
  }

  const columns = [
    {
      title: '아이디',
      dataIndex: 'userId',
      key: 'userId',
      width: '30%',
      render: (text: string, item: any) => <a onClick={() => onClickEdit(this, item)}>{text}</a>
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
      pathname: "order/detail",
      type: 'R'
    });
  }

  const onSearch = (value: any) => {
    if (value !== '') {
      axios({
        method: 'get',
        url: `http://coffee-oda.shop:3000/api/order/${value}`,
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
          <RangePicker showTime />
          <Search placeholder="유저아이디 검색" size="large"  onSearch={onSearch} />
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
