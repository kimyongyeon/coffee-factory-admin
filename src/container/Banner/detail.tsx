import { Alert, Button, Form, Input, PageHeader, Space } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import environment from '../../config/environment';
import { TBanner, useBannerState } from '../../recoil/banner';

const env = environment.prd;
const hostName = env.host;
const portName = env.port;
const apiUrl = env.api();
const apiName = 'banner';

interface Props {
  history: any;
  location: any;
}

const Detail = (props: Props) => {

  const [bannerState, setBannerState] = useBannerState();
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    const styleType = props.location.type;
    if (styleType !== 'R') {
      try {
        const payload: TBanner = props.location.item;
        console.log('banner item => ', payload);
        setBannerState(payload);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  function resultAlert(msg: string) {
    return (
      <Alert message={msg} type="success" />
    )
  }

  const onClickEdit = (e: any) => {
    axios({
      method: 'put',
      url: `http://${hostName}:${portName}/api/${apiName}`,
      responseType: 'json',
      data: bannerState,
    }).then(function (resp: any) {
      resultAlert('수정 완료');
      props.history.push(`/${apiName}`);
    });
  }

  const onClickDel = (e: any) => {
    axios({
      method: 'delete',
      url: `http://${hostName}:${portName}/api/${apiName}/` + bannerState?.bannerId,
      responseType: 'json',
      data: {},
    }).then(function (resp: any) {
      resultAlert('삭제 완료');
      props.history.push(`/${apiName}`);
    });
  }

  const onClickReg = (e: any) => {
    axios({
      method: 'post',
      url: `http://${hostName}:${portName}/api/${apiName}`,
      responseType: 'json',
      data: bannerState,
    }).then(function (resp: any) {
      resultAlert('등록 완료');
      props.history.push(`/${apiName}`);
    });
  }

  const onInputChange = (e: any) => {
    switch (e.target.name) {
      case 'bannerId':
        setBannerState({ ...bannerState, bannerId: e.target.value });
        break;
      case 'name':
        setBannerState({ ...bannerState, name: e.target.value });
        break;
      case 'imgUrl':
        setBannerState({ ...bannerState, imgUrl: e.target.value });
        break;
      case 'width':
        setBannerState({ ...bannerState, width: e.target.value });
        break;
      case 'height':
        setBannerState({ ...bannerState, height: e.target.value });
        break;
      case 'location':
        setBannerState({ ...bannerState, location: e.target.value });
        break;
      case 'startDate':
        setBannerState({ ...bannerState, startDate: e.target.value });
        break;
      case 'endDate':
        setBannerState({ ...bannerState, endDate: e.target.value });
        break;
      case 'title':
        setBannerState({ ...bannerState, title: e.target.value });
        break;
      case 'description':
        setBannerState({ ...bannerState, description: e.target.value });
        break;
      case 'sort':
        setBannerState({ ...bannerState, sort: e.target.value });
        break;
      case 'deployYn':
        setBannerState({ ...bannerState, deployYn: e.target.value });
        break;
      case 'useYn':
        setBannerState({ ...bannerState, useYn: e.target.value });
        break;
    }
  }

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => props.history.goBack()}
        title="배너 상세"
        subTitle="배너 정보를 상세하게 조회 합니다."
      />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
      >
        <Form.Item label="배너아이디">
          <Input name='bannerId' value={bannerState?.bannerId} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="배너명">
          <Input name='name' value={bannerState?.name} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="이미지주소">
          <Input name='imgUrl' value={bannerState?.imgUrl} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="가로크기">
          <Input name='width' value={bannerState?.width} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="세로크기">
          <Input name='height' value={bannerState?.height} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="위치">
          <Input name='location' value={bannerState?.location} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="시작일자">
          <Input name='startDate' value={bannerState?.startDate} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="종료일자">
          <Input name='endDate' value={bannerState?.endDate} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="제목">
          <Input name='title' value={bannerState?.title} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="상세설명">
          <Input name='description' value={bannerState?.description} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="정렬">
          <Input name='sort' value={bannerState?.sort} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="게시유무">
          <Input name='deployYn' value={bannerState?.deployYn} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="사용유무">
          <Input name='useYn' value={bannerState?.useYn} onChange={onInputChange} />
        </Form.Item>
        <Space>
          <Button onClick={onClickEdit} disabled={!bannerState?.bannerId}>수정</Button>
          <Button onClick={onClickDel} disabled={!bannerState?.bannerId}>삭제</Button>
          <Button onClick={onClickReg} disabled={!!bannerState?.bannerId}>등록</Button>
        </Space>
      </Form>
    </div>
  )
}

export default Detail
