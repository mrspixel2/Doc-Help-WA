import React from 'react';
import { NavLink } from 'react-router-dom';

import { Location } from 'history';
import { IMenuItemSub } from '../../../interfaces/main-menu';

import posed from 'react-pose';

import className from '../../../utils/class-names';

const isHorizontal = (layout: string) => window.innerWidth >= 992 && layout === 'horizontal';

type Props = {
  sub: IMenuItemSub[];
  title: string;
  onClick?: (routing: string) => void;
  location: Location;
  layout?: string;
  opened?: boolean;
};

const Sub = posed.div({
  closed: { height: 0, overflow: 'hidden' },
  open: { height: 'auto', overflow: 'auto' },
  transition: { ease: 'ease-in-out', duration: 200 }
});

const ItemWithSub = ({ location, title, layout, sub, opened, onClick }: Props) => {
  const subItemClass = (routing: string) =>
    className({
      'menu-item': true,
      active: routing === location.pathname.split('/')[2]
    });

  const itemSub = sub.map((item: IMenuItemSub, i: number) => (
    <li className={subItemClass(item.routing)} key={i}>
      <NavLink
        to={`/${item.layout || layout}/${item.routing}`}
        className='item-link'
        activeClassName='active'
        replace
      >
        <span className='link-text'>{item.title}</span>
      </NavLink>
    </li>
  ));

  const handleOnClick = () => {
    onClick(title);
  };

  return (
    <li className={`menu-item has-sub ${opened ? 'active' : ''}`} onClick={handleOnClick}>
      <span className='item-link'>
        <span className='link-text'>{title}</span>

        <span className='link-caret icofont icofont-thin-right' />
      </span>

      {isHorizontal(layout) ? (
        <ul className='sub' onClick={(e) => e.stopPropagation()}>
          {itemSub}
        </ul>
      ) : (
        <Sub onClick={(e) => e.stopPropagation()} pose={opened ? 'open' : 'closed'}>
          <ul className='sub'>{itemSub}</ul>
        </Sub>
      )}
    </li>
  );
};

export default ItemWithSub;
