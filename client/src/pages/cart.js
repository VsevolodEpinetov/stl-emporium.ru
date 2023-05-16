import Head from 'next/head'
import { useLocalStorage, useDisclosure, useClipboard, useMediaQuery } from '@mantine/hooks';
import { useState, useEffect, useCallback } from 'react'
import { Group, Text, Table, ActionIcon, AppShell, Title, Button, Modal, Code, CopyButton, List, ScrollArea, Anchor, Grid, Paper, Divider, Stack, Input, Select, TextInput } from '@mantine/core'
import { IconAt, IconBrandTelegram, IconBrandVk, IconTrash } from '@tabler/icons-react'
import { CustomHeader } from '@/components/CustomHeader'
import { CustomNavbar } from '@/components/CustomNavbar'
import CreatureImageWithModal from '@/components/CreatureImageWithModal';
import ItemRow from '@/components/ItemRow';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CustomAppShell from '@/components/CustomAppShell';

const token = '8721eb0fe7756b16ad0abb03650965113f4e26d8a0958a70c15b932124d39157eb132156e1676d9efb42fc2afed5cc7b20390edf19dd755a7e3914f43358e3f4c8e5d5368d5efe72d778d4f23d0158c6a239f48709a60a9771f87dac5c6bc9a3245314a673ba8e9c4bb7dccb0c3f76eea14717501474ebfa02583d81251c1bca'

