import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Title, Text, TextInput, NumberInput, Select, Button, List, Code, Box, SimpleGrid, Card, ActionIcon, Group } from '@mantine/core'
import { useInterval, useLocalStorage } from '@mantine/hooks'
import { IconTrash } from '@tabler/icons-react'
import CustomAppShell from '@/components/CustomAppShell/CustomAppShell'
import { fetchDataFromURINew } from '@/utils/api'

export default function FAQPage() {
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
      const orderData = await fetchDataFromURINew('order', { identificatorOrder: identificator, totalAmount: total, contact: contactType, contactValue: contact });
      setLoading(false);
      setSeconds(7)
      interval.start();
      if (orderData.data.length > 0) {
        setOrderInfo(orderData.data[0])
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
    }

  }

  return (
    <>
      <Head />
      <CustomAppShell>
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
                        setPossibleOrders([...possibleOrders.slice(0, id), ...possibleOrders.slice(id + 1)])
                      }}> <IconTrash /> </ActionIcon>
                    </Group>

                    <Text size="sm" color="dimmed">
                      Идентификатор - {order.identificator}
                    </Text>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md"
                      onClick={() => {
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
      </CustomAppShell>
    </>
  )
}