import { MultiSelect, createStyles } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  label: {
    fontSize: '0.875rem',
    marginBottom: '5px',
    fontWeight: '700'
  }
}));

const DropdownFilter = (
  {
    data,
    filterName
  }
) => {
  const { classes } = useStyles();
  const [value, setValue] = useState();

  return (
    <MultiSelect
      value={data.getter}
      onChange={(e) => { data.setter(filterName, e); }}
      data={data.data}
      placeholder={data.placeholder}
      searchable
      clearable
      nothingFound={data.nothingFound}
      label={data.label}
      style={{ margin: '15px 0' }}
      classNames={{
        label: classes.label
      }}
    />
  );
};

export default DropdownFilter;