function generateToken() {
  const firstPart = [
    'Обычный',
    'Редкий',
    'Эпический',
    'Легендарный',
    'Мифический',
    'Необычный',
    'Магический',
    'Странный',
    'Тайный',
    'Мерцающий',
    'Благословенный',
    'Жевательный',
    'Эфирный',
    'Мрачный',
    'Боевой',
    'Поддельный',
    'Фальшивый',
    'Темный',
    'Светлый',
    'Нескончаемый',
    'Резной',
    'Маленький',
    'Полный',
    'Цветной',
    'Монохромный',
    'Призрачный',
    'Серебрянный',
    'Золотой',
    'Алмазный',
    'Изумрудный',
    'Каменный',
    'Стальной',
    'Заколдованный',
    'Зачаренный',
    'Счастливый',
    'Угрюмый',
    'Унылый',
    'Радостный',
    'Затерянный',
    'Спокойный',
    'Кричащий',
    'Орущий',
    'Странствующий',
    'Болтливый',
    'Смертоносный',
    'Исцеляющий',
    'Невредимый',
    'Пророческий',
    'Мясной',
    'Пьяный',
    'Трезвый',
    'Острый',
    'Тупой',
    'Свежий',
    'Вонючий',
    'Грязный',
    'Восхитительный',
    'Большой',
    'Праздничный',
    'Обыденный',
    'Пивной',
    'Мощный',
    'Хилый',
    'Возрожденный',
    'Высокорожденный',
    'Перерожденный',
    'Древний',
    'Новый',
    'Точный',
    'Меткий',
    'Слепой',
    'Зрячий',
    'Рыбацкий',
    'Боевой',
    'Мирный',
    'Душный',
    'Прыткий',
    'Тренировочный',
    'Пахучий',
    'Составной',
    'Гейзерный',
    'Панцирный',
    'Терракотовый',
    'Запечатанный',
    'Небесный',
    'Земной',
    'Подземный',
    'Падающий',
    'Летящий',
    'Зимний',
    'Летний',
    'Весенний',
    'Осенний',
    'Хитроумный',
    'Игрушечный',
    'Лунный',
    'Любвеобильный',
    'Хмельной',
    'Вкусный',
    'Плетенный',
    'Мятный',
    'Взрывчатый',
    'Грибной',
    'Утиный'
  ]
  const secondPart = [
    'Мурлок',
    'Дракон',
    'Мимик',
    'Меч',
    'Посох',
    'Моргенштерн',
    'Кистень',
    'Слизень',
    'Кинжал',
    'Молот',
    'Арбалет',
    'Лук',
    'Топор',
    'Кнут',
    'Цеп',
    'Шакрам',
    'Лич',
    'Тролль',
    'Огр',
    'Бармаглот',
    'Архимаг',
    'Волшебник',
    'Паладин',
    'Следопыт',
    'Друид',
    'Архидруид',
    'Дух',
    'Рух',
    'Ифрит',
    'Трент',
    'Энт',
    'Скелет',
    'Изобретатель',
    'Орк',
    'Гоблин',
    'Воин',
    'Чернокнижник',
    'Некромант',
    'Эликсир',
    'Рог',
    'Разбойник',
    'Бочонок',
    'Дворф',
    'Гном',
    'Жрец',
    'Маг',
    'Таурен',
    'Следопыт',
    'Плут',
    'Варвар',
    'Чародей',
    'Нагрудник',
    'Шлем',
    'Щит',
    'Заряд',
    'Олень',
    'Брюхоног',
    'Ящик',
    'Сундук',
    'Банан',
    'Знак',
    'Камень',
    'Пульт',
    'Мяч',
    'Бард',
    'Штырь',
    'Жезл',
    'Мастер',
    'Наемник',
    'Череп',
    'Скакун',
    'Ангел',
    'Панцирь',
    'Шаман',
    'Цыпленок',
    'Монах',
    'Мистик',
    'Алхимик',
    'Бог',
    'Петух',
    'Орел'
  ]
  const thirdPart = [
    'Подземелья',
    'Слизня',
    'Вулкана',
    'Божества',
    'Бога',
    'Богини',
    'Митрила',
    'Болота',
    'Банана',
    'Рыбы',
    'Щенков',
    'Котят',
    'Камня',
    'Самоцветов',
    'Сплава',
    'Огня',
    'Магмы',
    'Воздуха',
    'Кожи',
    'Воды',
    'Снега',
    'Тряпок',
    'Ткани',
    'Меди',
    'Серебра',
    'Платины',
    'Льда',
    'Роз',
    'Жара',
    'Бочонка',
    'Ларца',
    'Ящика',
    'Тыквы',
    'Зубов',
    'Кости',
    'Конфет',
    'Шоколада',
    'Печенья',
    'Сахара',
    'Карамели',
    'Бумаги',
    'Смолы',
    'Волка',
    'Пластика',
    'Луносвета',
    'Подгорода',
    'Оргриммара',
    'Штормграда',
    'Даларана',
    'Стальгорна',
    'Дарнаса',
    'Экзодара',
    'Лимонада',
    'Лимонов',
    'Апельсинов',
    'Яблок',
    'Курицы',
    'Говядины',
    'Призрака',
    'Стали',
    'Генератора',
    'Вуду',
    'Монастыря',
    'Яйца',
    'Енота',
    'Пива',
    'Хмеля',
    'Эля',
    'Бухты',
    'Осколков',
    'Будущего',
    'Прошлого'
  ]

  const string = `${firstPart[Math.floor(Math.random()*firstPart.length)]}${secondPart[Math.floor(Math.random()*secondPart.length)]}Из${thirdPart[Math.floor(Math.random()*thirdPart.length)]}`
  return string;
}

