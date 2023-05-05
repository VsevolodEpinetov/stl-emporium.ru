import Head from 'next/head'
import { useLocalStorage, useDisclosure, useClipboard } from '@mantine/hooks';
import { useState, useEffect } from 'react'
import { Group, Text, Table, ActionIcon, AppShell, Title, Button, Modal, Code, CopyButton, List, ScrollArea, Anchor, Grid, Paper, Divider } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { CustomHeader } from '@/components/CustomHeader'
import { CustomNavbar } from '@/components/CustomNavbar'
import CreatureImageWithModal from '@/components/CreatureImageWithModal';
import ItemRow from '@/components/ItemRow';

const API_URL = 'https://api.stl-emporium.ru/api/creatures?populate=*'

export default function CartPage () {
  const [opened, setOpened] = useState(false);
  const [chosenHeroesSTLs, setChosenHeroesSTLs] = useLocalStorage({ key: 'chosen-fantasy-heroes-stls', defaultValue: [] });
  const [chosenHeroesMinis, setChosenHeroesMinis] = useLocalStorage({ key: 'chosen-fantasy-heroes-physical', defaultValue: [] });
  const [cart, setCart] = useState([]);
  const [cartSTLs, setCartSTLs] = useState([]);
  const [cartMinis, setCartMinis] = useState([]);
  const [modalOpened, handlersModal] = useDisclosure(false);
  const [priceForItems, setPriceForItems] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const clipboard = useClipboard({ timeout: 500 });

  async function fetchDataFromURI(URI) {
    const rawData = await fetch(URI)
    const data = await rawData.json();
  
    return data?.data;
  }

  useEffect(() => {
    let newCartMinis = [];
    let dictionaryMinis = {};
    if (chosenHeroesMinis) {
      chosenHeroesMinis.forEach(heroID => {
        if (typeof dictionaryMinis[heroID] == 'undefined') {
          dictionaryMinis[heroID] = newCartMinis.length;
          newCartMinis.push({
            code: heroID,
            count: 1,
            type: 'physical'
          })
          setCartMinis(newCartMinis);
        } else {
          newCartMinis[dictionaryMinis[heroID]].count = newCartMinis[dictionaryMinis[heroID]].count + 1;
          setCartSTLs(newCartMinis);
        }
      })
    }
  }, [chosenHeroesMinis])

  useEffect(() => {
    let newCartSTLs = [];
    let dictionarySTLs = {};
    if (chosenHeroesSTLs) {
      chosenHeroesSTLs.forEach(heroID => {
        if (typeof dictionarySTLs[heroID] == 'undefined') {
          dictionarySTLs[heroID] = newCartSTLs.length;
          newCartSTLs.push({
            code: heroID,
            count: 1,
            type: 'stl'
          })
          setCartSTLs(newCartSTLs)
        } else {
          newCartSTLs[dictionarySTLs[heroID]].count = newCartSTLs[dictionarySTLs[heroID]].count + 1;
          setCartSTLs(newCartSTLs);
        }
      })
    }
  }, [chosenHeroesSTLs])

  useEffect(() => {
    let newCart = cartSTLs.concat(cartMinis);
    setCart(newCart)
  }, [cartSTLs, cartMinis])
  useEffect(() => {
    let newCart = cartSTLs.concat(cartMinis);
    setCart(newCart)
  }, [])

  function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

  function addItemPrice (itemCode, itemPrice) {
    
  }

  const getTotal = () => {
    let total = 0;
    /*cart.forEach(cr => {
      total += cr.info.price * cr.count;
    })*/
    return total;
  }

  const getStringWithCodes = () => {
    let str = cart.map(cr => cr.attributes.code).join(', ');
    return str;
  }

  const getArrayWithCodes = () => {
    let arr = []//cart.map(cr => cr.attributes.code);
    return arr;
  }


  function removeAllInstances(creature) {
    let copy = chosenCreatures.slice();
    copy = copy.filter(cr => creature.id !== cr.id)
    setChosenCreatures(copy)
  }

  return (
    <>
      <Head />
      <AppShell
        navbarOffsetBreakpoint="sm"
        navbar={<CustomNavbar opened={opened} setOpened={setOpened} cartSize={chosenHeroesMinis.length + chosenHeroesSTLs.length} currentRoute='/cart' />}
        header={<CustomHeader opened={opened} setOpened={setOpened} />}
      >
        <main>
          <Title order={1}>Твоя корзина</Title>
          <Button onClick={() => {console.log(cart)}}>cart</Button>
          <Button onClick={() => {console.log(cartSTLs)}}>cartSTLs</Button>
          <Button onClick={() => {console.log(cartMinis)}}>cartMinis</Button>
          <Grid>
            <Grid.Col span={8}>
              <Paper shadow="xs" p="md">
                {
                  cart.length > 0
                    ?
                    <>
                      <ScrollArea w={'100%'}>
                        <Table fontSize="md" highlightOnHover>
                          <thead>
                            <tr>
                              <th>Изображение</th>
                              <th>Тип</th>
                              <th>Код</th>
                              <th>Количество</th>
                              <th>Цена</th>
                              <th>Итого</th>
                              <th>Действия</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart && cart.map((creature, id) => (
                              <ItemRow itemCartInfo={creature} key={`item-row-${creature.code}-${id}`} priceForItems={priceForItems} setPriceForItems={setPriceForItems}/>
                            ))}
                          </tbody>
                        </Table>
                      </ScrollArea>
                    </>
                    :
                    <>
                      <Text>Корзина пока что пустая!</Text>
                      Самое время выбрать себе несколько <Anchor href='/'>героев</Anchor> ;)
                    </>
                }
              </Paper>
            </Grid.Col>
            <Grid.Col span={4}>
              <Paper shadow="xs" p="md" style={{position: 'sticky', top: '15px'}}>
                <Button fullWidth size='lg' color='green' radius='md'>
                  Оформить заказ
                </Button>
                <Text size='sm' style={{ color: '#707070', margin: '25px 10px' }}>После оплаты будет предоставлен код, который нужно будет отправить нам в Telegram/VK</Text>
                <Divider />
                <Group position="apart" style={{ margin: '15px 10px' }}>
                  <Title order={3}>Ваша корзина</Title>
                  <Text size='sm'>{cart.length} минек</Text>
                </Group>
                <Group position="apart" style={{ margin: '25px 10px 0' }}>
                  <Text size='md'>Миниатюры ({cart.length})</Text>
                  <Text size='md'>{priceForItems}₽ </Text>
                </Group>
                <Group position="apart" style={{ margin: '5px 10px 15px' }}>
                  <Text size='md'>Скидка</Text>
                  <Text size='md'>-{discount}₽</Text>
                </Group>
                <Divider />
                <Group position="apart" style={{ margin: '15px 10px' }}>
                  <Title order={3}>Общая стоимость</Title>
                  <Title order={3}>{total}₽</Title>
                </Group>

              </Paper>
            </Grid.Col>
          </Grid>
          <Modal opened={modalOpened} onClose={() => handlersModal.close()} title='Как оплатить и получить файлы?' centered size='lg' style={{ padding: '45px' }}>
            <Group style={{ margin: '25px' }}>
              <Text>На данный момент файлы можно получить одним образом:</Text>
              <List>
                <List.Item>Напиши мне в телегу.</List.Item>
                <List.Item>Приложи артикулы нужных тебе минек: </List.Item>
                <List withPadding unordered>
                  {getArrayWithCodes().map(cr => <List.Item><Code>{cr}</Code></List.Item>)}
                </List>
              </List>
              <CopyButton value="test text btw">
                {({ copied, copy }) => (
                  <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                    {copied ? 'Copied url' : 'Copy url'}
                  </Button>
                )}
              </CopyButton>
            </Group>
          </Modal>
        </main >
      </AppShell >
    </>
  )
}