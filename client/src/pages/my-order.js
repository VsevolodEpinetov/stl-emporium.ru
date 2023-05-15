import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Accordion, AppShell, Title, Anchor, Text, TextInput, NumberInput, Select, Button, List, Code, Container, Box, SimpleGrid, Card, ActionIcon, Group } from '@mantine/core'
import { CustomHeader } from '@/components/CustomHeader'
import { CustomNavbar } from '@/components/CustomNavbar'
import { useInterval, useLocalStorage } from '@mantine/hooks'
import { IconTrash } from '@tabler/icons-react'

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
  const [loading, setLoading] = useState(false);
  const [errorContactType, setErrorContactType] = useState('');
  const [errorContact, setErrorContact] = useState('');
  const [errorTotal, setErrorTotal] = useState('');
  const [errorIdentificator, setErrorIdentificator] = useState('');
  const [firstBlood, setFirstBlood] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);
  const [possibleOrders, setPossibleOrders] = useLocalStorage({ key: 'possible-orders', defaultValue: [] })

  useEffect(() => {
    if (contactType.length > 0) setErrorContactType('')
  }, [contactType])
  useEffect(() => {
    if (total.length > 0 || total.length != '0') setErrorTotal('')
  }, [total])

  useEffect(() => {
    if (errorContact === 'Проверь данные, такого заказа нет') { // Just one field is enough
      setErrorContact('')
      setErrorContactType('')
      setErrorTotal('')
      setErrorIdentificator('')
    }
  }, [contactType, contact, identificator, total])

  async function findOrder() {
    let thereIsAnError = false;

    if (contactType.length < 1) {
      setErrorContactType('Введи указанный предпочтительный способ связи');
      thereIsAnError = true;
    }

    if (contact.length < 1) {
      setErrorContact('Введи значение предпочтительного способа связи');
      thereIsAnError = true;
    }

    if (identificator.length < 1) {
      setErrorIdentificator('Введи выданный уникальный идентификатор');
      thereIsAnError = true;
    }

    if (total.length < 1 || total == '0') {
      setErrorTotal('Введи сумму заказа');
      thereIsAnError = true;
    }

    if (!thereIsAnError) {
      if (!firstBlood) setFirstBlood(true);
      setLoading(true);
      const URI = 'https://api.stl-emporium.ru/api/orders?populate=*';
      const identificatorFilter = `filters[identificator][$eq]=${identificator}`;
      const totalFilter = `filters[total][$eq]=${total}`;
      const contactFilter = `filters[${contactType}][$eq]=${contact}`;
      fetchDataFromURI(`${URI}*&${identificatorFilter}&${totalFilter}&${contactFilter}`).then(data => {
        setLoading(false);
        setSeconds(7)
        interval.start();
        if (data) {
          if (data[0]) {
            setOrderInfo(data[0])
            let found = false;
            for (let i = 0; i < possibleOrders.length; i++) {
              if (possibleOrders[i].identificator === identificator && possibleOrders[i].total == total && possibleOrders[i].preferredContact === contactType) {
                found = true;
                break;
              }
            }

            if (!found && identificator !== '' && total !== '' && contactType !== '') {
              setPossibleOrders([
                ...possibleOrders,
                {
                  identificator: identificator,
                  total: total,
                  preferredContact: contactType
                }
              ])
            }
          }
          else {
            setOrderInfo(undefined)
            setErrorContact('Проверь данные, такого заказа нет')
            setErrorContactType('Проверь данные, такого заказа нет')
            setErrorTotal('Проверь данные, такого заказа нет')
            setErrorIdentificator('Проверь данные, такого заказа нет')
          }
        } else { setOrderInfo(undefined) }
      })
    }

  }

  return (
    <>
      <Head />
      <AppShell
        navbarOffsetBreakpoint="sm"
        navbar={<CustomNavbar opened={opened} setOpened={setOpened} currentRoute='/my-order' />}
        header={<CustomHeader opened={opened} setOpened={setOpened} />}
      >
        <main style={{ padding: '25px' }}>
          <Title order={1} style={{ marginBottom: '15px' }}>Информация о заказе</Title>
          <Text>Тут ты можешь найти информацию по своему заказу. Чтобы посмотреть информацию о заказе, тебе нужно верно заполнить поля ниже. Если ты не помнишь что-то из необходимых полей, то свяжись с нами через группу ВК.</Text>
          <Box style={{ marginTop: '25px' }}>
            <SimpleGrid
              cols={2}
              spacing="lg"
              breakpoints={[
                { maxWidth: 'sm', cols: 1, spacing: 'md' },
              ]}
            >
              <Select data={[
                { value: 'vk', label: 'Вконтакте' },
                { value: 'telegram', label: 'Telegram' },
                { value: 'mail', label: 'Почта' }
              ]}
                value={contactType}
                onChange={setContactType}
                label='Предпочтительный способ связи'
                description='Способ связи, который ты выбрал предпочтительным'
                error={errorContactType}
              />
              <TextInput
                placeholder='Контакт'
                label="Сам контакт"
                description='То, что ты указал при заказе'
                value={contact}
                onChange={(e) => {
                  setContact(e.currentTarget.value)
                  if (e.currentTarget.value.length > 1) setErrorContact('')
                }}
                error={errorContact}
              />
              <NumberInput
                placeholder='Стоимость'
                value={total}
                onChange={setTotal}
                label='Итоговая стоимость заказа'
                description='То, что списалось с твоей карты при оплате'
                error={errorTotal}
              />
              <TextInput
                placeholder='Идентификатор'
                value={identificator}
                onChange={(e) => {
                  setIdentificator(e.currentTarget.value)
                  if (e.currentTarget.value.length > 1) setErrorIdentificator('')
                }}
                label='Уникальный идентификатор заказа'
                description='Строка, которая была тебе выдана перед оплатой заказа'
                error={errorIdentificator}
              />
            </SimpleGrid>
          </Box>
          <Box style={{ margin: '25px 0' }}>
            <Button fullWidth onClick={() => findOrder()} size='lg' loading={loading} disabled={seconds > 0 ? true : false}>{seconds > 0 ? seconds : 'Найти заказ'}</Button>
          </Box>
          {orderInfo &&
            <>
              <Title>Информация о заказе</Title>
              <List>
                {orderInfo.attributes.items.map((item, id) => <List.Item key={`item-${item.code}-${id}`}>
                  <Code>{item.code}</Code> - {item.amount}шт., {item.type}
                </List.Item>)}
              </List>
              <Text>Доставлен: {orderInfo.attributes.delivered ? 'Да' : 'Нет'}</Text>
              <Text>В обработке: {orderInfo.attributes.processing ? 'Да' : 'Нет'}</Text>
            </>
          }
          {firstBlood &&
            <>
              {!orderInfo &&
                <Title>Нет такого заказа</Title>
              }
            </>
          }
          {possibleOrders.length > 0 &&
            <SimpleGrid
              cols={4}
              spacing="lg"
              breakpoints={[
                { maxWidth: 'lg', cols: 5, spacing: 'md' },
                { maxWidth: 'md', cols: 3, spacing: 'md' },
                { maxWidth: 'sm', cols: 3, spacing: 'sm' },
                { maxWidth: 'xs', cols: 2, spacing: 'sm' },
              ]}
            >
              {possibleOrders.map((order, id) => {
                return (
                  <Card shadow="sm" padding="lg" radius="md" withBorder key={`card-guess-${id}`}>
                    <Group position="apart" mt="md" mb="xs">
                      <Text weight={500}>Заказ на {order.total}₽</Text>
                      <ActionIcon variant='transparent' onClick={() => {
                        console.log(`removing element ${id}...`)
                        setPossibleOrders([...possibleOrders.slice(0, id), ...possibleOrders.slice(id + 1)])
                      }}> <IconTrash /> </ActionIcon>
                    </Group>

                    <Text size="sm" color="dimmed">
                      Идентификатор - {order.identificator}
                    </Text>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md"
                      onClick={() => {
                        console.log(order)
                        setIdentificator(order.identificator)
                        setTotal(parseInt(order.total))
                        setContactType(order.preferredContact)
                      }}
                    >
                      Найти этот заказ
                    </Button>
                  </Card>
                )
              })}
            </SimpleGrid>
          }
        </main >
      </AppShell >
    </>
  )
}