import { Divider, Title } from '@mantine/core';
import React from 'react';
import PhysicalAndSTLSwitch from './PhysicalAndSTLSwitch';
import FiltersButtonsGroup from './FiltersButtonsGroup';
import DropdownFilter from './DropdownFilter';
import SexFilter from './SexFilter';

const STLFilters = ({
  filters,
  loading,
  setFiltersOpened,
  getSelectedHeroes,
  nullFilters,
}) => {

  function areFiltersEmpty(filters) {
    for (const key in filters) {
      if (filters.hasOwnProperty(key) && filters[key].getter.length > 0) {
        return false;
      }
    }
    return true;
  }

  return (
    <div>
      <Title order={3} style={{ marginTop: '15px' }}>Фильтры</Title>
      <PhysicalAndSTLSwitch />
      <Divider />

      {Object.entries(filters).map(([key, value]) => {
        if (key !== 'sex') {
          return <DropdownFilter key={key} data={value} />;
        }
        return null;
      })}

      {filters.sex ? <SexFilter sexFilter={filters.sex} /> : null }

      <FiltersButtonsGroup
        loading={loading}
        setFiltersOpened={setFiltersOpened}
        getSelectedHeroes={getSelectedHeroes}
        nullFilters={nullFilters}
        isResetButtonDisabled={areFiltersEmpty(filters)}
      />
    </div>
  );
};

export default STLFilters;