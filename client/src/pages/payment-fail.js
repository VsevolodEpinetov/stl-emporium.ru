import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Accordion, AppShell, Title, Anchor, Text, Box, List } from '@mantine/core'
import { CustomHeader } from '@/components/CustomHeader'
import { CustomNavbar } from '@/components/CustomNavbar'
import { useRouter } from 'next/router'
import { usePathname, useSearchParams } from 'next/navigation'
import { IconCircleCheckFilled, IconCrossFilled, IconX } from '@tabler/icons-react'
import { useLocalStorage } from '@mantine/hooks'
import CustomAppShell from '@/components/CustomAppShell'


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
