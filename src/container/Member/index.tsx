import { Table } from 'antd';
import axios from 'axios';
import React from 'react';

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

const getRandomuserParams = (params: any) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

class index extends React.Component {

  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination: any, filters: any, sorter: { field: any; order: any; }, extra: any) => {
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  fetch = (params: any = {}) => {
    this.setState({ loading: true });
    let self = this;
    // 1 : self 
    // 2 : $.prox(handler, this);
    // 3 : axios.bind(this);
    axios({
      method: 'get',
      url: 'http://coffee-oda.shop:3000/api/user',
      responseType: 'json',
      data: getRandomuserParams(params),
    }).then(function (resp: any) {
      console.log(resp);
      self.renderData(resp.data.body, params);
    });
  };

  renderData(data: string | any[], params: { pagination: any; }) {
    this.setState({
      loading: false,
      data: data,
      pagination: {
        ...params.pagination,
        total: data.length,
      },
    });
  }

  render() {
    const { data, pagination, loading } = this.state;
    return <Table
      columns={columns}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      // @ts-ignore
      onChange={this.handleTableChange}
    />;
  }
}
export default index;
