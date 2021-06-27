import { Button, Checkbox, Form, Input, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUserState } from '../../recoil/login';

interface Props {
  history: any;
  user_id: string;
  password: string;
}

const index = (props: Props) => {
  const [userState, setUserState] = useUserState(); //userState =atom<User> ,해당 데이터들 관리
  //아톰의값을읽는 컴포넌트들은 암묵적으로 atom을 구독한다 그래서 아톰에 변화가 있으면
  //그아톰을 구독하는 모든 컴포넌트들이 재 랜더링 되는 결과가 발생한다.
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useEffect(() => {
    const isLoginStorage = localStorage.getItem('isLogin') || 'N';
    if (isLoginStorage === 'Y') {
      setUserState({...userState, isLogin: true});
    } else {
      setUserState({...userState, isLogin: false});
    }
    return () => {
    }
  }, []);

  const onClickSubmit = async (e: any) => {
    const user = {
      user_id: userState?.user_id,
      password: userState?.password,
    };
    let result = await axios({
      method: 'post',
      url: 'http://localhost:8888/api/auth/login',
      responseType: 'json',
      data: user,
    });
    if (result) {
      setUserState({...userState, isLogin: true});
      localStorage.setItem('isLogin', 'Y');
    }
  }

  const onInputChange = (e: any) => {
    switch (e.target.name) {
      case 'userId':
        setUserState({ ...userState, user_id: e.target.value }) // userState에 값을 저장한다 매번
        break;
      case 'password':
        setUserState({ ...userState, password: e.target.value });
        break;
    }
  }

  function LoginRender() {
    return <Space direction="vertical">
      <Form>
        <Form.Item label="아이디">

          {/* onInputChange 이벤트가 input값이 올때 이벤트발생 name을 가지고 간다 e.target.name */}
          {/* value에 아톰의 userState값이 들어간다  value 에 값을 담고 바로 이벤트*/}
          <Input name='userId' value={userState?.user_id} onChange={onInputChange} />
        </Form.Item>
        <Form.Item label="패스워드">
          <Input name='password' value={userState?.password} onChange={onInputChange} />
        </Form.Item>
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={onClickSubmit}>
            Submit  {!userState?.isLogin ? 'false' : 'true'}
          </Button>
        </Form.Item>

      </Form>
    </Space>
  }

  return (
    <>
      {!userState?.isLogin ? <LoginRender /> : props.history.push('/member') }
    </>
  )

}

export default index
