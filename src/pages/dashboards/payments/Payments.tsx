import React, { useState } from 'react';

import { Button, Form, Input, Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import BillingTable from '../../medic/components/BillingTable';
import PageAction from '../../../layout/components/page-action/PageAction';

import { hasErrorFactory } from '../../../utils/hasError';
import { useGetPayments } from '../../../hooks/useGetBillings';
import { usePageData } from '../../../hooks/usePage';

import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  title: 'Payments',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Payments'
    }
  ]
};

const Item = Form.Item;

const paymentScheme = Yup.object({
  billNo: Yup.string().required(),
  patient: Yup.string().required(),
  doctor: Yup.string().required(),
  billDate: Yup.string().required(),
  charges: Yup.string().required(),
  tax: Yup.string().required(),
  discount: Yup.string().required(),
  total: Yup.string().required()
});

const PaymentForm = ({ onSubmit, onClose }) => {
  const { handleSubmit, handleChange, isValid, errors, touched, handleBlur } = useFormik<any>({
    initialValues: {},
    initialErrors: { empty: null },
    validationSchema: paymentScheme,
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    }
  });

  const hasError = hasErrorFactory(touched, errors);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Form layout='vertical'>
        <Item>
          <Input
            type='number'
            name='billNo'
            placeholder='Bill NO'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('billNo')}
          />
        </Item>

        <Item>
          <Input
            name='patient'
            placeholder='Patient'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('patient')}
          />
        </Item>

        <Item>
          <Input
            name='doctor'
            placeholder='Doctor'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('doctor')}
          />
        </Item>

        <Item>
          <Input
            name='billDate'
            placeholder='Date'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('billDate')}
          />
        </Item>

        <Item>
          <Input
            name='charges'
            placeholder='Charges'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('charges')}
          />
        </Item>

        <Item>
          <Input
            name='tax'
            placeholder='Tax'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('tax')}
          />
        </Item>

        <Item>
          <Input
            name='discount'
            placeholder='Discount'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('discount')}
          />
        </Item>

        <Item>
          <Input
            name='total'
            placeholder='Total'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('total')}
          />
        </Item>
      </Form>

      <div className='modal-footer d-flex justify-content-between mt-3'>
        <Button danger onClick={handleClose}>
          Cancel
        </Button>

        <Button htmlType='submit' disabled={!isValid} type='primary' onClick={() => handleSubmit()}>
          Add
        </Button>
      </div>
    </>
  );
};

const Payments = () => {
  const [visible, setVisibility] = useState<boolean>(false);
  const [billings, setBillings] = useGetPayments();
  usePageData(pageData);

  const handleSubmit = (payment) => {
    setBillings([payment, ...billings]);
  };

  const handleClose = () => setVisibility(false);

  return (
    <>
      <BillingTable billings={billings} type='none' pagination={{ hideOnSinglePage: true }} />
      <PageAction onClick={() => setVisibility(true)} icon='icofont-plus' type='primary' />

      <Modal
        title={<h5 className='m-0'>Add Payment</h5>}
        onCancel={handleClose}
        visible={visible}
        destroyOnClose
        footer={null}
      >
        <PaymentForm onSubmit={handleSubmit} onClose={handleClose} />
      </Modal>
    </>
  );
};

export default Payments;
