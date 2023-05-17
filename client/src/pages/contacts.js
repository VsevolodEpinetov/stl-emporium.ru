import Head from 'next/head'
import { useState } from 'react'
import { createStyles, ThemeIcon, Text, SimpleGrid, Box, Stack, Title } from '@mantine/core';
import { IconSun, IconPhone, IconMapPin, IconAt } from '@tabler/icons-react';
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
  { title: 'Почта', description: "mail@mail.com", icon: IconAt },
  { title: 'Телефон', description: '+7 999 999-99-99', icon: IconPhone }
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
      {variant === 'gradient' ? (
        <ThemeIcon size={40} radius="md" className={classes.icon}>
          <Icon size="1.5rem" />
        </ThemeIcon>
      ) : (
        <Box mr="md">
          <Icon size="1.5rem" />
        </Box>
      )}

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