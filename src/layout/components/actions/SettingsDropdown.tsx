import React from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const accountItems = [
  { text: 'Edit account', icon: 'icofont-ui-home', route: '/vertical/edit-account' },
  { text: 'User profile', icon: 'icofont-ui-user', route: '/vertical/user-profile' },
  { text: 'Calendar', icon: 'icofont-ui-calendar', route: '/vertical/events-calendar' },
  { text: 'Settings', icon: 'icofont-ui-settings', route: '/vertical/settings' }
];

const SettingsDropdown = () => {


  const Logout = async () => {
    axios.get('http://localhost:5000/user/signout',
    ).then(res => {
      console.log(res)
    })
      .catch(err => alert('Something went wrong'))
  }



  const accountMenu = (
    <Menu style={{ minWidth: '180px' }}>
      {accountItems.map((item, index) => (
        <Menu.Item className='action-item' key={index}>
          <NavLink className='d-flex w-100' to={item.route} replace>
            <span className={`icon mr-3 ${item.icon}`} />
            <span className='text'>{item.text}</span>
          </NavLink>

        </Menu.Item>
      ))}
      <Menu.Item className='action-item' key={5}>
        <NavLink className='d-flex w-100' onClick={Logout} to={'/public/sign-in'} replace>
          <span className={`icon mr-3 ${'icofont-logout'}`} />
          <span className='text'>Log Out</span>
        </NavLink>
      </Menu.Item>
    </Menu>

  );

  return (
    <Dropdown overlay={accountMenu} trigger={['click']} placement='bottomRight'>
      <div className='item'>
        <Avatar
          size={40}
          className='mr-1'
          src={`${window.location.origin}/content/user-40-2.jpg`}
        />
        <span className='icofont-simple-down' />
      </div>
    </Dropdown>
  );
};

export default SettingsDropdown;
