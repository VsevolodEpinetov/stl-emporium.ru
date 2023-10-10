import React, { useEffect, useState } from 'react';
import { CustomHeader } from './CustomHeader';
import { AppShell, Button, Divider, Flex, Group, Modal, Text, ThemeIcon, createStyles, useMantineTheme } from '@mantine/core';
import { CustomNavbar } from './CustomNavbar';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconExclamationMark } from '@tabler/icons-react';


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
  const [opened, { open, close }] = useDisclosure(false);
  const [adultModalOpened, setAdultModalOpened] = useLocalStorage({ key: 'adult-modal', defaultValue: false })
  const theme = useMantineTheme();

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
      <Modal
        opened={adultModalOpened}
        onClose={() => setAdultModalOpened(false)}
        title="Честное предупреждение"
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 15,
        }}
        centered
      >
        <Text>
          <ThemeIcon color="red" size="md" style={{marginRight: '5px'}}>
            <IconExclamationMark />
          </ThemeIcon>
          На сайте периодически могут встречаться изображения 18+. Если вы закрываете это окно и остаётесь на сайте, то тем самым подтверждаете, что вам есть 18 лет, и вы морально готовы к различному разврату в мире настольно-ролевых игр.
        </Text>
        <br />
        <Divider />
        <br />
        <Text>Такие изображения не заблюрены, и это могут быть дварфийки. Другого предупреждения не будет</Text>
        <br />
        <Flex justify="space-between">
          <Button color="pink" fullWidth style={{ marginRight: '10px' }} component='a' href='https://google.com'>Мама, мне страшно</Button>
          <Button color='green' fullWidth style={{ marginLeft: '10px' }} onClick={() => setAdultModalOpened(false)}>Я ГОТОВ</Button>
        </Flex>
      </Modal>
    </AppShell>
  );
};

export default CustomAppShell;