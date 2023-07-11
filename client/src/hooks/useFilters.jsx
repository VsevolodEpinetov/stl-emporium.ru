import { getFilters } from '@/utils/api';
import React, { useEffect, useMemo, useState } from 'react';

const useFilters = (filters) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);

  const filtersNamesList = Object.keys(filters);

  useEffect(() => {
    for (const filterName of filtersNamesList) {
      setSelectedFilters((prevData) => ({
        ...prevData,
        [filterName]: []
      }));
    }
  }, [])

  const updateFilter = async (type, value) => {
    setSelectedFilters((prevData) => ({
      ...prevData,
      [type]: value
    }));

    setData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        getter: value
      }
    }))
  };

  useEffect(() => {
    if (alreadyLoaded) {
      return;
    }

    for (const filterName of filtersNamesList) {
      if (!selectedFilters[filterName]) return;
    }

    const fetchFilterData = async (type) => {
      try {
        const response = await getFilters(type);

        setData((prevData) => ({
          ...prevData,
          [type]: {
            data: response,
            getter: selectedFilters[type],
            setter: updateFilter,
            ...filters[type].ui
          }
        }));
      } catch (error) {
        console.log(error);
      }
    };

    if (filtersNamesList.length > 0) {
      filtersNamesList.forEach((filterName) => {
        fetchFilterData(filterName);
      });
    }

    setAlreadyLoaded(true);
  }, [selectedFilters]);

  useEffect(() => {
    if (Object.keys(data).length === filtersNamesList.length) setLoading(false);
  }, [data])

  return [loading, data, selectedFilters];
};

export default useFilters;
