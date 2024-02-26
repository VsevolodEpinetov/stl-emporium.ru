import Head from 'next/head'
import { Title, Text, Group, Button } from '@mantine/core'
import CustomAppShell from '@/components/CustomAppShell/CustomAppShell'
import { useState } from 'react'


export default function FAQPage () {
  const [chosenType, setChosenType] = useState('heroes');
  const dictionary = {
    'heroes': 'героев',
    'monsters': 'монстров'
  }
  

  return (
    <>
      <Head />
      <CustomAppShell >
        <main style={{padding: '25px'}}>
          <Group>
            <Button onClick={() => setChosenType('heroes')}>⚔️</Button>
            <Button onClick={() => setChosenType('monsters')}>🐉</Button>
          </Group>
          <Title order={1} style={{ marginBottom: '15px' }}>Категории для {chosenType}</Title>
          <Text>Выбери желаемый фильтр</Text>
          <Group>
            <Button>Раса</Button>
            <Button>Класс</Button>
            <Button>Оружие</Button>
          </Group>
        </main >
      </CustomAppShell >
    </>
  )
}