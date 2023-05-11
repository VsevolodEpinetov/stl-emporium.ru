import Head from 'next/head'
import { useState } from 'react'
import { Accordion, AppShell, Title, Anchor, Text, Box, List } from '@mantine/core'
import { CustomHeader } from '@/components/CustomHeader'
import { CustomNavbar } from '@/components/CustomNavbar'
import { useRouter } from 'next/router'
import { usePathname, useSearchParams } from 'next/navigation'


export default function FAQPage () {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  console.log(params);

  return (
    <>
      <Head />
      <AppShell
        navbarOffsetBreakpoint="sm"
        navbar={<CustomNavbar opened={opened} setOpened={setOpened} currentRoute='/faq' />}
        header={<CustomHeader opened={opened} setOpened={setOpened} />}
      >
        <main style={{padding: '25px'}}>
          <Title order={1} style={{ marginBottom: '15px' }}>Заказ успешно оплачен!</Title>
          <Box>
            <Text>Совсем скоро мы займёмся обработкой заказа и свяжемся с тобой по предпочитаемому способу связи.</Text>
            <Text>На всякий случай напоминаю тебе информацию, которая поможет найти твой заказ:</Text>
            <List>
              <List.Item>Идентификатор - {params.get('identificator')}</List.Item>
              <List.Item>Стоимость - {params.get('total')}</List.Item>
              <List.Item>Предпочитаемый контакт - {params.get('preferredContact')}</List.Item>
            </List>
          </Box>
        </main >
      </AppShell >
    </>
  )
}
