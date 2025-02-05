import Head from 'next/head'
import { Text, Box, Stack, Title, Anchor } from '@mantine/core';
import { IconPhone, IconAt, IconFileDescription, IconBrandVk } from '@tabler/icons-react';
import CustomAppShell from '@/components/CustomAppShell/CustomAppShell'

const contactData = [
  { title: 'Почта', description: "stl-emporium@outlook.com", icon: IconAt },
  { title: 'Телефон', description: '+7 909 918-70-18', icon: IconPhone },
  { title: 'VK', description: <Anchor href='https://vk.com/stlemporium' target='_blank'>https://vk.com/stlemporium</Anchor>, icon: IconBrandVk },
  { title: 'Организация', description: 'ИП Епинетов Всеволод Михайлович', icon: IconFileDescription},
  { title: 'ИНН', description: '301509345382' },
  { title: 'ОГРНИП', description: '323784700160773' },
];

function ContactIcon({
  icon: Icon,
  title,
  description
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center'
    }}>
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
        <Text size="xs">
          {title}
        </Text>
        <Text>{description}</Text>
      </div>
    </div>
  );
}

export function ContactIconsList({ data = contactData, variant }) {
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