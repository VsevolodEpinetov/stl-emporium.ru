import Head from 'next/head'
import { Accordion, Title, Anchor, Text } from '@mantine/core'
import CustomAppShell from '@/components/CustomAppShell'


export default function FAQPage () {
  return (
    <>
      <Head />
      <CustomAppShell >
        <main style={{padding: '25px'}}>
          <Title order={1} style={{ marginBottom: '15px' }}>Расы</Title>
        </main >
      </CustomAppShell >
    </>
  )
}