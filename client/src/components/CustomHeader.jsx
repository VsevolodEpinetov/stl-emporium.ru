import React from 'react';
import { createStyles, Header, MediaQuery, Burger, Text, Container, rem, Menu, Center, Group, Image, Title, ActionIcon, Button } from "@mantine/core"
import { IconChevronDown, IconFilter, IconFilterEdit, IconShoppingCart, } from '@tabler/icons-react';
const LINKS = require("../../data/links.json")

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    padding: `0.5rem 0.75rem`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: '0.5rem',
  },

  wrapper: {
    maxWidth: '9999px',
    marginRight: '30px',
    marginLeft: '280px',
    '@media (max-width: 1200px)': {
      marginLeft: '200px'
    }
  },

  buttonCart: {
    display: 'block',
    '@media (max-width: 767px)': {
      display: 'none'
    }
  },
}));

export const CustomHeader = ({ filtersOpened, cartSize, setFiltersOpened, menuOpened, setMenuOpened, heroFilters = false, basesFilters = false }) => {
  const { classes } = useStyles();

  const items = LINKS.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} component='a' href={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" withinPortal>
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

  //items.push(<Button key='cart-button-for-menu' component='a' href='/cart' color="teal" leftIcon={<IconShoppingCart />}>Корзина ({cartSize})</Button>)


  return (
    <Header height={{ base: 70, md: 70 }} p="md" style={{ borderBottom: 'none', boxShadow: '0px 1px 16px 1px rgba(45, 45, 45, 0.25)', zIndex: '99' }}>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Group position="apart">
          <Burger
            size="sm"
            mr="xl"
            onClick={() => {
              setMenuOpened((o) => !o)
              setFiltersOpened(false)
            }}
            opened={menuOpened}
          />
          <Title order={3} component='a' href='/'>STLEmporium</Title>
          <ActionIcon size="xl" variant="transparent" style={{ opacity: heroFilters ? '100' : '0', cursor: heroFilters || basesFilters ? 'pointer' : 'default' }}
            onClick={(e) => {
              if (heroFilters || basesFilters) {
                setFiltersOpened((o) => !o)
                setMenuOpened(false)
              } else {
                e.preventDefault();
              }
            }}>
            {filtersOpened ? <IconFilter size="1.5rem" /> : <IconFilterEdit size="1.5rem" />}
          </ActionIcon>
        </Group>
      </MediaQuery>

      <Container className={classes.wrapper}>
        <Group position='apart' style={{width:'100%'}}>
        <div className={classes.inner}>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        </div>
        <Button className={classes.buttonCart} key='cart-button-for-menu' component='a' size="md" href='/cart' color="teal" leftIcon={<IconShoppingCart />}>Корзина ({cartSize})</Button>
        </Group>
      </Container>
    </Header>
  );
};