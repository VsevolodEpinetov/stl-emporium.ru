import React, { useEffect, useState } from 'react';
import { Navbar, Image, Button, MediaQuery, createStyles, ScrollArea, Center, NavLink, Overlay } from "@mantine/core"
import { IconShoppingCart, } from '@tabler/icons-react'
import STLFilters from './filters/STLFilters';
const LINKS = require("../../data/links.json")

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
  navbarWrapper: {
    top: '70px',
    '@media (max-width: 1340px)': {
      top: '120px'
    },
    '@media (max-width: 1110px)': {
      top: '170px'
    },
    '@media (max-width: 768px)': {
      top: '70px'
    },
  }
}));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const CustomNavbar = ({ filtersOpened, cartSize, setFiltersOpened, menuOpened, getSelectedHeroes, loading, nullFilters, filtersLoading, newFilters }) => {
  const { classes } = useStyles();
  const [chosenImage, setChosenImage] = useState('');

  useEffect(() => {
    setChosenImage(getRandomInt(1, 17))
  }, [])

  const items = LINKS.map((link) => {
    const menuItems = link.links?.map((item) => (
      <NavLink key={item.link} label={item.label} component='a' href={item.link} classNames={{
        label: classes.linkStyle
      }} />
    ));

    if (menuItems) {
      return (
        <NavLink key={link.label} component='a' href={link.link} label={link.label} classNames={{
          label: classes.linkStyle
        }}>
          {menuItems}
        </NavLink>
      );
    }

    return (
      <NavLink key={link.label} component='a' href={link.link} label={link.label} classNames={{
        label: classes.linkStyle
      }} />
    );
  });

  items.push(<Button key='cart-button-for-menu' component='a' href='/cart' color="teal" leftIcon={<IconShoppingCart />} fullWidth size='lg'>Корзина ({cartSize})</Button>)

  return (
    <>
      <Navbar className={classes.navbarWrapper} p="md" hiddenBreakpoint="sm" hidden={!filtersOpened} width={{ sm: 200, lg: 300 }}
        style={{
          backgroundColor: '#141517',
          border: 'none',
          zIndex: '98',
          padding: !newFilters ? '0px' : 'f'
        }}>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Navbar.Section>
            <Center>
              <Image src="/logo.png" alt='logo' style={{ maxWidth: '200px' }} classNames={classes.logo} component='a' href='/' />
            </Center>
          </Navbar.Section>
        </MediaQuery>
        <Navbar.Section grow mt="md" component={ScrollArea}>
          {
            newFilters ?
              <STLFilters
                newFilters={newFilters}
                loading={loading}
                filtersLoading={filtersLoading}
                setFiltersOpened={setFiltersOpened}
                getSelectedHeroes={getSelectedHeroes}
                nullFilters={nullFilters}
              />
              :
              <Overlay color='#141517' style={{
                backgroundImage: `url(/bg-${chosenImage}.png)`,
                opacity: '10%',
                backgroundSize: 'cover'
              }}>
              </Overlay>
          }

        </Navbar.Section>
      </Navbar>

      <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!menuOpened} width={{ sm: 200, lg: 300 }} style={{ backgroundColor: '#141517', border: 'none', zIndex: '98' }}>
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Navbar.Section>
              <Center>
                <Image src="/logo.png" alt='logo' style={{ maxWidth: '200px' }} classNames={classes.logo} />
              </Center>
            </Navbar.Section>
          </MediaQuery>
          <Navbar.Section grow mt="md" component={ScrollArea}>
            {items}
          </Navbar.Section>
        </Navbar>
      </MediaQuery>
    </>
  );
};