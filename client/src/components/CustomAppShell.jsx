import React, { useEffect, useState } from 'react';
import { CustomHeader } from './CustomHeader';
import { AppShell, createStyles } from '@mantine/core';
import { CustomNavbar } from './CustomNavbar';
import { useLocalStorage } from '@mantine/hooks';

  
const useStyles = createStyles((theme) => ({
  label: {
    fontSize: '0.875rem',
    marginBottom: '5px',
    fontWeight: '700'
  },
  logo: {
    maxWidth: '200px'
  },
  linkStyle: {
    fontSize: '1rem'
  },
  mainWrapper: {
    paddingTop: '50px',
    '@media (max-width: 1340px)': {
      paddingTop: '100px'
    },
    '@media (max-width: 1110px)': {
      paddingTop: '150px'
    },
    '@media (max-width: 768px)': {
      paddingTop: '50px'
    },
  }
}));

const CustomAppShell = ({ getSelectedHeroes, loading, nullFilters, chosenMode, setChosenMode, children, newFilters = undefined, filtersLoading }) => {
  const [filtersOpened, setFiltersOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [shoppingCart, setShoppingCart] = useLocalStorage({ key: 'shopping-cart', defaultValue: [] })
  const [cartSize, setCartSize] = useState(0);
  const { classes } = useStyles();

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
        getSelectedHeroes={getSelectedHeroes}
        cartSize={cartSize}
        loading={loading}
        nullFilters={nullFilters}
        chosenMode={chosenMode}
        setChosenMode={setChosenMode}
        newFilters={newFilters}
        filtersLoading={filtersLoading}
      />}
      header={<CustomHeader
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        filtersOpened={filtersOpened}
        setFiltersOpened={setFiltersOpened}
        withFilters={newFilters ? true : false}
        cartSize={cartSize}
      />}
    >
      <div className={classes.mainWrapper}>
        {children}
      </div>
    </AppShell>
  );
};

export default CustomAppShell;