import React, { useState } from 'react';

import { Button, Form, Input, Switch } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';

import PublicLayout from '../../layout/public/Public';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { navigateHome } from '../../utils/naviagate-home';
import axios from 'axios';

const { Item } = Form;

const SignIn = () => {
  const [form] = useForm();
  /*Form values variales*/
  const InitialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(InitialValues);

  /*Changes variables on input*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  }

  const login = async () => {
    form
      .validateFields()
      .then(() => {
        console.log('Form submited');
        console.log(formValues);
        console.log("making request");
        axios.post('http://localhost:5000/user/login',
          formValues
        ).then(res => {
          console.log(formValues);
          console.log("User Authenticated");
        }).then(() => {
          window.location.href = "#/vertical/default-dashboard";
        })
          .catch(err => alert('Email Or password is incorrect'))
      }
      )
      .catch(() => null);
  };

  return (
    <PublicLayout bgImg={`${window.origin}/content/login-page.jpg`}>
      <h4 className='mt-0 mb-1'>Login form</h4>

      <p className='text-color-200'>Login to access your Account</p>

      <Form form={form} layout='vertical' className='mb-4'>
        <Item  rules={[{ required: true, message: <></> }]}>
          <Input name='email' onChange={handleChange}  placeholder='Email' value={formValues.email} />
        </Item>
        <Item  rules={[{ required: true, message: <></> }]}>
          <Input name='password' onChange={handleChange}  placeholder='Password' type='password' value={formValues.password} />
        </Item>

        <div className='d-flex align-items-center mb-4'>
          <Switch defaultChecked /> <span className='ml-2'>Remember me</span>
        </div>

        <Button
          block={false}
          type='primary'
          onClick={login}
          htmlType='submit'
          icon={<LoginOutlined style={{ fontSize: '1.3rem' }} />}
        >
          Login
        </Button>
      </Form>
      <br />
      <p className='mb-1'>
        <a href='#'>Forgot password?</a>
      </p>

      <p>
        Don't have an account? <Link to='sign-up'>Sign up!</Link>
      </p>
    </PublicLayout>
  );
};

export default SignIn;
