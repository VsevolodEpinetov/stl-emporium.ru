import React from 'react';
import { Header, MediaQuery, Burger, Text } from "@mantine/core"

export const CustomHeader = ({ opened, setOpened }) => {
  return (
    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
    <Header height={{ base: 50, sm: 0 }} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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
    </Header>
    </MediaQuery>
  );
};