import React, { useEffect, useState } from 'react';

import { Button, Input } from 'antd';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import ImageLoader from '../../../layout/components/patients/ImageLoader';
import { hasErrorFactory } from '../../../utils/hasError';

import { IAppointment } from '../../../interfaces/patient';

type Props = {
  appointment?: IAppointment;
  onSubmit: (appointment: IAppointment) => void;
  onCancel: () => void;
  submitText?: string;
};

const defaultSubmitText = 'Add Appointment';
const emptyAppointment = {
  date: '',
  doctor: '',
  email: '',
  fromTo: '',
  img: '',
  injury: '',
  name: '',
  number: '',
  from: '',
  to: ''
};

const appointmentSchema = Yup.object().shape({
  date: Yup.string().required(),
  doctor: Yup.string().required(),
  email: Yup.string().required(),
  injury: Yup.string().required(),
  name: Yup.string().required(),
  number: Yup.string().required(),
  from: Yup.string().required(),
  to: Yup.string().required()
});

const AppointmentForm = ({
  submitText = defaultSubmitText,
  appointment = emptyAppointment,
  onSubmit,
  onCancel
}: Props) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setValues,
    isValid,
    errors,
    touched,
    resetForm
  } = useFormik<IAppointment>({
    validationSchema: appointmentSchema,
    initialValues: appointment,
    onSubmit: (form) => {
      onSubmit({ ...form, fromTo: `${form.from} - ${form.to}`, img });
      resetForm();
    }
  });
  const [from, to] = values.fromTo.split('-');
  const [img, setImg] = useState(values.img);

  useEffect(() => {
    setValues({ ...values, from, to });
  }, [appointment]);

  const handleImageLoad = (image) => {
    setImg(image);
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const hasError = hasErrorFactory(touched, errors);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <ImageLoader onLoad={handleImageLoad} src={img} />
        </div>

        <div className='form-group'>
          <Input
            name='name'
            placeholder='Name'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.name}
            className={hasError('name')}
          />
        </div>

        <div className='form-group'>
          <Input
            defaultValue={values.doctor}
            placeholder='Doctor'
            onBlur={handleBlur}
            name='doctor'
            onChange={handleChange}
            className={hasError('doctor')}
          />
        </div>

        <div className='form-group'>
          <Input
            defaultValue={values.email}
            placeholder='Email'
            name='email'
            type='email'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('email')}
          />
        </div>

        <div className='form-group'>
          <Input
            defaultValue={values.date}
            placeholder='Date'
            name='date'
            onChange={handleChange}
            onBlur={handleBlur}
            className={hasError('date')}
          />
        </div>

        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <div className='form-group'>
              <Input
                name='from'
                placeholder='From'
                defaultValue={from}
                onChange={handleChange}
                onBlur={handleBlur}
                className={hasError('from')}
              />
            </div>
          </div>

          <div className='col-sm-12 col-md-6'>
            <div className='form-group'>
              <Input
                name='to'
                placeholder='To'
                defaultValue={to}
                onChange={handleChange}
                onBlur={handleBlur}
                className={hasError('to')}
              />
            </div>
          </div>
        </div>

        <div className='form-group'>
          <Input
            type='phone'
            name='number'
            onBlur={handleBlur}
            placeholder='Number'
            onChange={handleChange}
            defaultValue={values.number}
            className={hasError('number')}
          />
        </div>

        <div className='form-group'>
          <Input
            name='injury'
            placeholder='Injury'
            onChange={handleChange}
            defaultValue={values.injury}
            onBlur={handleBlur}
            className={hasError('injury')}
          />
        </div>

        <div className='d-flex justify-content-between buttons-list settings-actions'>
          <Button danger onClick={handleCancel}>
            Cancel
          </Button>

          <Button disabled={!isValid} type='primary' htmlType='submit'>
            {submitText}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AppointmentForm;
