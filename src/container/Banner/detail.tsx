import { Alert, Button, DatePicker, Form, Input, notification, PageHeader, Select, Space } from 'antd';
const { Option } = Select;
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Uploader from '../../component/common/Upload';
import environment from '../../config/environment';
import { TBanner, useBannerState } from '../../recoil/banner';
import 배너 from './cnst';
// 환경변수 관련된 작업을 여기서 설정한다. 
// 이 부분을 공통으로 빼야 하는데 어떻게 하면 더 좋을까? 
// 계속 업무로직에서 반복되는것도 아쉬운 부분이다. 
const env = environment.prd;
const hostName = env.host;
const portName = env.port;
// const apiUrl = env.api();
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
    } else {
      setBannerState({}); // 원래는 초기화 작업 없이도 비어 있었는데 왜 채워져서 오는지 모르겠다. 
    }
  }, []); // []배열을 넘기면 최초 한번만 호출 한다. 

  const openNotificationWithIcon = (type: string, msg: string) => {
    // @ts-ignore
    notification[type]({
      message: 배너.알람.제목,
      description:
        msg,
    });
  };

  const onClickEdit = (e: any) => {
    axios({
      method: 'put',
      url: `http://${hostName}:${portName}/api/${apiName}`,
      responseType: 'json',
      data: bannerState,
    }).then(function (resp: any) {
      if (resp.data.code === '200') {
        openNotificationWithIcon('success', 배너.알람.성공.수정);
        props.history.push(`/${apiName}`);
      } else {
        openNotificationWithIcon('error', 배너.알람.실패);
      }
    }).catch(e => {
      console.error(e);
      openNotificationWithIcon('error', 배너.알람.실패);
    });
  }

  const onClickDel = (e: any) => {
    axios({
      method: 'delete',
      url: `http://${hostName}:${portName}/api/${apiName}/` + bannerState?.bannerId,
      responseType: 'json',
      data: {},
    }).then(function (resp: any) {
      if (resp.data.code === '200') {
        openNotificationWithIcon('success', 배너.알람.성공.삭제);
        props.history.push(`/${apiName}`);
      } else {
        openNotificationWithIcon('error', 배너.알람.실패);
      }
    }).catch(e => {
      console.error(e);
      openNotificationWithIcon('error', 배너.알람.실패);
    })
  }

  const onClickReg = (e: any) => {
    axios({
      method: 'post',
      url: `http://${hostName}:${portName}/api/${apiName}`,
      responseType: 'json',
      data: { ...bannerState, _id: undefined },
    }).then(function (resp: any) {
      if (resp.data.code === '200') {
        openNotificationWithIcon('success', 배너.알람.성공.등록);
        props.history.push(`/${apiName}`);
      } else {
        openNotificationWithIcon('error', 배너.알람.실패);
      }
    }).catch(e => {
      console.error(e);
      openNotificationWithIcon('error', 배너.알람.실패);
    });
  }

  const onSelDeployChange = (item: any) => {
    setBannerState({ ...bannerState, deployYn: item.value });
  }
  const onSelUseYnChange = (item: any) => {
    setBannerState({ ...bannerState, useYn: item.value });
  }
  const onSelLocChange = (item: any) => {
    setBannerState({ ...bannerState, location: item.value });
  }
  const onDatePickStartChange = (date: any, dateString: any) => {
    setBannerState({ ...bannerState, startDate: dateString });
  }
  const onDatePickEndChange = (date: any, dateString: any) => {
    setBannerState({ ...bannerState, endDate: dateString });
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
      // case 'location':
      //   setBannerState({ ...bannerState, location: e.target.value });
      //   break;
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
    }
  }

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => props.history.goBack()}
        title={배너.헤더}
        subTitle={배너.서브헤더}
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
          <Input name='bannerId' value={bannerState?.bannerId} onChange={onInputChange} placeholder='배너아이디는 BN형식을 준수하자.' />
        </Form.Item>
        <Form.Item label="배너명">
          <Input name='name' value={bannerState?.name} onChange={onInputChange} placeholder='배너명은 관리차원에서 등록하자.' />
        </Form.Item>
        <Form.Item label="제목">
          <Input name='title' value={bannerState?.title} onChange={onInputChange} placeholder='배너제목은 화면에 표시되는 영역'/>
        </Form.Item>
        <Form.Item label="상세설명">
          <Input name='description' value={bannerState?.description} onChange={onInputChange} placeholder='배너상세설명은 화면에 표시되는 영역'/>
        </Form.Item>
        <Form.Item label="이미지주소">
          {/* <Input name='imgUrl' value={bannerState?.imgUrl} onChange={onInputChange} placeholder='이미지주소는 화면에 이미지로 표현되는 부분'/> */}
          <Uploader />
        </Form.Item>
        <Form.Item label="가로크기">
          <Input name='width' value={bannerState?.width} onChange={onInputChange} placeholder='가로크기는 200을 초과하면 안이쁘다.'/>
        </Form.Item>
        <Form.Item label="세로크기">
          <Input name='height' value={bannerState?.height} onChange={onInputChange} placeholder='세로크기는 50을 초과하면 안이쁘다.'/>
        </Form.Item>
        <Form.Item label="위치">
          <Select
            labelInValue
            // @ts-ignore
            defaultValue={{ value: 'TOP' }}
            style={{ width: 120 }}
            onChange={onSelLocChange}
          >
            <Option value="TOP">상</Option>
            <Option value="MIDDLE">중</Option>
            <Option value="BOTTOM">하</Option>
          </Select>
        </Form.Item>
        <Form.Item label="시작일자">
          <DatePicker onChange={onDatePickStartChange} />
        </Form.Item>
        <Form.Item label="종료일자">
          <DatePicker onChange={onDatePickEndChange} />
        </Form.Item>
        <Form.Item label="정렬">
          <Input name='sort' value={bannerState?.sort} onChange={onInputChange} placeholder='숫자만 등록 가능 합니다.' />
        </Form.Item>
        <Form.Item label="게시유무">
          <Select
            labelInValue
            // @ts-ignore
            defaultValue={{ value: 'Y' }}
            style={{ width: 120 }}
            onChange={onSelDeployChange}
          >
            <Option value="Y">사용</Option>
            <Option value="N">미사용</Option>
          </Select>
        </Form.Item>
        <Form.Item label="사용유무">
          <Select
            labelInValue
            // @ts-ignore
            defaultValue={{ value: 'Y' }}
            style={{ width: 120 }}
            onChange={onSelUseYnChange}
          >
            <Option value="Y">사용</Option>
            <Option value="N">미사용</Option>
          </Select>
        </Form.Item>
        <Space>
          <Button onClick={onClickEdit} disabled={!bannerState?._id}>{배너.수정}</Button>
          <Button onClick={onClickDel} disabled={!bannerState?._id}>{배너.삭제}</Button>
          <Button onClick={onClickReg} disabled={!!bannerState?._id}>{배너.등록}</Button>
        </Space>
      </Form>
    </div>
  )
}

export default Detail
