import { Container, Divider, Group, Loader, Paper, ScrollArea, Skeleton, Title } from '@mantine/core';
import React, { useState } from 'react';
import PhysicalAndSTLSwitch from '../PhysicalAndSTLSwitch';
import FiltersButtonsGroup from '../FiltersButtonsGroup';
import DropdownFilter from '../DropdownFilter';
import SexFilter from '../SexFilter';
import classes from './STLFilters.module.css'

const STLFilters = ({
  loading,
  setFiltersOpened,
  getSelectedHeroes,
  nullFilters,
  newFilters,
  filtersLoading,
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
    <Container px='0'>
      <Title ref={refTitle} order={3}>Фильтры</Title>
      <PhysicalAndSTLSwitch />
      <Divider />
      {filtersLoading &&
        <>
          <Skeleton height={20} width='50%' mb='md' mt='md' />
          <Skeleton height={30} width='100%' />
          <Skeleton height={20} width='50%' mb='md' mt='md' />
          <Skeleton height={30} width='100%' />
          <Skeleton height={20} width='50%' mb='md' mt='md' />
          <Skeleton height={30} width='100%' />
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
    </Container>
  );
};

export default STLFilters;