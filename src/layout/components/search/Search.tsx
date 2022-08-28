import React, { useState } from 'react';

import { AutoComplete, Input } from 'antd';
import { history } from '../../../redux/store';

import './Search.scss';

type Props = {
  data: { value: string; text: string }[];
  layout: 'vertical' | 'horizontal';
};

const Search = ({ data, layout = 'vertical' }: Props) => {
  const [text, setText] = useState('');

  const handleSelect = (value: string, option) => {
    const route = value.startsWith('/') ? value : `/${layout}/${value}`;
    history.push(route);
    setText(option.label);
  };

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <AutoComplete
      value={text}
      filterOption
      options={data}
      className='app-search'
      onChange={handleChange}
      onSelect={handleSelect}
    >
      <Input placeholder='Type to search' suffix={<span className='icofont icofont-search' />} />
    </AutoComplete>
  );
};

export default Search;
