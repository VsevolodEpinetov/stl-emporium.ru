import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Accordion, AppShell, Title, Anchor, Text, Box, List } from '@mantine/core'
import { CustomHeader } from '@/components/CustomHeader'
import { CustomNavbar } from '@/components/CustomNavbar'
import { useRouter } from 'next/router'
import { usePathname, useSearchParams } from 'next/navigation'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import { useLocalStorage } from '@mantine/hooks'
import CustomAppShell from '@/components/CustomAppShell'


export default function FAQPage() {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [identificator, setIdentificator] = useState('');
  const [total, setTotal] = useState('');
  const [preferredContact, setPreferredContact] = useState('');
  const [thereIsAnOrder, setThereIsAnOrder] = useState(false);
  const [possibleOrders, setPossibleOrders] = useLocalStorage({ key: 'possible-orders', defaultValue: [] })

  useEffect(() => {
    if (params.has('identificator') && params.has('total') && params.has('preferredContact')) {
      const identificatorFromParams = params.get('identificator');
      const totalFromParams = params.get('total');
      const contactFromParams = params.get('preferredContact')
      setIdentificator(identificatorFromParams);
      setTotal(totalFromParams);
      setPreferredContact(contactFromParams);
      setThereIsAnOrder(true)

      let found = false;
      for (let i = 0; i < possibleOrders.length; i++) {
        if (possibleOrders[i].identificator === identificatorFromParams && possibleOrders[i].total == totalFromParams && possibleOrders[i].preferredContact === contactFromParams) {
          found = true;
          break;
        }
      }

      if (!found && contactFromParams.length > 0 && totalFromParams.length > 0 && contactFromParams.length > 0) {
        setPossibleOrders([
          ...possibleOrders,
          {
            identificator: identificatorFromParams,
            total: parseInt(totalFromParams),
            preferredContact: contactFromParams
          }
        ])
      }
    }
  })

  return (
    <>
      <Head />
      <CustomAppShell>
        <main style={{ padding: '25px' }}>
          {thereIsAnOrder
            ?
            <>
              <Title order={1} style={{ marginBottom: '15px' }}><IconCircleCheckFilled size='1.85rem' /> Заказ успешно оплачен!</Title>
              <Box>
                <Text>Совсем скоро мы займёмся обработкой заказа и свяжемся с тобой по предпочитаемому способу связи.</Text>
                <br />
                <Text style={{ color: '#a58ce6' }}>Обязательно запомни, либо запиши данные, которые тебе помогут найти заказ:</Text>
                <List>
                  <List.Item>Идентификатор - {identificator}</List.Item>
                  <List.Item>Стоимость - {total}</List.Item>
                  <List.Item>Предпочитаемый контакт - {preferredContact}</List.Item>
                </List>
                <br />
                <Text>Ты можешь отследить свои заказы на <Anchor href='/my-order'>соответствующей странице</Anchor>. Ну либо связаться с нами - это тоже поможет :)</Text>
              </Box>
            </>
            :
            <Text>Ошибка-рыбка</Text>
          }
        </main >
      </CustomAppShell >
    </>
  )
}
