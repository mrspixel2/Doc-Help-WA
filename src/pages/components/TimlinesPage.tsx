import React from 'react';

import { Card, Timeline } from 'antd';
import {
  ExperimentOutlined,
  MonitorOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons/lib';

import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';

const pageData: IPageData = {
  title: 'Vertical timeline',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'UI Kit',
      route: 'default-dashboard'
    },
    {
      title: 'Components',
      route: 'default-dashboard'
    },
    {
      title: 'Vertical timeline'
    }
  ]
};

const TimelinePage = () => {
  usePageData(pageData);

  return (
    <>
      <Card title='Default'>
        <Timeline className='ml-3 mt-4'>
          <Timeline.Item
            dot={
              <div className='timeline-head bg-color-indigo'>
                <UserOutlined className='text-contrast-500' />
              </div>
            }
          >
            <div className='d-flex flex-column'>
              <span className='h5'>Appointment</span>
              <span className='text-base text-color-100'>2m ago</span>
              <span className='item-desc'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate.
              </span>
            </div>
          </Timeline.Item>

          <Timeline.Item
            dot={
              <div className='timeline-head bg-color-pink'>
                <ExperimentOutlined className='text-contrast-500' />
              </div>
            }
          >
            <div className='d-flex flex-column'>
              <span className='h5'>Medication</span>
              <span className='text-base text-color-100'>2h ago</span>
              <span className='item-desc'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi
                veniam.
              </span>
            </div>
          </Timeline.Item>

          <Timeline.Item
            dot={
              <div className='timeline-head bg-color-yellow'>
                <UserAddOutlined className='text-contrast-500' />
              </div>
            }
          >
            <div className='d-flex flex-column'>
              <span className='h5'>New patient</span>
              <span className='text-base text-color-100'>Jul 10</span>
              <span className='item-desc'>Lorem ipsum dolor sit.</span>
            </div>
          </Timeline.Item>

          <Timeline.Item
            dot={
              <div className='timeline-head bg-color-orange'>
                <MonitorOutlined className='text-contrast-500' />
              </div>
            }
          >
            <div className='d-flex flex-column'>
              <span className='h5'>Examination</span>
              <span className='text-base text-color-100'>Jul 1</span>
              <span className='item-desc'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi
                veniam.
              </span>
            </div>
          </Timeline.Item>
        </Timeline>
      </Card>

      <Card title='With dots'>
        <Timeline className='ml-2'>
          <Timeline.Item color='blue'>
            <div className='d-flex flex-column'>
              <span className='h5'>Appointment</span>
              <span className='text-base text-color-100'>2m ago</span>
              <span className='item-desc'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate.
              </span>
            </div>
          </Timeline.Item>

          <Timeline.Item color='pink'>
            <div className='d-flex flex-column'>
              <span className='h5'>Medication</span>
              <span className='text-base text-color-100'>2h ago</span>
              <span className='item-desc'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi
                veniam.
              </span>
            </div>
          </Timeline.Item>

          <Timeline.Item color='yellow'>
            <div className='d-flex flex-column'>
              <span className='h5'>New patient</span>
              <span className='text-base text-color-100'>Jul 10</span>
              <span className='item-desc'>Lorem ipsum dolor sit.</span>
            </div>
          </Timeline.Item>

          <Timeline.Item color='orange'>
            <div className='d-flex flex-column'>
              <span className='h5'>Examination</span>
              <span className='text-base text-color-100'>Jul 1</span>
              <span className='item-desc'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi
                veniam.
              </span>
            </div>
          </Timeline.Item>
        </Timeline>
      </Card>

      <Card title='Rigth align'>
        <Timeline className='ml-2' mode='right'>
          <Timeline.Item color='blue'>
            <div className='d-flex flex-column'>
              <span className='h5'>Appointment</span>
              <span className='text-base text-color-100'>2m ago</span>
              <span className='item-desc'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate.
              </span>
            </div>
          </Timeline.Item>

          <Timeline.Item color='pink'>
            <div className='d-flex flex-column'>
              <span className='h5'>Medication</span>
              <span className='text-base text-color-100'>2h ago</span>
              <span className='item-desc'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi
                veniam.
              </span>
            </div>
          </Timeline.Item>

          <Timeline.Item color='yellow'>
            <div className='d-flex flex-column'>
              <span className='h5'>New patient</span>
              <span className='text-base text-color-100'>Jul 10</span>
              <span className='item-desc'>Lorem ipsum dolor sit.</span>
            </div>
          </Timeline.Item>

          <Timeline.Item color='orange'>
            <div className='d-flex flex-column'>
              <span className='h5'>Examination</span>
              <span className='text-base text-color-100'>Jul 1</span>
              <span className='item-desc'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi
                veniam.
              </span>
            </div>
          </Timeline.Item>
        </Timeline>
      </Card>

      <Card className='mb-0' title='Centered'>
        <Timeline className='ml-2 mt-4' mode='alternate'>
          <Timeline.Item
            dot={
              <div className='timeline-head bg-color-indigo color-indigo'>
                <UserOutlined className='text-contrast-500' />
              </div>
            }
          >
            <div className='d-flex flex-column mx-2'>
              <span className='h5'>Appointment</span>
              <span className='text-base text-color-100'>2m ago</span>
              <span className='item-desc'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate.
              </span>
            </div>
          </Timeline.Item>

          <Timeline.Item
            dot={
              <div className='timeline-head bg-color-pink color-pink'>
                <ExperimentOutlined className='text-contrast-500' />
              </div>
            }
          >
            <div className='d-flex flex-column mx-2'>
              <span className='h5'>Medication</span>
              <span className='text-base text-color-100'>2h ago</span>
              <span className='item-desc'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi
                veniam.
              </span>
            </div>
          </Timeline.Item>

          <Timeline.Item
            dot={
              <div className='timeline-head bg-color-yellow'>
                <UserAddOutlined className='text-contrast-500' />
              </div>
            }
          >
            <div className='d-flex flex-column mx-2'>
              <span className='h5'>New patient</span>
              <span className='text-base text-color-100'>Jul 10</span>
              <span className='item-desc'>Lorem ipsum dolor sit.</span>
            </div>
          </Timeline.Item>

          <Timeline.Item
            dot={
              <div className='timeline-head bg-color-orange'>
                <MonitorOutlined className='text-contrast-500' />
              </div>
            }
          >
            <div className='d-flex flex-column mx-2'>
              <span className='h5'>Examination</span>
              <span className='text-base text-color-100'>Jul 1</span>
              <span className='item-desc'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi
                veniam.
              </span>
            </div>
          </Timeline.Item>
        </Timeline>
      </Card>
    </>
  );
};

export default TimelinePage;
