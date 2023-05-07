import Head from 'next/head'
import { useState } from 'react'
import { Accordion, AppShell, Title, Anchor, Text, TextInput, NumberInput, Select, Button, List, Code } from '@mantine/core'
import { CustomHeader } from '@/components/CustomHeader'
import { CustomNavbar } from '@/components/CustomNavbar'

const token = '25132c43556e68d9898b82ee31c1acdbd949e3b63867a0cc030b2c774bf4b80496db0c38bbca20324e87885dd2d01c76e741e4f49477d255bce23920c66c5ba8d2a73f534b70bd11662d1395d091078594d9d7d5d44cc921da25a1af7f65fa15796ad5c754400ae8f4a0278829e7abffa6a28319782cdf96068e59c3714623b1'
async function fetchDataFromURI(URI) {
  const rawData = await fetch(URI, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
  })
  const data = await rawData.json();

  return data?.data;
}

export default function FAQPage() {
  const [opened, setOpened] = useState(false);
  const [contactType, setContactType] = useState('');
  const [contact, setContact] = useState('');
  const [identificator, setIdentificator] = useState('');
  const [total, setTotal] = useState(0);
  const [orderInfo, setOrderInfo] = useState(undefined);

  async function findOrder() {
    const URI = 'https://api.stl-emporium.ru/api/orders?populate=*';
    const identificatorFilter = `filters[identificator][$eq]=${identificator}`;
    const totalFilter = `filters[total][$eq]=${total}`;
    const contactFilter = `filters[${contactType}][$eq]=${contact}`;
    fetchDataFromURI(`${URI}*&${identificatorFilter}&${totalFilter}&${contactFilter}`).then(data => {
      setOrderInfo(data[0]);
    })

  }

  return (
    <>
      <Head />
      <AppShell
        navbarOffsetBreakpoint="sm"
        navbar={<CustomNavbar opened={opened} setOpened={setOpened} currentRoute='/my-order' />}
        header={<CustomHeader opened={opened} setOpened={setOpened} />}
      >
        <main>
          <Title order={1} style={{ marginBottom: '15px' }}>Найти заказ</Title>
          <TextInput placeholder='Контакт' value={contact} onChange={(e) => setContact(e.currentTarget.value)} />
          <Select data={[
            { value: 'vk', label: 'VK' },
            { value: 'telegram', label: 'Tg' },
            { value: 'mail', label: 'Mail' }
          ]}
            value={contactType}
            onChange={setContactType}
          />
          <NumberInput placeholder='Стоимость' value={total} onChange={setTotal} />
          <TextInput placeholder='Идентификатор' value={identificator} onChange={(e) => setIdentificator(e.currentTarget.value)} />
          <Button onClick={() => findOrder()}>get</Button>
          {orderInfo &&
            <>
              <Title>Информация о заказе</Title>
              <Text>Идентификатор: {orderInfo.attributes.identificator}</Text>
              <List>
                {orderInfo.attributes.items.map((item, id) => <List.Item key={`item-${item.code}-${id}`}>
                  <Code>{item.code}</Code> - {item.amount}шт., {item.type}
                </List.Item>)}
              </List>
              <Text>Доставлен: {orderInfo.attributes.delivered ? 'Да' : 'Нет'}</Text>
              <Text>В обработке: {orderInfo.attributes.processing ? 'Да' : 'Нет'}</Text>
            </>
          }
          {!orderInfo &&
            <Title>Нет такого заказа</Title>
          }
        </main >
      </AppShell >
    </>
  )
}