import Head from 'next/head'
import { useState } from 'react'
import { Accordion, AppShell, Title, Anchor, Text } from '@mantine/core'
import { CustomHeader } from '@/components/CustomHeader'
import { CustomNavbar } from '@/components/CustomNavbar'


export default function FAQPage () {
  const [opened, setOpened] = useState(false);

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
          
        </main >
      </AppShell >
    </>
  )
}