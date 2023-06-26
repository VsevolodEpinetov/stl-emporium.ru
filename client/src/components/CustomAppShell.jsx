import React, { useEffect, useState } from 'react';
import { CustomHeader } from './CustomHeader';
import { AppShell } from '@mantine/core';
import { CustomNavbar } from './CustomNavbar';
import { useLocalStorage } from '@mantine/hooks';

const CustomAppShell = ( {setLoading, getSelectedHeroes, filters = undefined, loading, nullFilters, chosenMode, setChosenMode, children} ) => {
  const [filtersOpened, setFiltersOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [shoppingCart, setShoppingCart] = useLocalStorage({ key: 'shopping-cart', defaultValue: [] })
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    setCartSize(shoppingCart.reduce((partial, item) => partial + item.amount, 0));
  }, [shoppingCart])

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={<CustomNavbar
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        filtersOpened={filtersOpened}
        setFiltersOpened={setFiltersOpened}
        setLoading={setLoading}
        getSelectedHeroes={getSelectedHeroes}
        filters={filters}
        cartSize={cartSize}
        loading={loading}
        nullFilters={nullFilters}
        chosenMode={chosenMode}
        setChosenMode={setChosenMode}
      />}
      header={<CustomHeader
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        filtersOpened={filtersOpened}
        setFiltersOpened={setFiltersOpened}
        withFilters={filters ? true : false}
        cartSize={cartSize}
      />}
    >
      {children}
    </AppShell>
  );
};

export default CustomAppShell;