import React from 'react';
import DefaultList from '../../component/common/DefaultList';

interface Props {
  history: any;
}

const index = (props: Props) => {

  const onClickEdit = (e: any, item: any) => {
    props.history.push({
      pathname: `menu/detail`,
      type: 'E',
      item: item
    });
  }

  // props 속성을 쓰는 변수는 부모에서 트리거를 걸어야 함.
  const onClickReg = (e: any) => {
    // alert('등록하기 버튼 클릭!');
    props.history.push({
      pathname: `menu/detail`,
      type: 'R'
    });
  }

  const columns = [
    {
      title: '메뉴아이디',
      dataIndex: 'menuId',
      key: 'menuId',
      width: '30%',
      render: (text: string, item: any) => 
      <a onClick={() => onClickEdit(this, item)}>{text}</a>
    },
    {
      title: '메뉴명',
      dataIndex: 'menuName',
      key: 'menuName',
      width: '30%',
    },
    {
      title: '사용유무',
      dataIndex: 'useYn',
      key: 'useYn',
      width: '20%',
    },
    {
      title: '메뉴체크',
      dataIndex: 'menuCheck',
      key: 'menuCheck',
    },
  ];

  return (
    <div>
      <DefaultList regClick={onClickReg} history={history} colums={columns} pathName={'menu'} searchName={'메뉴'} />
    </div>
  )
}

export default index
