import React, { useEffect, useState } from 'react';
import { CustomHeader } from '../CustomHeader/CustomHeader';
import { AppShell, Button, Divider, Flex, Modal, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import { CustomNavbar } from '../CustomNavbar/CustomNavbar';
import { useLocalStorage } from '@mantine/hooks';
import { IconExclamationMark } from '@tabler/icons-react';


const CustomAppShell = ({ getSelectedHeroes, loading, nullFilters, chosenMode, setChosenMode, children, newFilters = undefined, filtersLoading }) => {
  const [filtersOpened, setFiltersOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [shoppingCart, setShoppingCart] = useLocalStorage({ key: 'shopping-cart', defaultValue: [] })
  const [cartSize, setCartSize] = useState(0);
  const [adultModalOpened, setAdultModalOpened] = useLocalStorage({ key: 'adult-modal', defaultValue: false })
  const theme = useMantineTheme();

  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    setCartSize(shoppingCart.reduce((partial, item) => partial + item.amount, 0));
  }, [shoppingCart])

  return (
    <AppShell
      header={{ height: headerHeight }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !menuOpened && !filtersOpened } }}
      padding="md"
    >
      <AppShell.Header style={{ border: 'none' }}>
        <CustomHeader
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
          filtersOpened={filtersOpened}
          setFiltersOpened={setFiltersOpened}
          withFilters={newFilters ? true : false}
          cartSize={cartSize}
          onHeightChange={setHeaderHeight}
        />
      </AppShell.Header>
      <AppShell.Navbar p="md" style={{ border: 'none' }}>
        <CustomNavbar
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
          headerHeight={headerHeight}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <div>
          {children}
        </div>
      </AppShell.Main>
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
          <ThemeIcon color="red" size="md" style={{ marginRight: '5px' }}>
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