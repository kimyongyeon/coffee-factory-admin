import { Alert, Button, Divider, Input, Space, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

/**
 * 호스트 네임을 받지 않으면, api 형식이 다르면 기존의 네임을 쓸 수 없어 부모에서 받을 수 밖에 없다.
 * 더 좋은 방법을 찾아야 한다. 
 */

// 사용방법
// <List colums={'객체넘기기'} pathName={'menu'} searchName={'상품검색'} />

const { Search } = Input;
interface Props {
  colums: any, // 필수
  pathName: string, // 필수
  hostName: string, // 필수 
  searchName?: string, // 선택
  regClick?: (e: any) => void,
  history?: any
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

  const hostName = props.hostName;
  const [data, setData] = useState([{}]);
  const [errorMsg, setErrorMsg] = useState('');
  const [pagination, setPagination] = useState({
    current: 1, pageSize: 10
  });
  const [loading, setLoading] = useState(false);
  const columns = props.colums;

  useEffect(() => {
    fetch({ pagination });
  }, [])

  const handleTableChange = (pagination: any, filters: any, sorter: { field: any; menu: any; }) => {
    fetch({
      sortField: sorter.field,
      sortmenu: sorter.menu,
      pagination,
      ...filters,
    });
  };

  const fetch = (params: any = {}) => {
    setLoading(true);
    axios({
      method: 'get',
      url: `${hostName}${props.pathName}`,
      responseType: 'json',
      timeout: 3000,
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

    }).catch(e => {
      console.error('error => ', e);
      setErrorMsg(e.message);
      setLoading(false);
    });
  };

  const onSearch = (value: any) => {
    if (value !== '') {
      axios({
        method: 'get',
        url: `${hostName}${props.pathName}/${value}`,
        responseType: 'json',
        data: '',
      }).then(function (resp: any) {
        console.log(resp.data.body);
        let menu = resp.data.body;
        menu.key = 1;
        setData([menu]);
        setPagination({
          ...pagination
        });

      });
    }
  };

  const onClickAllSearch = (e: any) => {
    fetch({ pagination });
  }

  function OkRender() {
    return <div>
      <Space direction="vertical">
        <Space>
          <Search placeholder={`${props.searchName} 검색`} size="large" onSearch={onSearch} />
          <Button onClick={onClickAllSearch}>전체조회</Button>
          <Button onClick={props.regClick}>등록</Button>
        </Space>
      </Space>
      <Divider dashed />
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        // @ts-ignore
        onChange={handleTableChange}
        size="middle"
      />

    </div>
  }

  function ErrorRender() {
    return <div>
      <Alert
        message='Error'
        description={errorMsg}
        type="error"
        showIcon
      />
    </div>
  }

  return (
    <div>
      {errorMsg.length > 0 ? <ErrorRender /> : <OkRender />}
    </div >
  )
}

export default index
