import { Checkbox, createStyles } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  label: {
    fontSize: '0.875rem',
    marginBottom: '5px',
    fontWeight: '700'
  },
}));

const SexFilter = (
  {data}
) => {
  const { classes } = useStyles();
  return (
    <Checkbox.Group
      value={data.getter}
      onChange={(e) => { data.setter('sex', e); }}
      label="Пол (предположительный)"
      classNames={{
        label: classes.label
      }}
    >
      <Checkbox value="m" label="Мужской" />
      <Checkbox value="f" label="Женский" />
      <Checkbox value="x" label="???" />
    </Checkbox.Group>
  );
};

export default SexFilter;