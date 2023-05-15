import React from 'react';
import { Navbar, Group, Divider, Text, UnstyledButton, ThemeIcon, Image, MultiSelect, Checkbox, Button, MediaQuery, ActionIcon, createStyles, Title, ScrollArea, Center, SegmentedControl, NavLink } from "@mantine/core"
import { IconSword, IconShoppingCart, IconRotateClockwise, IconQuestionMark, IconCircle } from '@tabler/icons-react'

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
  }
}));


export const CustomNavbar = ({ filtersOpened, setFiltersOpened, menuOpened, setMenuOpened, cartSize = 0, heroFilters = false, filters, currentRoute = '/', getSelectedHeroes, setLoading, loading, nullFilters, chosenMode, setChosenMode }) => {
  const { classes } = useStyles();
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
    },
    {
      link: 'cart',
      label: 'Корзина'
    }
  ]

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <NavLink key={item.link} label={item.label} component='a' href={item.link} classNames={{
        label: classes.linkStyle
      }}/>
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
      }}/> 
    );
  });

  return (
    <>
      <Navbar p="md" hiddenBreakpoint="sm" hidden={!filtersOpened} width={{ sm: 200, lg: 300 }} style={{ backgroundColor: '#141517', border: 'none', zIndex: '98' }}>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Navbar.Section>
            <Center>
              <Image src="/logo.png" alt='logo' style={{ maxWidth: '200px' }} classNames={classes.logo} />
            </Center>
          </Navbar.Section>
        </MediaQuery>
        <Navbar.Section grow mt="md" component={ScrollArea}>
          {
            heroFilters && (
              <>
                <Title order={3} style={{ marginTop: '15px' }}>Фильтры</Title>
                <SegmentedControl color="violet" data={[{ label: 'STL', value: 'stl' }, { label: 'Фигурки', value: 'physical' }]} value={chosenMode} onChange={setChosenMode} fullWidth style={{ marginTop: '15px', marginBottom: '15px' }} />
                <Divider />
                <MultiSelect
                  value={filters.races.getter}
                  onChange={filters.races.setter}
                  data={filters.races.data}
                  placeholder="Показываются все расы"
                  searchable
                  clearable
                  nothingFound="Таких рас нет :("
                  label="Раса"
                  style={{ marginBottom: '15px', marginTop: '10px' }}
                  classNames={{
                    label: classes.label
                  }}
                />

                <MultiSelect
                  value={filters.classes.getter}
                  onChange={filters.classes.setter}
                  data={filters.classes.data}
                  placeholder="Показываются все классы"
                  searchable
                  clearable
                  nothingFound="Не знаем таких классов :("
                  label="Класс"
                  style={{ margin: '15px 0' }}
                  classNames={{
                    label: classes.label
                  }}
                />

                <Checkbox.Group
                  value={filters.sex.getter}
                  onChange={filters.sex.setter}
                  label="Пол (предположительный)"
                  classNames={{
                    label: classes.label
                  }}
                >
                  <Checkbox value="m" label="Мужской" />
                  <Checkbox value="f" label="Женский" />
                  <Checkbox value="x" label="???" />
                </Checkbox.Group>

                <Group spacing="sm" grow style={{ marginTop: '15px' }}>
                  <Button loading={loading} color="green" style={{ maxWidth: '100%' }} onClick={() => {
                    setFiltersOpened((o) => !o)
                    getSelectedHeroes();
                  }}>
                    Применить
                  </Button>
                  <ActionIcon disabled={filters.races.getter.length == 0 && filters.classes.getter.length == 0 && filters.sex.getter.length == 0 ? true : false} size='lg' color="red" variant="filled" style={{ maxWidth: '1.125rem' }} onClick={() => {
                    setFiltersOpened((o) => !o)
                    nullFilters();
                  }}>
                    <IconRotateClockwise size="1.125rem" />
                  </ActionIcon>
                </Group>
              </>
            )

          }

        </Navbar.Section>
      </Navbar>

      <MediaQuery largerThan='sm' styles={{display: 'none'}}>
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