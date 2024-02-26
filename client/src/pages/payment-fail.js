import Head from 'next/head'
import { Title } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import CustomAppShell from '@/components/CustomAppShell/CustomAppShell'


export default function FAQPage() {
  return (
    <>
      <Head />
      <CustomAppShell>
        <main style={{ padding: '25px' }}>
          <Title order={1} style={{ marginBottom: '15px' }}><IconX size='1.85rem' /> Оплата не прошла!</Title>
        </main >
      </CustomAppShell >
    </>
  )
}
