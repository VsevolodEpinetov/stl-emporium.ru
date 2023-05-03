import React from 'react';
import { Navbar, Group, Divider, Text, UnstyledButton, ThemeIcon, Image, MultiSelect, Checkbox, Button, MediaQuery, ActionIcon, createStyles, Title, ScrollArea, Center } from "@mantine/core"
import { IconSword, IconShoppingCart, IconRotateClockwise, IconQuestionMark, IconCircle } from '@tabler/icons-react'

//#region  MenuLink
function MainLink({ icon, color, label, link = '' }) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      component="a"
      href={link}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="md">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
//#endregion

const useStyles = createStyles((theme) => ({
  label: {
    fontSize: '0.875rem',
    marginBottom: '5px',
    fontWeight: '700'
  },
  logo: {
    maxWidth: '200px'
  }
}));


export const CustomNavbar = ({ opened, setOpened, cartSize = 0, heroFilters = false, filters, currentRoute = '/', getSelectedHeroes, setLoading, loading, nullFilters }) => {
  const { classes } = useStyles();

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Navbar.Section>
        <Center>
          <Image src="/logo.png" alt='logo' style={{ maxWidth: '200px' }} classNames={classes.logo} />
        </Center>
      </Navbar.Section>
      <Divider />
      <Navbar.Section grow mt="md" component={ScrollArea} type="auto">


        <Group spacing="xs" style={{ margin: '15px 0' }}>
          <MainLink icon={<IconSword size={16} />} color={'green'} label={'Фентези герои'} link={currentRoute == '/' ? '' : '/'} />
          <MainLink icon={<IconCircle size={16} />} color={'purple'} label={'Базы'} link={currentRoute == '/bases' ? '' : '/bases'} />
          <MainLink icon={<IconShoppingCart size={16} />} color={'violet'} label={`Корзина (${cartSize})`} link={currentRoute == '/cart' ? '' : '/cart'} />
          <MainLink icon={<IconQuestionMark size={16} />} color={'blue'} label={`FAQ`} link={currentRoute == '/faq' ? '' : '/faq'} />
        </Group>

        {
          heroFilters && (
            <>
              <Divider />
              <Title order={3} style={{ marginTop: '15px' }}>Фильтры</Title>
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
                  setOpened((o) => !o)
                  getSelectedHeroes();
                }}>
                  Применить
                </Button>
                <ActionIcon disabled={filters.races.getter.length == 0 && filters.classes.getter.length == 0 && filters.sex.getter.length == 0 ? true : false} size='lg' color="red" variant="filled" style={{ maxWidth: '1.125rem' }} onClick={() => {
                  setOpened((o) => !o)
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
  );
};