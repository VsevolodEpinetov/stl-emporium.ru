import { MultiSelect, createStyles } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  label: {
    fontSize: '0.875rem',
    marginBottom: '5px',
    fontWeight: '700'
  }
}));

const DropdownFilter = (
  {
    data
  }
) => {
  const { classes } = useStyles();
  return (
    <MultiSelect
      value={data.getter}
      onChange={data.setter}
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