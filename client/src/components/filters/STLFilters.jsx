import { Divider, Loader, Title } from '@mantine/core';
import React from 'react';
import PhysicalAndSTLSwitch from './PhysicalAndSTLSwitch';
import FiltersButtonsGroup from './FiltersButtonsGroup';
import DropdownFilter from './DropdownFilter';
import SexFilter from './SexFilter';

const STLFilters = ({
  loading,
  setFiltersOpened,
  getSelectedHeroes,
  nullFilters,
  newFilters,
  filtersLoading
}) => {

  function areFiltersEmpty(filters) {
    for (const key in filters) {
      if (filters.hasOwnProperty(key) && filters[key].getter?.length > 0) {
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

      {filtersLoading &&
        <Loader />
      }

      {newFilters && !filtersLoading && Object.entries(newFilters).map(([key, value]) => {
        if (key !== 'sex') {
          return <DropdownFilter key={key} data={value} filterName={key}/>;
        }
        return null;
      })}

      {(newFilters.sex && !filtersLoading) ? <SexFilter data={newFilters.sex} /> : null }

      <FiltersButtonsGroup
        loading={loading}
        setFiltersOpened={setFiltersOpened}
        getSelectedHeroes={getSelectedHeroes}
        nullFilters={nullFilters}
        isResetButtonDisabled={/*areFiltersEmpty(newFilters)*/true}
      />
    </div>
  );
};

export default STLFilters;