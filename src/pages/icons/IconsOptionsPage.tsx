import React from 'react';

import { Card } from 'antd';
import { Icon } from '@ant-design/compatible';

import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';

const colors = ['#48bb78', '#336cfb', '#fc8b37', '#ed253d', '#ed64a6'];

const iconTypes = [
  'bell',
  'book',
  'bug',
  'bulb',
  'calculator',
  'build',
  'calendar',
  'camera',
  'car',
  'carry-out',
  'cloud',
  'code',
  'dislike',
  'environment',
  'experiment',
  'eye',
  'file',
  'filter',
  'fire',
  'flag',
  'folder',
  'folder-open'
];

const pageData: IPageData = {
  title: 'Icons options',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Home',
      route: 'dashboard'
    },
    {
      title: 'UI Kit ',
      route: 'dashboard'
    },
    {
      title: 'Icons Options'
    }
  ]
};

const IconsOptionsPage = () => {
  usePageData(pageData);

  const displayIcons = (icons, props) => (
    <div className='elem-list'>
      {icons.map((icon) => (
        <Icon key={icon} type={icon} {...props} />
      ))}
    </div>
  );

  const smallFZ = { fontSize: 16 };
  const mediumFZ = { fontSize: 20 };
  const largeFZ = { fontSize: 24 };

  const coloredIcons = (icons, props, colors) => (
    <div className='elem-list'>
      {icons.map((icon, index) => (
        <Icon
          key={icon}
          type={icon}
          theme='twoTone'
          twoToneColor={colors[index % colors.length]}
          {...props}
        />
      ))}
    </div>
  );

  return (
    <>
      <Card title='Default icons'>{displayIcons(iconTypes, null)}</Card>

      <Card title='Icon sizes'>
        <h6 className='section-title mt-0'>16px font size</h6>
        {displayIcons(iconTypes, { style: smallFZ })}

        <h6 className='section-title'>20px font size</h6>
        {displayIcons(iconTypes, { style: mediumFZ })}

        <h6 className='section-title'>24px font size</h6>
        {displayIcons(iconTypes, { style: largeFZ })}
      </Card>

      <Card title='Icon theme' className='mb-0'>
        <h6 className='section-title mt-0'>Outlined</h6>
        {displayIcons(iconTypes, { style: mediumFZ })}

        <h6 className='section-title'>Filled</h6>
        {displayIcons(iconTypes, { style: mediumFZ, theme: 'filled' })}

        <h6 className='section-title'>Two tones</h6>
        {displayIcons(iconTypes, { style: mediumFZ, theme: 'twoTone' })}

        <h6 className='section-title'>Two tones colored</h6>
        {coloredIcons(iconTypes, { style: mediumFZ }, colors)}
      </Card>
    </>
  );
};

export default IconsOptionsPage;
