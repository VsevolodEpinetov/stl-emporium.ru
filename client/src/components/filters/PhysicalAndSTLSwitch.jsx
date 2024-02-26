import { SegmentedControl } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import React from 'react';

const PhysicalAndSTLSwitch = () => {
  const [chosenMode, setChosenMode] = useLocalStorage({ key: 'user-setting-mode', defaultValue: 'stl' })
  return (
    <SegmentedControl
      color="violet"
      data={[{ label: 'STL', value: 'stl' }, { label: 'Фигурки', value: 'physical' }]}
      value={chosenMode}
      onChange={setChosenMode}
      fullWidth
      size="sm"
      style={{ marginTop: '15px', marginBottom: '15px'}}
    />
  );
};

export default PhysicalAndSTLSwitch;