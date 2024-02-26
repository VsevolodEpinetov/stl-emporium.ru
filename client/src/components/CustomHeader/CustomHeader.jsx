import React, { useEffect, useState } from 'react';
import { Burger, Container, Menu, Center, Group, ActionIcon, Button, Anchor } from "@mantine/core"
import { IconChevronDown, IconFilter, IconFilterEdit, IconShoppingCart } from '@tabler/icons-react';
const LINKS = require("../../../data/links.json")

import classes from './CustomHeader.module.css';

export const CustomHeader = ({ filtersOpened, cartSize, setFiltersOpened, menuOpened, setMenuOpened, withFilters, onHeightChange, toggleMobile }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const headerElement = document.getElementById('custom-header');
    if (headerElement) {
      const height = headerElement.offsetHeight;
      setHeaderHeight(height);
      if (typeof onHeightChange === 'function') {
        onHeightChange(height);
      }
    }
  }, [onHeightChange]);

  const items = LINKS.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} component='a' href={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
      >
        {link.label}
      </a>
    );
  });

  return (
    <div className={classes.header} id='custom-header'>
      <Container size="md" visibleFrom='sm'>
        <div className={classes.inner}>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Button
            key='cart-button-for-menu'
            component='a'
            href='/cart'
            color="teal"
            className={classes.cartButton}
            leftSection={<IconShoppingCart />}
          >
            <span>Корзина ({cartSize})</span>
          </Button>
        </div>
      </Container>
      <Container hiddenFrom="sm">
        <Group justify='space-between'>
          <Burger
            size="sm"
            mr="xl"
            onClick={() => {
              setMenuOpened((o) => !o)
              setFiltersOpened(false)
            }}
            opened={menuOpened}
          />
          <Anchor
            href='/'
            variant='text'
            c='gray'
            fw={700}
            fz={20}
          >
            STLEmporium
          </Anchor>
          <ActionIcon size="xl" color='white' variant="transparent" style={{ opacity: withFilters ? '100' : '0', cursor: withFilters ? 'pointer' : 'default' }}
            onClick={(e) => {
              if (withFilters) {
                setFiltersOpened((o) => !o)
                setMenuOpened(false)
              } else {
                e.preventDefault();
              }
            }}>
            {filtersOpened ? <IconFilter size="1.5rem" /> : <IconFilterEdit size="1.5rem" />}
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};