import React from 'react';
import { ActionIcon, Button, Group } from '@mantine/core';
import { IconRotateClockwise } from '@tabler/icons-react';

const FiltersButtonsGroup = (
  {
    setFiltersOpened,
    getSelectedHeroes,
    nullFilters,
    loading,
    isResetButtonDisabled
  }
) => {
  return (
    <Group spacing="sm" grow="true" style={{ marginTop: '15px' }}>
      <Button loading={loading} color="green" style={{ maxWidth: '100%' }} onClick={() => {
        setFiltersOpened((o) => !o)
        getSelectedHeroes();
      }}>
        Применить
      </Button>
      <ActionIcon disabled={isResetButtonDisabled} size='lg' color="red" variant="filled" style={{ maxWidth: '1.125rem' }} onClick={() => {
        setFiltersOpened((o) => !o)
        nullFilters();
      }}>
        <IconRotateClockwise size="1.125rem" />
      </ActionIcon>
    </Group>
  );
};

export default FiltersButtonsGroup;