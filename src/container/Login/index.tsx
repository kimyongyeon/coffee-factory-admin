import { Form, Input, Checkbox, Button } from 'antd'
import layout from 'antd/lib/layout'
import React from 'react'

interface Props {
    userId: string;
    password: string;
}

const index = (props: Props) => {
    return (
        <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>


    </Form>
    )
}

export default index
