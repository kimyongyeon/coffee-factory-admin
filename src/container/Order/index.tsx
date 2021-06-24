import { DatePicker, Input } from 'antd';
import React from 'react';
import PagingList from '../../component/common/PagingList';
const { Search } = Input;

const { RangePicker } = DatePicker;
interface Props {
  history: any
}

const index = (props: Props) => {

  const onClickEdit = (e: any, item: any) => {
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
      width: 200,
      render: (text: string, item: any) => <a onClick={() => onClickEdit(this, item)}>{text}</a>
    },
    {
      title: '제품아이디',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: '주문시작일자',
      dataIndex: 'startDateTime',
      key: 'startDateTime',
      width: 100,
    },
    {
      title: '주문종료일자',
      dataIndex: 'endDateTime',
      key: 'endDateTime',
      width: 100,
    },
    {
      title: '주문상태',
      dataIndex: 'orderState',
      key: 'orderState',
      width: 100,
    },
  ];

  const onClickReg = (e: any) => {
    props.history.push({
      pathname: "order/detail",
      type: 'R'
    });
  }

  return (
    <div>
      <PagingList
        regClick={onClickReg}
        history={history}
        colums={columns}
        pathName={'order'}
        searchName={'유저아이디 검색'}
        hostName={'http://coffee-oda.shop:3000/api/'}
      />
    </div>
  )
}

export default index