export default function CartPage() {
  const [opened, setOpened] = useState(false);
  const [shoppingCart, setShoppingCart] = useLocalStorage({ key: 'shopping-cart', defaultValue: [] })
  const [shoppingCartWithData, setShoppingCartWithData] = useState([]);
  const [modalOpened, modalHandlers] = useDisclosure(false);
  
  const [discount, setDiscount] = useState(0);
  const [identificator, setIdentificator] = useState('')
  const [paymentIsInProgress, setPaymentIsInProgress] = useState(false)


  const isMobile = useMediaQuery("(max-width: 50em)");
  const [vk, setVK] = useState('');
  const [tg, setTg] = useState('');
  const [mail, setMail] = useState('');
  const [optionsContacts, setOptionsContacts] = useState([]);
  const [chosenPreferredContact, setChosenPreferredContact] = useState('');
  const [payButtonIsDisabled, setPayButtonIsDisabled] = useState(true);
  const router  = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
 
      return params.toString();
    },
    [searchParams],
  );
    
  function redirectToSuccess ( identificator, total, preferredMethod ) {
    const params = new URLSearchParams(searchParams);
    params.set('identificator', identificator);
    params.set('total', total);
    params.set('preferredContact', preferredMethod)

    router.push('/payment-success' + '?' + params.toString());
  }

  async function placeOrder() {

    //TODO: field verifications
    setPaymentIsInProgress(true);
    let newCart = shoppingCart.map(item => {
      let newObj = {
        code: item.code,
        amount: item.amount,
        type: item.type
      }
      return newObj;
    })
    const totalCost = getTotal();
    const response = await fetch(`https://api.stl-emporium.ru/api/orders`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          total: totalCost,
          items: newCart,
          vk: vk,
          telegram: tg,
          mail: mail,
          preferredMethod: chosenPreferredContact,
          delivered: false,
          paid: false,
          identificator: identificator
        }
      })
    });
  
    if (!response.ok) {
      console.log(response.statusText);
    } else {
      setShoppingCart([]);
      redirectToSuccess(identificator, totalCost, chosenPreferredContact);
    }
  }

  async function fetchDataFromURI(URI) {
    const rawData = await fetch(URI)
    const data = await rawData.json();

    return data?.data;
  }

  useEffect(() => {
    let contacts = [];
    if (vk.length > 0) contacts.push({ label: 'ВКонтакте', value: 'vk' })
    if (tg.length > 0) contacts.push({ label: 'Telegram', value: 'telegram' })
    if (mail.length > 0) contacts.push({ label: 'Почту', value: 'mail' })

    if (chosenPreferredContact === 'vk' && vk.length === 0) setChosenPreferredContact('')
    if (chosenPreferredContact === 'telegram' && tg.length === 0) setChosenPreferredContact('')
    if (chosenPreferredContact === 'mail' && mail.length === 0) setChosenPreferredContact('')

    setOptionsContacts(contacts);
  }, [tg, vk, mail])

  useEffect(() => {
    setIdentificator(generateToken());
  }, [])

  useEffect(() => {
    if (chosenPreferredContact !== '') setPayButtonIsDisabled(false);
    else setPayButtonIsDisabled(true);
  }, [chosenPreferredContact])

  useEffect(() => {
    const allIds = shoppingCart.map(i => i.code);
    let reqString = '';
    reqString += allIds.join('&filters[code][$eq]=');
    reqString = '&filters[code][$eq]=' + reqString;
    let cartWithData = shoppingCart.slice();
    fetchDataFromURI(`https://api.stl-emporium.ru/api/creatures?populate=*${reqString}`).then(data => {
      cartWithData.forEach(item => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].attributes.code === item.code) {
            item.info = data[i].attributes;
            break;
          }
        }
      })
      fetchDataFromURI(`https://api.stl-emporium.ru/api/terrains?populate=*${reqString}`).then(dataTerrain => {
        cartWithData.forEach(item => {
          for (let i = 0; i < dataTerrain.length; i++) {
            if (dataTerrain[i].attributes.code === item.code) {
              item.info = dataTerrain[i].attributes;
              break;
            }
          }
        })
        
        setShoppingCartWithData(cartWithData);
      })
    })
  }, [shoppingCart])

  const getTotal = () => {
    let total = 0;
    shoppingCartWithData.forEach(item => {
      let price = 9999;
      if (item.type === 'stl') price = item.info.priceSTL
      if (item.type === 'physical') price = item.info.pricePhysical
      total += price * item.amount;
    })
    return total;
  }

  function removeAllInstances(itemCode, type) {
    let copy = shoppingCart.slice();
    copy = copy.filter(item => item.code != itemCode || item.type != type)
    setShoppingCart(copy);
  }

  function getTotalByType(type) {
    let counter = 0;
    shoppingCartWithData.forEach(item => {
      if (item.type === type) {
        let price = 9999;
        if (type === 'stl') price = item.info.priceSTL
        if (type === 'physical') price = item.info.pricePhysical
        counter += price * item.amount;
      }
    })
    return counter;
  }

  function getAmountByType(type) {
    let counter = 0;
    shoppingCart.forEach(item => {
      if (item.type === type) counter += item.amount;
    })
    return counter;
  }

  return (
    <>
      <Head />
      <CustomAppShell>
        <main style={{padding: '25px'}}>
          <Title order={1}>Твоя корзина</Title>
          <Grid>
            <Grid.Col md={8} sm={12}>
              <Paper shadow="xs" p="md">
                {
                  shoppingCartWithData.length > 0
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
                            {shoppingCartWithData.length > 0 && shoppingCartWithData.map((item, id) => {
                              return (<ItemRow itemCartInfo={item} key={`item-row-${item.info.code}-${id}`} removeAllInstances={removeAllInstances} />)
                            })}
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
            <Grid.Col md={4} sm={12}>
              <Paper shadow="xs" p="md" style={{ position: 'sticky', top: '15px' }}>
                <Button fullWidth size='lg' color='green' radius='md' onClick={() => { modalHandlers.open() }}>
                  Оформить заказ
                </Button>
                <Text size='sm' style={{ color: '#707070', margin: '25px 10px' }}>После оплаты будет предоставлен код, который нужно будет отправить нам в Telegram/VK</Text>
                <Divider />
                <Group position="apart" style={{ margin: '15px 10px' }}>
                  <Title order={3}>Ваша корзина</Title>
                  <Text size='sm'>{shoppingCart.length} минек</Text>
                </Group>
                <Group position="apart" style={{ margin: '25px 10px 0' }}>
                  <Text size='md'>STL ({getAmountByType('stl')})</Text>
                  <Text size='md'>{getTotalByType('stl')}₽ </Text>
                </Group>
                <Group position="apart" style={{ margin: '5px 10px 0' }}>
                  <Text size='md'>Фигурки ({getAmountByType('physical')})</Text>
                  <Text size='md'>{getTotalByType('physical')}₽ </Text>
                </Group>
                <Group position="apart" style={{ margin: '5px 10px 15px' }}>
                  <Text size='md'>Скидка</Text>
                  <Text size='md'>-{discount}₽</Text>
                </Group>
                <Divider />
                <Group position="apart" style={{ margin: '15px 10px' }}>
                  <Title order={3}>Общая стоимость</Title>
                  <Title order={3}>{getTotal()}₽</Title>
                </Group>
              </Paper>
            </Grid.Col>
          </Grid>
          <Modal fullScreen={isMobile} opened={modalOpened} onClose={modalHandlers.close} title="Оплата и информация" centered size="lg">
            <Group position='center'>
              <Stack>
                <Text>
                  После оплаты заказ попадёт к нам, и мы начнём работу. В течение трёх дней (обычно - двух часов) с вами свяжутся по предпочитаемому каналу связи.
                </Text>
                <Text>
                  Достаточно указать один любой контакт, но лучше указать все на всякий случай!
                </Text>
                <Divider />
                <TextInput
                  icon={<IconBrandTelegram />}
                  placeholder="Telegram"
                  value={tg}
                  onChange={(e) => setTg(e.currentTarget.value)}
                />
                <TextInput
                  icon={<IconBrandVk />}
                  placeholder="VK"
                  value={vk}
                  onChange={(e) => setVK(e.currentTarget.value)}
                />
                <TextInput
                  icon={<IconAt />}
                  placeholder="Почта"
                  value={mail}
                  onChange={(e) => setMail(e.currentTarget.value)}
                />
                <Select
                  label="Лучше, если со мной свяжутся через"
                  placeholder="Выбрать..."
                  data={optionsContacts}
                  value={chosenPreferredContact}
                  onChange={setChosenPreferredContact}
                />
                <Divider />
                <Text style={{fontWeight: 'bold', color: '#a13838'}}>
                  Для того, чтобы потом ты мог отследить заказ на сайте, запиши следующие данные:
                </Text>
                <List>
                  <List.Item>Уникальный идентификатор: <b>{identificator}</b></List.Item>
                  <List.Item>Стоимость заказа: <b>{getTotal()}</b></List.Item>
                  <List.Item>Свои контакты</List.Item>
                </List>
                <Button size="xl" disabled={payButtonIsDisabled} onClick={() => placeOrder()} loading={paymentIsInProgress}>Оплатить {getTotal()} рублей</Button>
              </Stack>
            </Group>
          </Modal>
        </main >
      </CustomAppShell >
    </>
  )
}