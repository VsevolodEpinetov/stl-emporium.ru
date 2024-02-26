import { MultiSelect } from '@mantine/core';
import React from 'react';


const DropdownFilter = (
  {
    data,
    filterName
  }
) => {
  return (
    <MultiSelect
      value={data.getter}
      onChange={(e) => { data.setter(filterName, e); }}
      data={data.data}
      searchable
      clearable
      disableSelectedItemFiltering
      label={data.label}
      style={{ margin: '15px 0' }}
    />
  );
};

export default DropdownFilter;