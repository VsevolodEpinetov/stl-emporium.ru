import { Checkbox } from '@mantine/core';
import React from 'react';

const SexFilter = (
  {data}
) => {
  return (
    <Checkbox.Group
      value={data.getter}
      onChange={(e) => { data.setter('sex', e); }}
      label="Пол (предположительный)"
    >
      <Checkbox value="m" label="Мужской" style={{marginBottom: '10px'}} />
      <Checkbox value="f" label="Женский" style={{marginBottom: '10px'}} />
      <Checkbox value="x" label="???" />
    </Checkbox.Group>
  );
};

export default SexFilter;