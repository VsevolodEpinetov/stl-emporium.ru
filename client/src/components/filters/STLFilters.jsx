import { Divider, Loader, ScrollArea, Skeleton, Title } from '@mantine/core';
import React, { useState } from 'react';
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
  filtersLoading,
  filtersHeight,
  headerHeight
}) => {

  function areFiltersEmpty(filters) {
    for (const key in filters) {
      if (filters.hasOwnProperty(key) && filters[key].getter?.length > 0) {
        return false;
      }
    }
    return true;
  }

  const [titleHeight, setTitleHeight] = React.useState(0)
  const refTitle = React.useRef(null)

  React.useEffect(() => {
    setTitleHeight(refTitle.current.clientHeight)
  }, [])


  return (
    <div>
      <Title ref={refTitle} order={3} style={{ marginTop: '15px' }}>Фильтры</Title>
      <ScrollArea.Autosize type='always' h={filtersHeight - titleHeight - 16 - 15 - 20} offsetScrollbars scrollbarSize={6}>
        <PhysicalAndSTLSwitch />
        <Divider />

        <div>
          {filtersLoading &&
            <>
              <Skeleton height={20} width='50%' mb='md' mt='md' />
              <Skeleton height={50} width='100%' />
              <Skeleton height={20} width='50%' mb='md' mt='md' />
              <Skeleton height={50} width='100%' />
              <Skeleton height={20} width='50%' mb='md' mt='md' />
              <Skeleton height={50} width='100%' />
            </>
          }


          {newFilters && !filtersLoading && Object.entries(newFilters).map(([key, value]) => {
            if (key !== 'sex') {
              return <DropdownFilter key={key} data={value} filterName={key} />;
            }
            return null;
          })}

          {(newFilters.sex && !filtersLoading) ? <SexFilter data={newFilters.sex} /> : null}

          <FiltersButtonsGroup
            loading={loading}
            setFiltersOpened={setFiltersOpened}
            getSelectedHeroes={getSelectedHeroes}
            nullFilters={nullFilters}
            isResetButtonDisabled={/*areFiltersEmpty(newFilters)*/true}
          />
        </div>
      </ScrollArea.Autosize>
    </div>
  );
};

export default STLFilters;