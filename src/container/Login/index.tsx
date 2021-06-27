import { Form, Input, Checkbox, Button, Space } from 'antd'
import layout from 'antd/lib/layout'
import axios from 'axios';
import React, { useEffect } from 'react'
import { User, useUserState } from '../../recoil/login';


interface Props {
    history: any;
    user_id: string;
    password: string;
    isLogin : boolean;
    cookie : any;

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
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };
  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  useEffect(() => {
   if(localStorage.getItem('uzi') === '1'){
    setUserState({...userState, isLogin: true } ) 
   }else{
    setUserState({...userState, isLogin: false, cookie: ''} ) 
   }
      // if(userState?.isLogin === false || userState?.isLogin === undefined ){
     
      // }else if(userState?.isLogin === true){
      //   localStorage.setItem( 'uzi', 'true');
      //   setUserState({...userState, isLogin: true } ) 
      // }
  
  }, []);
  console.log('로그인전',userState)

  const onClickSubmit = (e: any) => {
    const user  = {
      user_id: userState?.user_id,
      password: userState?.password,
      isLogin : userState?.isLogin
    };
    axios({
      method: 'post',
      url: 'http://coffee-oda.shop:3000/api/auth/login',
      responseType: 'json',
      data: user,
    }).then(function (resp: any) {
      alert('로그인하셨습니다');
      localStorage.setItem( 'uzi', '1');
      console.log('쿠키쿠키쿠키', resp.data.token);
      setUserState({...userState, isLogin : true, cookie : resp.data.token});
     // setUserState({...userState, cookie : resp.Cookie});
      console.log('로그인후',userState)
      //props.history.push('/');
    });
  }

  const onInputChange = (e: any) => {
    switch(e.target.name) {
        case 'userId':
          setUserState({...userState, user_id: e.target.value } ) // userState에 값을 저장한다 매번
            break;
        case 'password':
          setUserState({...userState, password: e.target.value});
            break;
       
    }
}
console.log('랜더분기처리',userState?.isLogin);
if(!userState?.isLogin){
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
    }else{
      return(
      <div>로그 인중입니다.</div>
      )
    }
}

export default index
