import { Form, Input, Checkbox, Button, Space } from 'antd'
import layout from 'antd/lib/layout'
import axios from 'axios';
import React from 'react'
import { User, useUserState } from '../../recoil/login';


interface Props {
    history: any;
    user_id: string;
    password: string;
}



const index = (props: Props) => {

  const [userState, setUserState] = useUserState(); //userState =atom<User> ,해당 데이터들 관리
  //아톰의값을읽는 컴포넌트들은 암묵적으로 atom을 구독한다 그래서 아톰에 변화가 있으면
  //그아톰을 구독하는 모든 컴포넌트들이 재 랜더링 되는 결과가 발생한다.
  console.log('1111111111',userState)
  console.log('2222222222',setUserState)
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onClickSubmit = (e: any) => {
    const user = {
      user_id: userState?.user_id,
      password: userState?.password,
    };
    console.log('ididididididi',user.user_id);
    console.log('pwpwpwpwpwpwpwp',user.password);
    console.log('######',user);
    axios({
      method: 'post',
      url: 'http://localhost:8888/api/auth/login',
      responseType: 'json',
      data: user,
    }).then(function (resp: any) {
      alert('로그인하셨습니다');
      props.history.push('/');
    });
  }

  const onInputChange = (e: any) => {
    switch(e.target.name) {
        case 'userId':
          console.log('userState',{...userState});
          setUserState({...userState, user_id: e.target.value } ) // userState에 값을 저장한다 매번
            break;
        case 'password':
          console.log('userStatepassword',{...userState});
          setUserState({...userState, password: e.target.value});
            break;
       
    }
}


    return (
      <Space direction="vertical">
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
          Submit
        </Button>
      </Form.Item>

    </Form>
    </Space>
    )
}

export default index
