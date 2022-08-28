import React, { useState } from 'react';
import { Button, Form, Input, Switch } from 'antd';
import PublicLayout from '../../layout/public/Public';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { navigateHome } from '../../utils/naviagate-home';
import axios from 'axios';

const { Item } = Form;


const SignUp = () => {
  /*Form values variales*/
  const InitialValues = { name: "", email: "",docid: "", password: "" };
  const [formValues, setFormValues] = useState(InitialValues);
  const [form] = useForm();

  /*Changes variables on input*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);

  }

  /*submit form onclick function*/
  const submitForm = async () => {
    console.log('Form submited')
    console.log(formValues)
    console.log("making request")
    axios.post('http://localhost:5000/user/signup',
                formValues
                ).then(res => {
                                console.log(formValues);
                                console.log("User Added succesfully")
                }).then(() => { 
                  window.location.href = "#/public/sign-in";

                })
    .catch(err => alert('Something went wrong'))
  }

  const signUp = () => {
    form
      .validateFields()
      .then(() => navigateHome())
      .catch(() => null);
  };


  return (
    <PublicLayout bgImg={`${window.origin}/content/register-page.jpg`}>
      <h4 className='mt-0 mb-1'>Sign up</h4>
      <p className='text-color-200'>Create your Account</p>

      <Form form={form} layout='vertical' className='mb-5' method="POST">
        <Item
          rules={[{
            required: true, message: <></>
          }]}>
          <Input name='name' onChange={handleChange}
            placeholder='Name'
            value={formValues.name} />
        </Item>

        <Item
          rules={[
            { required: true, message: <></> },
            { type: 'email', message: <></> }
          ]}
        >
          <Input name='email' onChange={handleChange} placeholder='Emailaddress' type='email' value={formValues.email} />
        </Item>
        <Item
          rules={[
            { required: true, message: <></> }
          ]}
        >
          <Input name='docid' onChange={handleChange} placeholder='Medical Order Registration Number' value={formValues.docid} />
        </Item>

        <Item rules={[{ required: true, message: <>Password is required</> }]}>
          <Input name='password' onChange={handleChange} placeholder='Password' type='password' value={formValues.password} />
        </Item>

        <div className='d-flex align-items-center mb-4'>
          <Switch defaultChecked /> <span className='ml-2'>I agree to the Terms and Privacy.</span>
        </div>

        <Button
          type='primary'
          onClick={submitForm}
          icon={<span className='icofont icofont-plus mr-2' style={{ fontSize: '1.2rem' }} />}
        >
          Register
        </Button>
      </Form>

      <p>
        Have an account? <Link to='sign-in'>Sign in!</Link>
      </p>
    </PublicLayout>
  );
};

export default SignUp;
