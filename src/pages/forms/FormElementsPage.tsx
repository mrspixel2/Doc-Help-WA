import React, { useState } from 'react';
import {
  Alert,
  AutoComplete,
  Button,
  Card,
  Checkbox,
  Input,
  Radio,
  Rate,
  Select,
  Switch,
  Tag
} from 'antd';

import { NavLink } from 'react-router-dom';
import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';
import { BookOutlined, UserOutlined } from '@ant-design/icons/lib';

const { Option } = Select;

const options = [
  { label: 'Checkbox 1', value: '1' },
  { label: 'Checkbox 2', value: '2' },
  { label: 'Checkbox 3', value: '3' }
];

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
};

const pageData: IPageData = {
  title: 'Form elements',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Home',
      route: 'default-dashboard'
    },
    {
      title: 'UI Kit ',
      route: 'default-dashboard'
    },
    {
      title: 'Form elements'
    }
  ]
};

const FormElementsPage = () => {
  usePageData(pageData);

  const [dataSource, setDataSource] = useState([]);

  const handleSearch = (value) =>
    setDataSource(!value ? [] : [value, value + value, value + value + value]);

  const [radioValue, setRadioValue] = useState(1);

  const handleRadioChange = (e) => setRadioValue(e.target.value);

  return (
    <>
      <Card title='Inputs'>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <Input defaultValue='Value' placeholder='Enter your username' />
          </div>
          <div className='col-md-6 col-sm-12'>
            <Input
              defaultValue='With prefix'
              placeholder='Enter your username'
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </div>
        </div>

        <Alert
          className='mt-4'
          type='warning'
          message={''}
          showIcon
          description={
            <span>
              You can find more information about this component{' '}
              <NavLink to={'/vertical/inputs'}>on this page</NavLink>.
            </span>
          }
        />
      </Card>

      <Card title='Selects'>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <Select
              defaultValue='lucy'
              placeholder='Select a person'
              optionFilterProp='children'
              className='mb-2 mb-md-0'
            >
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
          </div>

          <div className='col-md-6 col-sm-12'>
            <Select
              defaultValue={['lucy']}
              placeholder='Select a person'
              optionFilterProp='children'
              mode='multiple'
            >
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
          </div>
        </div>
        <Alert
          className='mt-4'
          type='warning'
          message={''}
          showIcon
          description={
            <span>
              You can find more information about this component{' '}
              <NavLink to={'/vertical/selects'}>on this page</NavLink>.
            </span>
          }
        />
      </Card>

      <Card title='Autocompletes'>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <AutoComplete
              options={dataSource}
              placeholder='Input here'
              onSearch={handleSearch}
              className='mb-2 mb-md-0'
            />
          </div>
          <div className='col-md-6 col-sm-12'>
            <AutoComplete options={dataSource} onSearch={handleSearch}>
              <Input placeholder='Input here' className='custom' suffix={<BookOutlined />} />
            </AutoComplete>
          </div>
        </div>
        <Alert
          className='mt-4'
          type='warning'
          message={''}
          showIcon
          description={
            <span>
              You can find more information about this component{' '}
              <NavLink to={'/vertical/autocompletes'}>on this page</NavLink>.
            </span>
          }
        />
      </Card>

      <Card title='Checkboxes'>
        <Checkbox.Group options={options} defaultValue={['1']} />

        <Alert
          className='mt-4'
          type='warning'
          message={''}
          showIcon
          description={
            <span>
              You can find more information about this component{' '}
              <NavLink to={'/vertical/checkboxes'}>on this page</NavLink>.
            </span>
          }
        />
      </Card>

      <Card title='Radio'>
        <Radio.Group onChange={handleRadioChange} value={radioValue}>
          <Radio style={radioStyle} value={1}>
            First option
          </Radio>
          <Radio style={radioStyle} value={2}>
            Second option
          </Radio>
          <Radio style={radioStyle} value={3}>
            Third options
          </Radio>
          <Radio style={radioStyle} value={4}>
            Fourth options
          </Radio>
        </Radio.Group>

        <Alert
          className='mt-4'
          type='warning'
          message={''}
          showIcon
          description={
            <span>
              You can find more information about this component{' '}
              <NavLink to={'/vertical/radio-buttons'}>on this page</NavLink>.
            </span>
          }
        />
      </Card>

      <Card title='Switchers'>
        <div className='elem-list flex-column'>
          <div className='field-with-label'>
            <Switch />
            <span className='label'>Control 1</span>
          </div>

          <div className='field-with-label'>
            <Switch defaultChecked />
            <span className='label'>Control 2</span>
          </div>

          <div className='field-with-label'>
            <Switch disabled />
            <span className='label'>Control 3</span>
          </div>
        </div>

        <Alert
          className='mt-4'
          type='warning'
          message={''}
          showIcon
          description={
            <span>
              You can find more information about this component
              <NavLink to={'/vertical/switchers'}>on this page</NavLink>.
            </span>
          }
        />
      </Card>

      <Card title='Buttons'>
        <div className='elem-list'>
          <Button type='primary'>Default</Button>
          <Button>Secondary</Button>
          <Button danger>Danger</Button>
          <Button type='link'>Link</Button>
        </div>

        <Alert
          className='mt-4'
          type='warning'
          message={''}
          showIcon
          description={
            <span>
              You can find more information about this component{' '}
              <NavLink to={'/vertical/buttons'}>on this page</NavLink>.
            </span>
          }
        />
      </Card>

      <Card title='Tags'>
        <div className='elem-list'>
          <Tag>Default</Tag>
          <Tag color={'#336cfb'}>Accent</Tag>
          <Tag color={'#b7ce63'}>Success</Tag>
          <Tag color={'#64B5F6'}>Info</Tag>
          <Tag color={'#e9e165'}>Warning</Tag>
          <Tag color={'#ed5564'}>Error</Tag>
        </div>

        <Alert
          className='mt-4'
          type='warning'
          message={''}
          showIcon
          description={
            <span>
              You can find more information about this component{' '}
              <NavLink to={'/vertical/tags'}>on this page</NavLink>.
            </span>
          }
        />
      </Card>

      <Card title='Ratings' className='mb-0'>
        <Rate value={5} />

        <Alert
          className='mt-4'
          type='warning'
          message={''}
          showIcon
          description={
            <span>
              You can find more information about this component{' '}
              <NavLink to={'/vertical/ratings'}>on this page</NavLink>.
            </span>
          }
        />
      </Card>
    </>
  );
};

export default FormElementsPage;
