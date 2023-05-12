import React from 'react';
import { createStyles, Header, MediaQuery, Burger, Text, Container, rem } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
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
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

export const CustomHeader = ({ opened, setOpened }) => {
  const links = [
    {
      link: '/',
      label: 'Главная'
    },
    {
      link: '#',
      label: 'STL',
      links: [
        {
          link: '/',
          label: 'Фентези Герои'
        },
        {
          link: '/bases',
          label: 'Базы'
        }
      ]
    },
    {
      link: '/faq',
      label: 'FAQ'
    },
    {
      link: 'contacts',
      label: 'Контакты'
    },
    {
      link: 'my-order',
      label: 'Отследить'
    }
  ]

  const { classes } = useStyles();
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
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
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });


  return (
    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
      <Header height={{ base: 50, md: 70 }} p="md">
        <Container>
          <div className={classes.inner}>
            <Group spacing={5} className={classes.links}>
              {items}
            </Group>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <Text>Меню и фильтры</Text>
          </div>
        </Container>
      </Header>
    </MediaQuery>
  );
};