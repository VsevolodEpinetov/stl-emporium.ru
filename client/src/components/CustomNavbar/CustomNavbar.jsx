import React, { useEffect, useState } from 'react';
import { Image, Button, Center, NavLink, Overlay, Container } from "@mantine/core"
import { IconShoppingCart, } from '@tabler/icons-react'
import STLFilters from '../filters/STLFilters/STLFilters';
const LINKS = require("../../../data/links.json")
import classes from './CustomNavbar.module.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const CustomNavbar = ({ filtersOpened, cartSize, setFiltersOpened, menuOpened, getSelectedHeroes, loading, nullFilters, filtersLoading, newFilters, headerHeight }) => {
  const [chosenImage, setChosenImage] = useState('');
  const [navbarHeight, setNavbarHeight] = useState(0)
  const [logoHeight, setLogoHeight] = useState(0)
  const refNavbar = React.useRef(null)
  const refLogo = React.useRef(null)

  useEffect(() => {
    setChosenImage(getRandomInt(1, 17))
    setNavbarHeight(refNavbar.current.clientHeight)
    setLogoHeight(refLogo.current.clientHeight)
  }, [])

  const items = LINKS.map((link) => {
    const menuItems = link.links?.map((item) => (
      <NavLink key={item.link} label={item.label} component='a' href={item.link} />
    ));

    if (menuItems) {
      return (
        <NavLink key={link.label} component='a' href={link.link} label={link.label} >
          {menuItems}
        </NavLink>
      );
    }

    return (
      <NavLink key={link.label} component='a' href={link.link} label={link.label} />
    );
  });

  items.push(<Button key='cart-button-for-menu' component='a' href='/cart' color="teal" leftSection={<IconShoppingCart />} fullWidth size='lg'>Корзина ({cartSize})</Button>)

  return (
    <>
      <div
        style={{
          border: 'none',
          padding: !newFilters ? '0px' : '0'
        }}
        className={classes.navbarWrapper}
        ref={refNavbar}
      >
        <Container ref={refLogo}>
          <Center>
            <a href='/'>
              <Image src="/logo.png" alt='logo' style={{ maxWidth: '200px' }} />
            </a>
          </Center>
        </Container>
        <Container visibleFrom='sm'>
          {
            newFilters ?
              <STLFilters
                filtersHeight={navbarHeight - logoHeight - headerHeight}
                newFilters={newFilters}
                loading={loading}
                filtersLoading={filtersLoading}
                setFiltersOpened={setFiltersOpened}
                getSelectedHeroes={getSelectedHeroes}
                nullFilters={nullFilters}
                headerHeight={headerHeight}
              />
              :
              <Overlay color='#141517' style={{
                backgroundImage: `url(/bg-${chosenImage}.png)`,
                opacity: '10%',
                backgroundSize: 'cover',
                marginTop: logoHeight + headerHeight
              }}>
              </Overlay>
          }
        </Container>
        <Container hiddenFrom='sm'>
          {
            menuOpened ?
              <nav p="md" hiddenBreakpoint="sm" hidden={!menuOpened} width={{ sm: 200, lg: 300 }} >
                {items}
              </nav>
              :
              filtersOpened ?
              <STLFilters
                filtersHeight={navbarHeight - logoHeight - headerHeight}
                newFilters={newFilters}
                loading={loading}
                filtersLoading={filtersLoading}
                setFiltersOpened={setFiltersOpened}
                getSelectedHeroes={getSelectedHeroes}
                nullFilters={nullFilters}
                headerHeight={headerHeight}
                hidden={!filtersOpened}
              /> 
              : <></>
          }

        </Container>
      </div>
    </>
  );
};