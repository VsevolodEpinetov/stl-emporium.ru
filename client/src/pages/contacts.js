import Head from 'next/head'
import { useState } from 'react'
import { createStyles, ThemeIcon, Text, SimpleGrid, Box, Stack, Title } from '@mantine/core';
import { IconSun, IconPhone, IconMapPin, IconAt, IconFileDescription } from '@tabler/icons-react';
import CustomAppShell from '@/components/CustomAppShell'

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    color: theme.white,
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundImage: 'none',
    backgroundColor: 'transparent',
  },

  title: {
    color: theme.colors[theme.primaryColor][0],
  },

  description: {
    color: theme.white,
  },
}));

const MOCKDATA = [
  { title: 'Почта', description: "stl-emporium@outlook.com", icon: IconAt },
  { title: 'Телефон', description: '+7 909 918-70-18', icon: IconPhone },
  { title: 'Организация', description: 'ИП Епинетов Всеволод Михайлович', icon: IconFileDescription},
  { title: 'ИНН', description: '301509345382' },
  { title: 'ОГРНИП', description: '323784700160773' },
];

function ContactIcon({
  icon: Icon,
  title,
  description,
  variant = 'gradient',
  className,
  ...others
}) {
  const { classes, cx } = useStyles({ variant });
  return (
    <div className={cx(classes.wrapper, className)} {...others}>
      {Icon ?
        <Box mr="md">
          <Icon size="1.5rem" />
        </Box>
        :
        <Box mr="md">
          <div style={{height: '1.5rem', width: '1.5rem'}}></div>
        </Box>
      }

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

export function ContactIconsList({ data = MOCKDATA, variant }) {
  const items = data.map((item, index) => <ContactIcon key={index} variant={variant} {...item} />);
  return <Stack>{items}</Stack>;
}

export default function ContactsPage() {
  return (
    <>
      <Head />
      <CustomAppShell >
        <main style={{ padding: '25px' }}>
          <Title order={1} style={{ marginBottom: '15px' }}>Наши контакты</Title>
          <Box
            sx={(theme) => ({
              padding: theme.spacing.xl,
              backgroundColor: '#1A1B1E',
              color: 'white'
            })}
          >
            <ContactIconsList />
          </Box>
        </main >
      </CustomAppShell >
    </>
  )
}