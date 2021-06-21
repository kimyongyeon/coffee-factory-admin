import { Button, Form, Input, PageHeader, Space } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TMenu, useMenuState } from '../../recoil/menu';

interface Props {
  history: any;
  location: any;
}

const Detail = (props: Props) => {

  const [menuState, setMenuState] = useMenuState();
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    const styleType = props.location.type;
    if (styleType !== 'R') {
      try {
        const payload: TMenu = props.location.item;
        setMenuState(payload);
      } catch (e) {
        console.error(e);
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
    const menu = {
      menuId: menuState?.menuId,
      menuName: menuState?.menuName,
      useYn: 'Y',
      menuCheck: '1'
    };
    axios({
      method: 'post',
      url: 'http://coffee-oda.shop:3000/api/menu',
      responseType: 'json',
      data: menu,
    }).then(function (resp: any) {
      alert('등록 완료!');
      props.history.push('/menu');
    });
  }

  const onInputChange = (e: any) => {
    switch (e.target.name) {
      case 'menuId':
        setMenuState({ ...menuState, menuId: menuState?.menuId })
        break;
      case 'menuName':
        setMenuState({ ...menuState, menuName: menuState?.menuName });
        break;
      case 'useYn':
        setMenuState({ ...menuState, useYn: menuState?.useYn });
        break;
      case 'menuCheck':
        setMenuState({ ...menuState, menuCheck: menuState?.menuCheck });
        break;
    }
  }

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => props.history.goBack()}
        title="메뉴 상세"
        subTitle="메뉴 정보를 상세하게 조회 합니다."
      />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
      >
        <Form.Item label="메뉴아이디">
          <Input name='menuId' value={menuState?.menuId} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="메뉴명">
          <Input name='menuName' value={menuState?.menuName} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="사용유무">
          <Input name='useYn' value={menuState?.useYn} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="메뉴체크">
          <Input name='menuCheck' value={menuState?.menuCheck} onChange={onInputChange} />
        </Form.Item>
        <Space>
          <Button onClick={onClickEdit} disabled={!menuState?.id}>수정</Button>
          <Button onClick={onClickDel} disabled={!menuState?.id}>삭제</Button>
          <Button onClick={onClickReg} disabled={!!menuState?.id}>등록</Button>
        </Space>
      </Form>
    </div>
  )
}

export default Detail
