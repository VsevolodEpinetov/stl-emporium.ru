import Head from 'next/head'
import { useState } from 'react'
import { Accordion, AppShell, Title, Anchor, Text } from '@mantine/core'
import CustomAppShell from '@/components/CustomAppShell'


export default function FAQPage () {
  return (
    <>
      <Head />
      <CustomAppShell >
        <main style={{padding: '25px'}}>
          <Title order={1} style={{ marginBottom: '15px' }}>Часто задаваемые вопросы</Title>
          <Accordion defaultValue="customization">
            <Accordion.Item value="scale">
              <Accordion.Control>В каком скейле миниатюрки?</Accordion.Control>
              <Accordion.Panel><Text>Большинство миниатюр выполнено в скейле 32мм, но стоит понимать, что 32мм одной студии может отличаться от 32мм другой. Поэтому непосредственно перед печатью я настоятельно рекомендую в любом случае проверять размер миниатюрки и, при необходимости, менять его. Для удобства ты можешь воспользоваться <Anchor href='https://www.thingiverse.com/thing:4842385'>Линейкой Скалирования.</Anchor></Text></Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="bases">
              <Accordion.Control>В файлах моей миньки не было базы! Что делать?</Accordion.Control>
              <Accordion.Panel>Это значит только одно - миниатюрка предоставляется без специальной базы. Уверяю, что все файлы досконально проверяются перед тем, как будут отправлены приобретателю. Ты можешь либо скачать бесплатную базу (<Anchor href='https://www.thingiverse.com/thing:3438699'>28мм</Anchor>, <Anchor href='https://www.thingiverse.com/thing:2589358'>32мм</Anchor>), либо выбрать базу из нашей <Anchor href='/bases'>библиотеки</Anchor>.</Accordion.Panel>
            </Accordion.Item>

          </Accordion>
        </main >
      </CustomAppShell >
    </>
  )
}