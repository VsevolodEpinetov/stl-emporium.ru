import React from 'react';
import { HoverCard, Avatar, Text, Group, Anchor, Stack } from '@mantine/core';
import { IconInfoHexagon } from '@tabler/icons-react';
import { generateDescriptionString } from '@/utils/helpers';

const STLInfoHoverCard = ( {info, type, newFilters, cardWidth} ) => {
  return (
    <Group position="center">
      <HoverCard width={cardWidth - 10} shadow="md" withArrow openDelay={200} closeDelay={400} >
        <HoverCard.Target>
          <IconInfoHexagon size={36}/>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group>
            <Avatar src="/logo.png" radius="xl" />
            <Stack spacing={5}>
              <Text size="sm" weight={700} sx={{ lineHeight: 1 }}>
                {info.code}
              </Text>
              <Anchor
                href="https://stl-emporium.ru"
                color="dimmed"
                size="xs"
                sx={{ lineHeight: 1 }}
              >
                STLEmporium
              </Anchor>
            </Stack>
          </Group>

          <Text size="sm" mt="md">
            {generateDescriptionString(info, type, newFilters)}
          </Text>

          {/* <Group mt="md" spacing="xl">
            <Text size="sm">
              <b>0</b> Купили
            </Text>
            <Text size="sm">
              <b>1,174</b> Добавили в корзину
            </Text>
          </Group> */}
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};

export default STLInfoHoverCard;